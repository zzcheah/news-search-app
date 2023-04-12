import {useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import {SearchContextProvider} from './contexts/SearchContext';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const theme = createTheme();
const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user') !== null
  );

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SearchContextProvider>
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
        </SearchContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
