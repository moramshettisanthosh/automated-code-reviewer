import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CodeEditorPage from './pages/CodeEditorPage';
import UploadPage from './pages/UploadPage';
import ReviewResultsPage from './pages/ReviewResultsPage';
import GitHubPage from './pages/GitHubPage';
import AnalyticsPage from './pages/AnalyticsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
        />
        <Route
          path="/editor"
          element={<ProtectedRoute><CodeEditorPage /></ProtectedRoute>}
        />
        <Route
          path="/upload"
          element={<ProtectedRoute><UploadPage /></ProtectedRoute>}
        />
        <Route
          path="/results"
          element={<ProtectedRoute><ReviewResultsPage /></ProtectedRoute>}
        />
        <Route
          path="/github"
          element={<ProtectedRoute><GitHubPage /></ProtectedRoute>}
        />
        <Route
          path="/analytics"
          element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>}
        />
        <Route
          path="/history"
          element={<ProtectedRoute><HistoryPage /></ProtectedRoute>}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminPage /></ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
