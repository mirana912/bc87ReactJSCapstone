import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        🎬 Welcome to{" "}
        <span className="text-pink-500">Cybermovie Booking Page</span>
      </h1>

      <p className="text-gray-300 mb-10 text-center max-w-lg">
        Nền tảng đặt vé xem phim trực tuyến <br />
        Lựa chọn bộ phim & ghế yêu thích của bạn một cách dễ dàng.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/client")}
          className="px-8 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition font-semibold text-lg"
        >
          🎟 Movie Page
        </button>

        <button
          onClick={() => navigate("/admin")}
          className="px-8 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-semibold text-lg"
        >
          🛠 Admin Page
        </button>
      </div>

      <footer className="absolute bottom-6 text-gray-500 text-sm">
        © 2025 Cybermovie Booking Project – by Huoc Tran & Bao Duong
      </footer>
    </div>
  );
}

export default Welcome;
