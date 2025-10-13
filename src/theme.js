import { createTheme } from '@mui/material/styles';


const theme = createTheme({
palette: {
mode: 'dark',
background: { default: '#0e0e10', paper: '#121216' },
primary: { main: '#d32f2f' },
secondary: { main: '#9e9e9e' },
text: { primary: '#e0e0e0', secondary: '#bdbdbd' },
},
typography: { fontFamily: 'Roboto, system-ui, Arial' },
shape: { borderRadius: 10 },
});
export default theme;