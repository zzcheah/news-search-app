import {useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const theme = createTheme();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user') !== null
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <LoginPage onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
