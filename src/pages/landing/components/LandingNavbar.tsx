import React, { useState, useEffect } from 'react';
import { Activity, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../../../design-system';

export interface LandingNavbarProps {
  onSignInClick: () => void;
  onGetStartedClick: () => void;
  onExplorePlatformClick: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onSignInClick,
  onGetStartedClick,
  onExplorePlatformClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-command-border shadow-premium-xs py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="flex items-center gap-3 select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-accent-primary shadow-premium-xs group-hover:border-blue-400 transition-colors">
            <Activity className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-text-primary font-display tracking-tight">
                FreightTwin
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                2.0
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted">
              Digital Twin Platform
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-text-secondary">
          <button
            onClick={() => scrollToSection('home')}
            className="hover:text-accent-primary transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('platform')}
            className="hover:text-accent-primary transition-colors cursor-pointer"
          >
            Pillars
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-accent-primary transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-accent-primary transition-colors cursor-pointer"
          >
            Workflow
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-accent-primary transition-colors cursor-pointer"
          >
            Impact
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onSignInClick}
            className="text-xs font-bold text-text-secondary hover:text-text-primary px-3 py-1.5 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onExplorePlatformClick}
          >
            Explore Platform
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onGetStartedClick}
            rightIcon={<ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-command-border px-4 py-4 space-y-3 shadow-premium-md animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-text-primary text-left">
            <button
              onClick={() => scrollToSection('home')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 text-left cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('platform')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 text-left cursor-pointer"
            >
              Pillars
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 text-left cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 text-left cursor-pointer"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 text-left cursor-pointer"
            >
              Impact
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="md"
              className="w-full justify-center"
              onClick={onExplorePlatformClick}
            >
              Explore Platform
            </Button>
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={onGetStartedClick}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
