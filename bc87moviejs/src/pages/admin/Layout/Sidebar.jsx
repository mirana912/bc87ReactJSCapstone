import { Film, Users, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  { to: "/admin/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { to: "/admin/movies", icon: <Film />, label: "Movies" },
  { to: "/admin/users", icon: <Users />, label: "Users" },
];

export default function Sidebar({ onLogout }) {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col p-4 shadow-lg">
      <div className="text-2xl font-bold mb-8 text-center tracking-wide">
        🎬 CyberMovie
      </div>
      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all duration-200 ${
                isActive
                  ? "bg-fuchsia-600 text-white shadow-md"
                  : "hover:bg-slate-800 hover:text-fuchsia-300"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={onLogout}
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-fuchsia-300 transition"
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </div>
  );
}
