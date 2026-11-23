import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { DashboardPage } from './modules/dashboard/DashboardPage';
import { DigitalTwinMapPage } from './modules/map/DigitalTwinMapPage';
import { FleetManagementPage } from './modules/fleet/FleetManagementPage';
import { RoutePlanningPage } from './modules/routing/RoutePlanningPage';
import { AnalyticsReportsPage } from './modules/analytics/AnalyticsReportsPage';
import { NotificationsPage } from './modules/notifications/NotificationsPage';
import { UserProfilePage } from './modules/profile/UserProfilePage';
import { SettingsPage } from './modules/settings/SettingsPage';
import { HelpSupportPage } from './modules/help/HelpSupportPage';
import { DesignSystemGallery } from './design-system/DesignSystemGallery';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [currentUserRole, setCurrentUserRole] = useState('LOGISTICS DISPATCHER');

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onNavigateToPlatform={() => navigate('/dashboard')}
            onPlanRoute={() => navigate('/routing')}
            onUserAuthenticated={(role) => {
              setCurrentUserRole(role);
              navigate('/dashboard');
            }}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <DashboardPage
            onBackToLanding={() => navigate('/')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/digital-twin"
        element={
          <DigitalTwinMapPage
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/fleet"
        element={
          <FleetManagementPage
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/routing"
        element={
          <RoutePlanningPage
            initialTab="planning"
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/simulation"
        element={
          <RoutePlanningPage
            initialTab="simulation"
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/analytics"
        element={
          <AnalyticsReportsPage
            initialTab="analytics"
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/reports"
        element={
          <AnalyticsReportsPage
            initialTab="reports"
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/notifications"
        element={
          <NotificationsPage
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/profile"
        element={
          <UserProfilePage
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            onBackToLanding={() => navigate('/')}
            currentUserRole={currentUserRole}
            onUpdateRole={(newRole) => setCurrentUserRole(newRole)}
          />
        }
      />
      <Route
        path="/settings"
        element={
          <SettingsPage
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToHelp={() => navigate('/help')}
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/help"
        element={
          <HelpSupportPage
            onBackToDashboard={() => navigate('/dashboard')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/platform"
        element={
          <DashboardPage
            onBackToLanding={() => navigate('/')}
            onNavigateToDigitalTwin={() => navigate('/digital-twin')}
            onNavigateToFleet={() => navigate('/fleet')}
            onNavigateToRouting={() => navigate('/routing')}
            onNavigateToSimulation={() => navigate('/simulation')}
            onNavigateToAnalytics={() => navigate('/analytics')}
            onNavigateToReports={() => navigate('/reports')}
            onNavigateToNotifications={() => navigate('/notifications')}
            onNavigateToProfile={() => navigate('/profile')}
            onNavigateToSettings={() => navigate('/settings')}
            onNavigateToHelp={() => navigate('/help')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="/gallery"
        element={
          <DesignSystemGallery
            onBackToLanding={() => navigate('/')}
            userRole={currentUserRole}
          />
        }
      />
      <Route
        path="*"
        element={
          <LandingPage
            onNavigateToPlatform={() => navigate('/dashboard')}
            onPlanRoute={() => navigate('/routing')}
            onUserAuthenticated={(role) => {
              setCurrentUserRole(role);
              navigate('/dashboard');
            }}
          />
        }
      />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;
