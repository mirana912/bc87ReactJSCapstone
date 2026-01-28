import { useParams } from "react-router-dom";

export default function BookingPage() {
  const { showtimeId } = useParams();

  return (
    <div>
      <h2>Chọn ghế cho suất chiếu: {showtimeId}</h2>
      {/* Sau này call API lấy danh sách ghế */}
    </div>
  );
}
