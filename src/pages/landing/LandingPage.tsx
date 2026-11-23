import React, { useState } from 'react';
import { LandingNavbar } from './components/LandingNavbar';
import { HeroSection } from './components/HeroSection';
import { PlatformOverview } from './components/PlatformOverview';
import { KeyFeatures } from './components/KeyFeatures';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { LandingFooter } from './components/LandingFooter';
import { AuthModal } from './components/AuthModal';

export interface LandingPageProps {
  onNavigateToPlatform: () => void;
  onUserAuthenticated?: (role: string) => void;
  onPlanRoute?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToPlatform,
  onUserAuthenticated,
  onPlanRoute,
}) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleSignIn = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleDiscoverFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlanRoute = () => {
    if (onPlanRoute) {
      onPlanRoute();
    } else {
      window.location.hash = '#/routing';
    }
  };

  const handleAuthenticated = (role: string) => {
    if (onUserAuthenticated) {
      onUserAuthenticated(role);
    }
    onNavigateToPlatform();
  };

  return (
    <div className="min-h-screen bg-command-base text-text-primary selection:bg-accent-primary/15 selection:text-accent-primary flex flex-col">
      {/* 1. Light Premium Navigation Bar */}
      <LandingNavbar
        onSignInClick={handleSignIn}
        onGetStartedClick={handleGetStarted}
        onExplorePlatformClick={onNavigateToPlatform}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 2. Elevated Hero Section with 3D Interactive Freight Globe */}
        <HeroSection
          onExplorePlatform={onNavigateToPlatform}
          onPlanRoute={handlePlanRoute}
          onDiscoverFeatures={handleDiscoverFeatures}
        />

        {/* 3. Platform Pillars (Spacious Tri-Layer Digital Twin) */}
        <PlatformOverview />

        {/* 4. Core Capabilities (4 Visual Feature Cards) */}
        <KeyFeatures onExploreFeature={handleDiscoverFeatures} />

        {/* 5. Workflow (4-Stage Visual Multi-Modal Stepper) */}
        <HowItWorks />

        {/* 6. Quantified Impact (3 Radial ROI Dials) */}
        <Benefits />
      </main>

      {/* 7. Footer */}
      <LandingFooter />

      {/* Auth Gateway Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};

export default LandingPage;
