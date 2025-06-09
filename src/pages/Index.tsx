
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginPage from '../components/auth/LoginPage';
import RegisterPage from '../components/auth/RegisterPage';
import ForgotPasswordPage from '../components/auth/ForgotPasswordPage';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../components/dashboard/Dashboard';
import SQLManager from '../components/sql/SQLManager';
import NoSQLManager from '../components/nosql/NoSQLManager';
import ExportPage from '../components/export/ExportPage';
import AlertsPage from '../components/alerts/AlertsPage';
import SettingsPage from '../components/settings/SettingsPage';
import AdminPanel from '../components/admin/AdminPanel';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import NotFound from './NotFound';

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sql"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SQLManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nosql"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NoSQLManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/export"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ExportPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AlertsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Admin">
                <DashboardLayout>
                  <AdminPanel />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default Index;
