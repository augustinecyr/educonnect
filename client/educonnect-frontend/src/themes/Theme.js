import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Adjust the primary color to your preference
    },
    secondary: {
      main: '#dc004e', // Adjust the secondary color to your preference
    },
    // You can customize other palette colors like text, background, etc. here
  },
  typography: {
    fontFamily: [
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    // You can customize typography options like font size, font weight, etc. here
  },
  // You can customize other aspects of the theme like spacing, breakpoints, etc. here
});

export default theme;
