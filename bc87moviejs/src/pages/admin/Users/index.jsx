import { useEffect, useState } from "react";
import { userService } from "../../../services/userService";
import Swal from "sweetalert2";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "KhachHang",
  });
  const [isEdit, setIsEdit] = useState(false);

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const res = await userService.getAll(keyword);
      setUsers(res.data.content);
    } catch (err) {
      console.error("Lỗi load user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [keyword]);

  // Mở modal thêm/sửa
  const openModal = (user = null) => {
    if (user) {
      setFormData(user);
      setIsEdit(true);
    } else {
      setFormData({
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        email: "",
        soDt: "",
        maLoaiNguoiDung: "KhachHang",
      });
      setIsEdit(false);
    }
    setShowModal(true);
  };

  // Thêm hoặc cập nhật người dùng
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await userService.update(formData);
        Swal.fire("Thành công!", "Đã cập nhật người dùng", "success");
      } else {
        await userService.add(formData);
        Swal.fire("Thành công!", "Đã thêm người dùng mới", "success");
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Lỗi thêm/sửa:", err);
      Swal.fire("Lỗi!", "Không thể lưu người dùng", "error");
    }
  };

  // Xóa người dùng
  const handleDelete = async (taiKhoan) => {
    const confirm = await Swal.fire({
      title: "Xác nhận xóa?",
      text: `Bạn có chắc muốn xóa tài khoản "${taiKhoan}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (confirm.isConfirmed) {
      try {
        await userService.delete(taiKhoan);
        Swal.fire("Đã xóa!", "Người dùng đã bị xóa", "success");
        fetchUsers();
      } catch (err) {
        Swal.fire("Lỗi!", "Không thể xóa người dùng", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <button
          onClick={() => openModal()}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
        >
          + Thêm người dùng
        </button>
      </div>

      {/* Tìm kiếm */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Tìm người dùng..."
          className="border rounded px-3 py-2 w-64"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={fetchUsers}
        >
          Tìm
        </button>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Tài khoản</th>
              <th className="border p-2">Họ tên</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Số ĐT</th>
              <th className="border p-2">Loại ND</th>
              <th className="border p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.taiKhoan} className="text-center">
                <td className="border p-2">{u.taiKhoan}</td>
                <td className="border p-2">{u.hoTen}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.soDt}</td>
                <td className="border p-2">{u.maLoaiNguoiDung}</td>
                <td className="border p-2">
                  <button
                    onClick={() => openModal(u)}
                    className="text-blue-600 mr-3 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(u.taiKhoan)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white text-black rounded-lg p-6 w-96"
          >
            <h2 className="text-xl font-semibold mb-4">
              {isEdit ? "Cập nhật người dùng" : "Thêm người dùng mới"}
            </h2>

            <div className="mb-3">
              <label className="block text-sm">Tài khoản</label>
              <input
                required
                value={formData.taiKhoan}
                onChange={(e) =>
                  setFormData({ ...formData, taiKhoan: e.target.value })
                }
                disabled={isEdit}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm">Mật khẩu</label>
              <input
                required
                value={formData.matKhau}
                onChange={(e) =>
                  setFormData({ ...formData, matKhau: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                type="password"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm">Họ tên</label>
              <input
                required
                value={formData.hoTen}
                onChange={(e) =>
                  setFormData({ ...formData, hoTen: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm">Email</label>
              <input
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                type="email"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm">Số điện thoại</label>
              <input
                required
                value={formData.soDt}
                onChange={(e) =>
                  setFormData({ ...formData, soDt: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm">Loại người dùng</label>
              <select
                value={formData.maLoaiNguoiDung}
                onChange={(e) =>
                  setFormData({ ...formData, maLoaiNguoiDung: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="KhachHang">Khách Hàng</option>
                <option value="QuanTri">Quản Trị</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                {isEdit ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
