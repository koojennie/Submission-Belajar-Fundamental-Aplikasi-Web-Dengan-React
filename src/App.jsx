import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import Header from './components/Header';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import ArchivesPage from './pages/ArchivesPage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { getUserLogged, putAccessToken } from './utils/network-data';

export default function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    })();
  }, []);

  const onLogout = () => {
    putAccessToken('');
    setAuthedUser(null);
  };

  if (initializing) return <Loading label="Memuat aplikasi…" />;

  return (
    <ThemeProvider>
      <LocaleProvider>
        <div className="app-container">
          <Header authedUser={authedUser} onLogout={onLogout} />
          <main>
            {!authedUser ? (
              <Routes>
                <Route path="/login" element={<LoginPage onLoginSuccess={(user) => setAuthedUser(user)} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute authedUser={authedUser}>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/archives" element={<ProtectedRoute authedUser={authedUser}><ArchivesPage /></ProtectedRoute>} />
                <Route path="/notes/new" element={<ProtectedRoute authedUser={authedUser}><AddPage /></ProtectedRoute>} />
                <Route path="/notes/:id" element={<ProtectedRoute authedUser={authedUser}><DetailPage /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </main>
        </div>
      </LocaleProvider>
    </ThemeProvider>
  );
}