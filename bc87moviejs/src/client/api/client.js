// src/client/api/client.js
import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE || "https://movienew.cybersoft.edu.vn/api";

const client = axios.create({ baseURL, timeout: 15000 });

// ---- CACHE LAYER (GET, POST, PUT) ----
const CACHE_TTL = 3 * 60 * 1000; // 3 phút
const mem = new Map();
const LS_KEY = "AXIOS_CACHE__";

const keyOf = (cfg) => {
  const u = (cfg.baseURL || "") + cfg.url;
  const p = cfg.params ? JSON.stringify(cfg.params) : "";
  const d = cfg.data ? JSON.stringify(cfg.data) : "";
  return `${(cfg.method || "get").toLowerCase()}:${u}?${p}&data=${d}`;
};
const readCache = (key) => {
  const hit =
    mem.get(key) ||
    (() => {
      try {
        return JSON.parse(localStorage.getItem(LS_KEY + key) || "null");
      } catch {
        return null;
      }
    })();
  if (!hit) return null;
  if (Date.now() - hit.t > (hit.ttl || CACHE_TTL)) {
    try {
      localStorage.removeItem(LS_KEY + key);
    } catch {
      /* ignore error */
    }
    mem.delete(key);
    return null;
  }
  return hit;
};
const writeCache = (key, data, headers, ttl) => {
  const val = { t: Date.now(), ttl: ttl || CACHE_TTL, data, headers };
  mem.set(key, val);
  try {
    localStorage.setItem(LS_KEY + key, JSON.stringify(val));
  } catch {
    /* ignore error */
  }
};

// Cache invalidation methods
export const invalidateCache = (pattern) => {
  const keys = Array.from(mem.keys()).filter((k) => k.includes(pattern));
  keys.forEach((k) => {
    mem.delete(k);
    try {
      localStorage.removeItem(LS_KEY + k);
    } catch {
      /* ignore */
    }
  });
};
export const clearAllCache = () => {
  mem.clear();
  try {
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith(LS_KEY)) localStorage.removeItem(k);
    });
  } catch {
    /* ignore */
  }
};

// request: nếu là GET và có cache → trả luôn từ cache (override adapter)
client.interceptors.request.use((cfg) => {
  const isGet = (cfg.method || "get").toLowerCase() === "get";
  const disable = cfg.disableCache === true;
  if (isGet && !disable) {
    const key = keyOf(cfg);
    const hit = readCache(key);
    if (hit) {
      cfg.adapter = async () => ({
        data: hit.data,
        status: 200,
        statusText: "OK (cache)",
        headers: hit.headers || {},
        config: cfg,
        request: {},
      });
    }
    // TTL tuỳ biến mỗi request: cfg.cacheTTL
    if (cfg.cacheTTL) cfg._cacheTTL = cfg.cacheTTL;
  }
  // token
  const cyber = import.meta.env.VITE_CYBERSOFT_TOKEN;
  if (cyber) cfg.headers["TokenCybersoft"] = cyber;
  const bearer =
    localStorage.getItem("token") || import.meta.env.VITE_API_TOKEN;
  if (bearer) cfg.headers.Authorization = `Bearer ${bearer}`;
  return cfg;
});

// response: lưu cache cho GET 200, và invalid cache cho POST/PUT
client.interceptors.response.use((res) => {
  const cfg = res.config || {};
  const method = (cfg.method || "get").toLowerCase();
  if (method === "get" && res.status === 200 && cfg.disableCache !== true) {
    const key = keyOf(cfg);
    writeCache(key, res.data, res.headers, cfg._cacheTTL);
  } else if (
    (method === "post" || method === "put") &&
    res.status >= 200 &&
    res.status < 300
  ) {
    // Invalidate related caches after mutations
    invalidateCache("/QuanLyDatVe"); // Invalidate booking related caches
    invalidateCache("/QuanLyNguoiDung/ThongTinTaiKhoan"); // Invalidate account info
  }
  return res;
});

// Rate limiting
let requestCount = 0;
const MAX_REQUESTS = 10;
const WINDOW_MS = 1000; // 1 second
let windowStart = Date.now();

client.interceptors.request.use((cfg) => {
  const now = Date.now();
  if (now - windowStart > WINDOW_MS) {
    requestCount = 0;
    windowStart = now;
  }
  if (requestCount >= MAX_REQUESTS) {
    return Promise.reject(
      new Error("Rate limit exceeded. Please try again later."),
    );
  }
  requestCount++;
  return cfg;
});

export default client;
// ==========================================
