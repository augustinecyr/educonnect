import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '../src/pages/Router';
import { ThemeProvider } from '@mui/material';
import theme from './themes/Theme';

ReactDOM.render(
  <ThemeProvider theme={theme}> 
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
