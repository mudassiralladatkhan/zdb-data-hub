
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/sql" element={<SQLManager />} />
                    <Route path="/nosql" element={<NoSQLManager />} />
                    <Route path="/export" element={<ExportPage />} />
                    <Route path="/alerts" element={<AlertsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute requiredRole="Admin">
                          <AdminPanel />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default Index;
