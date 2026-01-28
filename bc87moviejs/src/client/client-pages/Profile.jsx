// src/client/client-pages/Profile.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccount,
  updateProfile,
  changePassword,
} from "../features/auth/authSlice";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Divider,
  Chip,
  Button,
  Skeleton,
  Avatar,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Movie as MovieIcon,
  LocationOn as LocationIcon,
  EventSeat as SeatIcon,
  CalendarToday as CalendarIcon,
  AccountCircle as AccountIcon,
  Lock as LockIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, account, accountStatus } = useSelector((state) => state.auth);
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    hoTen: "",
    email: "",
    soDT: "",
    matKhau: "",
    matKhauMoi: "",
    xacNhanMatKhau: "",
  });
  const [editErrors, setEditErrors] = useState({});

  // Fetch account info on load
  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);

  // Update form when account data loads
  useEffect(() => {
    if (account) {
      setEditForm({
        hoTen: account.hoTen || "",
        email: account.email || "",
        soDT: account.soDT || account.soDt || "",
        matKhau: "",
        matKhauMoi: "",
        xacNhanMatKhau: "",
      });
    }
  }, [account]);

  const loading = accountStatus === "loading";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditOpen = () => {
    setEditDialogOpen(true);
    setEditErrors({});
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditForm({
      hoTen: account?.hoTen || "",
      email: account?.email || "",
      soDT: account?.soDT || account?.soDt || "",
      matKhau: "",
      matKhauMoi: "",
      xacNhanMatKhau: "",
    });
  };

  const handleEditSubmit = () => {
    // Basic validation
    const errors = {};
    if (!editForm.hoTen.trim()) errors.hoTen = "Họ tên không được để trống";
    if (!editForm.email.trim()) errors.email = "Email không được để trống";
    if (!editForm.soDT.trim())
      errors.soDT = "Số điện thoại không được để trống";

    if (editForm.matKhauMoi) {
      if (!editForm.matKhau) errors.matKhau = "Vui lòng nhập mật khẩu hiện tại";
      if (editForm.matKhauMoi !== editForm.xacNhanMatKhau) {
        errors.xacNhanMatKhau = "Mật khẩu xác nhận không khớp";
      }
    }

    setEditErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Determine if password change is requested
      if (editForm.matKhauMoi) {
        // Change password
        dispatch(
          changePassword({
            taiKhoan: account?.taiKhoan || user?.taiKhoan,
            matKhau: editForm.matKhau,
            email: editForm.email,
            soDT: editForm.soDT,
            hoTen: editForm.hoTen,
            matKhauMoi: editForm.matKhauMoi,
          }),
        ).then(() => {
          setEditDialogOpen(false);
          // Refresh account data
          dispatch(fetchAccount());
        });
      } else {
        // Update profile only
        dispatch(
          updateProfile({
            taiKhoan: account?.taiKhoan || user?.taiKhoan,
            matKhau: editForm.matKhau || account?.matKhau || user?.matKhau,
            email: editForm.email,
            soDT: editForm.soDT,
            hoTen: editForm.hoTen,
          }),
        ).then(() => {
          setEditDialogOpen(false);
          // Refresh account data
          dispatch(fetchAccount());
        });
      }
    }
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={3}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "rgba(255,255,255,0.2)",
              fontSize: "2rem",
              fontWeight: 700,
            }}
          >
            {loading ? (
              <Skeleton variant="circular" width={100} height={100} />
            ) : (
              getInitials(account?.hoTen || user?.hoTen)
            )}
          </Avatar>

          <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
            {loading ? (
              <Stack spacing={1}>
                <Skeleton
                  width={200}
                  height={40}
                  sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
                />
                <Skeleton
                  width={150}
                  height={24}
                  sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
                />
              </Stack>
            ) : (
              <>
                <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
                  {account?.hoTen || user?.hoTen || "Người dùng"}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {account?.taiKhoan || user?.taiKhoan}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
                  Thành viên CGV • Tham gia từ{" "}
                  {dayjs().subtract(30, "day").format("MM/YYYY")}
                </Typography>
              </>
            )}
          </Box>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditOpen}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Chỉnh sửa
          </Button>
        </Stack>
      </Paper>

      {/* Tabs Navigation */}
      <Paper sx={{ mb: 4, borderRadius: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: "1rem",
              py: 2,
            },
          }}
        >
          <Tab
            icon={<AccountIcon />}
            label="Thông tin cá nhân"
            iconPosition="start"
          />
          <Tab
            icon={<MovieIcon />}
            label="Lịch sử đặt vé"
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ mb: 3, color: "#667eea" }}
                >
                  Thông tin cá nhân
                </Typography>

                {loading ? (
                  <Stack spacing={3}>
                    {[...Array(4)].map((_, i) => (
                      <Stack
                        key={i}
                        direction="row"
                        alignItems="center"
                        spacing={2}
                      >
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box sx={{ flex: 1 }}>
                          <Skeleton width="30%" height={20} />
                          <Skeleton width="60%" height={24} />
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Stack spacing={3}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#667eea" }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Họ và tên
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {account?.hoTen || user?.hoTen}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#667eea" }}>
                        <AccountIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Tài khoản
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {account?.taiKhoan || user?.taiKhoan}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#667eea" }}>
                        <EmailIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {account?.email || user?.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#667eea" }}>
                        <PhoneIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Số điện thoại
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {account?.soDT || account?.soDt || user?.soDT}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                  Thống kê
                </Typography>

                <Stack spacing={2}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#f8f9fa",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h3" fontWeight={800} color="#667eea">
                      {account?.thongTinDatVe?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vé đã đặt
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#f8f9fa",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h3" fontWeight={800} color="#667eea">
                      {account?.thongTinDatVe?.reduce(
                        (total, booking) =>
                          total + (booking.danhSachGhe?.length || 0),
                        0,
                      ) || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ghế đã đặt
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Typography variant="h5" fontWeight={700}>
              Lịch sử đặt vé
            </Typography>
            <Button
              startIcon={<RefreshIcon />}
              onClick={() => dispatch(fetchAccount())}
              disabled={loading}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Làm mới
            </Button>
          </Stack>

          {loading ? (
            <Stack spacing={3}>
              {[...Array(3)].map((_, i) => (
                <Card key={i} sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton width="40%" height={32} />
                    <Skeleton width="60%" height={24} />
                    <Skeleton width="50%" height={24} />
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      <Skeleton width={80} height={32} />
                      <Skeleton width={80} height={32} />
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Stack spacing={3}>
              {account?.thongTinDatVe?.length ? (
                account.thongTinDatVe.map((booking, idx) => (
                  <Card
                    key={idx}
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Stack
                        direction="row"
                        alignItems="flex-start"
                        spacing={3}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            bgcolor: "#667eea",
                            fontSize: "1.5rem",
                          }}
                        >
                          <MovieIcon />
                        </Avatar>

                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{ mb: 1 }}
                          >
                            {booking.tenPhim}
                          </Typography>

                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: 2 }}
                          >
                            <CalendarIcon
                              sx={{ fontSize: 18, color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              Đặt lúc:{" "}
                              {booking.ngayDat
                                ? dayjs(booking.ngayDat).format(
                                    "HH:mm DD/MM/YYYY",
                                  )
                                : "—"}
                            </Typography>
                          </Stack>

                          <Divider sx={{ my: 2 }} />

                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{ mb: 1 }}
                          >
                            Ghế đã đặt:
                          </Typography>
                          <Stack direction="row" gap={1} flexWrap="wrap">
                            {booking.danhSachGhe?.map((seat, i) => (
                              <Chip
                                key={i}
                                icon={<SeatIcon />}
                                label={`${seat.tenGhe} • ${seat.tenCumRap || ""}`}
                                sx={{
                                  bgcolor: "#e3f2fd",
                                  color: "#1976d2",
                                  "& .MuiChip-icon": { color: "#1976d2" },
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card sx={{ borderRadius: 3, textAlign: "center", py: 6 }}>
                  <CardContent>
                    <MovieIcon
                      sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      Chưa có vé nào được đặt
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hãy đặt vé xem phim đầu tiên của bạn!
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Stack>
          )}
        </Box>
      )}

      {/* Edit Profile Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
          Chỉnh sửa thông tin
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Họ và tên"
              value={editForm.hoTen}
              onChange={(e) =>
                setEditForm({ ...editForm, hoTen: e.target.value })
              }
              error={!!editErrors.hoTen}
              helperText={editErrors.hoTen}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
              error={!!editErrors.email}
              helperText={editErrors.email}
            />

            <TextField
              fullWidth
              label="Số điện thoại"
              value={editForm.soDT}
              onChange={(e) =>
                setEditForm({ ...editForm, soDT: e.target.value })
              }
              error={!!editErrors.soDT}
              helperText={editErrors.soDT}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight={600} color="#667eea">
              Đổi mật khẩu (tùy chọn)
            </Typography>

            <TextField
              fullWidth
              label="Mật khẩu hiện tại"
              type="password"
              value={editForm.matKhau}
              onChange={(e) =>
                setEditForm({ ...editForm, matKhau: e.target.value })
              }
              error={!!editErrors.matKhau}
              helperText={editErrors.matKhau}
            />

            <TextField
              fullWidth
              label="Mật khẩu mới"
              type="password"
              value={editForm.matKhauMoi}
              onChange={(e) =>
                setEditForm({ ...editForm, matKhauMoi: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Xác nhận mật khẩu mới"
              type="password"
              value={editForm.xacNhanMatKhau}
              onChange={(e) =>
                setEditForm({ ...editForm, xacNhanMatKhau: e.target.value })
              }
              error={!!editErrors.xacNhanMatKhau}
              helperText={editErrors.xacNhanMatKhau}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleEditClose}
            startIcon={<CancelIcon />}
            sx={{ borderRadius: 2 }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              borderRadius: 2,
              bgcolor: "#667eea",
              "&:hover": { bgcolor: "#5a67d8" },
            }}
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
