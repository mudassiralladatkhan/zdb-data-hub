
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

// Add console logs to track imports
console.log('Starting Index.tsx imports...');

let LoginPage, RegisterPage, ForgotPasswordPage, DashboardLayout, Dashboard, SQLManager, NoSQLManager, ExportPage, AlertsPage, SettingsPage, AdminPanel, ProtectedRoute, NotFound;

try {
  LoginPage = require('../components/auth/LoginPage').default;
  console.log('LoginPage imported successfully');
} catch (e) {
  console.error('Failed to import LoginPage:', e);
}

try {
  RegisterPage = require('../components/auth/RegisterPage').default;
  console.log('RegisterPage imported successfully');
} catch (e) {
  console.error('Failed to import RegisterPage:', e);
}

try {
  ForgotPasswordPage = require('../components/auth/ForgotPasswordPage').default;
  console.log('ForgotPasswordPage imported successfully');
} catch (e) {
  console.error('Failed to import ForgotPasswordPage:', e);
}

try {
  DashboardLayout = require('../components/layout/DashboardLayout').default;
  console.log('DashboardLayout imported successfully');
} catch (e) {
  console.error('Failed to import DashboardLayout:', e);
}

try {
  Dashboard = require('../components/dashboard/Dashboard').default;
  console.log('Dashboard imported successfully');
} catch (e) {
  console.error('Failed to import Dashboard:', e);
}

try {
  SQLManager = require('../components/sql/SQLManager').default;
  console.log('SQLManager imported successfully');
} catch (e) {
  console.error('Failed to import SQLManager:', e);
}

try {
  NoSQLManager = require('../components/nosql/NoSQLManager').default;
  console.log('NoSQLManager imported successfully');
} catch (e) {
  console.error('Failed to import NoSQLManager:', e);
}

try {
  ExportPage = require('../components/export/ExportPage').default;
  console.log('ExportPage imported successfully');
} catch (e) {
  console.error('Failed to import ExportPage:', e);
}

try {
  AlertsPage = require('../components/alerts/AlertsPage').default;
  console.log('AlertsPage imported successfully');
} catch (e) {
  console.error('Failed to import AlertsPage:', e);
}

try {
  SettingsPage = require('../components/settings/SettingsPage').default;
  console.log('SettingsPage imported successfully');
} catch (e) {
  console.error('Failed to import SettingsPage:', e);
}

try {
  AdminPanel = require('../components/admin/AdminPanel').default;
  console.log('AdminPanel imported successfully');
} catch (e) {
  console.error('Failed to import AdminPanel:', e);
}

try {
  ProtectedRoute = require('../components/auth/ProtectedRoute').default;
  console.log('ProtectedRoute imported successfully');
} catch (e) {
  console.error('Failed to import ProtectedRoute:', e);
}

try {
  NotFound = require('./NotFound').default;
  console.log('NotFound imported successfully');
} catch (e) {
  console.error('Failed to import NotFound:', e);
}

console.log('All imports completed');

const Index = () => {
  console.log('Index component rendering...');
  
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/login" element={LoginPage ? <LoginPage /> : <div>LoginPage not available</div>} />
          <Route path="/register" element={RegisterPage ? <RegisterPage /> : <div>RegisterPage not available</div>} />
          <Route path="/forgot-password" element={ForgotPasswordPage ? <ForgotPasswordPage /> : <div>ForgotPasswordPage not available</div>} />
          <Route
            path="/"
            element={
              ProtectedRoute && DashboardLayout && Dashboard ? (
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              ) : <div>Dashboard components not available</div>
            }
          />
          <Route
            path="/sql"
            element={
              ProtectedRoute && DashboardLayout && SQLManager ? (
                <ProtectedRoute>
                  <DashboardLayout>
                    <SQLManager />
                  </DashboardLayout>
                </ProtectedRoute>
              ) : <div>SQL components not available</div>
            }
          />
          <Route
            path="/nosql"
            element={
              ProtectedRoute && DashboardLayout && NoSQLManager ? (
                <ProtectedRoute>
                  <DashboardLayout>
                    <NoSQLManager />
                  </DashboardLayout>
                </ProtectedRoute>
              ) : <div>NoSQL components not available</div>
            }
          />
          <Route
            path="/export"
            element={
              ProtectedRoute && DashboardLayout && ExportPage ? (
                <ProtectedRoute>
                  <DashboardLayout>
                    <ExportPage />
                  </DashboardLayout>
                </ProtectedRoute>
              ) : <div>Export components not available</div>
            }
          />
          <Route
            path="/alerts"
            element={
              ProtectedRoute && DashboardLayout && AlertsPage ? (
                <ProtectedRoute>
                  <DashboardLayout>
                    <AlertsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              ) : <div>Alerts components not available</div>
            }
          />
          <Route
            path="/settings"
            element={
              ProtectedRoute && DashboardLayout && SettingsPage ? (
                <ProtectedRoute>
                  <DashboardLayout>
                    <SettingsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              ) : <div>Settings components not available</div>
            }
          />
          <Route
            path="/admin"
            element={
              ProtectedRoute && DashboardLayout && AdminPanel ? (
                <ProtectedRoute requiredRole="Admin">
                  <DashboardLayout>
                    <AdminPanel />
                  </DashboardLayout>
                </ProtectedRoute>
              ) : <div>Admin components not available</div>
            }
          />
          <Route path="*" element={NotFound ? <NotFound /> : <div>404 - Page not found</div>} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default Index;
