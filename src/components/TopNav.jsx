// src/components/TopNav.jsx
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, useNavigate } from 'react-router-dom';

const items = [
  { key: 'home', label: 'Trang chủ', to: '/' },
  { key: 'now',  label: 'Đang chiếu', hash: '#now-playing' },
  { key: 'show', label: 'Lịch chiếu', to: '/showtimes' },
  { key: 'profile', label: 'Tài khoản', to: '/profile' },
];

export default function TopNav() {
  const loc = useLocation();
  const nav = useNavigate();
  const value = items.findIndex(
    it => (it.to && loc.pathname === it.to) || (it.hash && loc.hash === it.hash)
  );

  const onChange = (_, i) => {
    const it = items[i];
    if (!it) return;
    if (it.to) nav(it.to);
    if (it.hash) {
      if (loc.pathname !== '/') nav('/', { replace: false });
      setTimeout(() => {
        document.querySelector(it.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', it.hash);
      }, 0);
    }
  };

  return (
    <Tabs
      value={value < 0 ? false : value}
      onChange={onChange}
      variant="scrollable"
      textColor="inherit"
      sx={{
        minHeight: 42,
        '& .MuiTab-root': { minHeight: 42, textTransform: 'none', fontWeight: 600 },
        '& .MuiTabs-indicator': { height: 3, background: 'linear-gradient(90deg,#ff4d4f,#ff7676)' },
      }}
    >
      {items.map(it => <Tab key={it.key} label={it.label} />)}
    </Tabs>
  );
}
