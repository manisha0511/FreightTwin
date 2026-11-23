import React, { useState } from 'react';
import { Shield, Key, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Modal, Input, Button, Tabs, Alert } from '../../../design-system';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onAuthenticated: (role: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onAuthenticated,
}) => {
  const [mode, setMode] = useState<string>(initialMode);
  const [email, setEmail] = useState('dispatcher@freighttwin.internal');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('LOGISTICS DISPATCHER');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated(role);
      onClose();
    }, 450);
  };

  const handleQuickRole = (selectedRole: string, sampleEmail: string) => {
    setRole(selectedRole);
    setEmail(sampleEmail);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'signin' ? 'Sign In to FreightTwin' : 'Create Platform Account'}
      description="Access the Intelligent Freight Transport & Digital Twin Platform."
      size="md"
    >
      <div className="space-y-4 text-left">
        {/* Sign In / Sign Up Tabs */}
        <div className="flex justify-center">
          <Tabs
            items={[
              { id: 'signin', label: 'Sign In' },
              { id: 'signup', label: 'Create Account' },
            ]}
            activeTabId={mode}
            onChange={setMode}
            size="sm"
          />
        </div>

        {/* Demo Notice */}
        <Alert severity="info">
          <strong>Demonstration Gateway:</strong> Select any operator profile below to enter the live digital twin simulation environment.
        </Alert>

        {/* Quick Profile Selector for Demo Convenience */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-text-muted uppercase font-semibold">
            Select Role Profile:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickRole('LOGISTICS DISPATCHER', 'dispatcher@freighttwin.internal')}
              className={`p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                role === 'LOGISTICS DISPATCHER'
                  ? 'bg-blue-50 text-blue-700 border-blue-400 font-bold shadow-premium-xs'
                  : 'bg-white text-text-secondary border-command-border hover:bg-slate-50'
              }`}
            >
              <div className="text-[11px] font-bold truncate">Dispatcher</div>
              <div className="text-[9px] text-text-muted truncate">Trips & Corridors</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRole('FLEET CONTROLLER', 'fleet@freighttwin.internal')}
              className={`p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                role === 'FLEET CONTROLLER'
                  ? 'bg-blue-50 text-blue-700 border-blue-400 font-bold shadow-premium-xs'
                  : 'bg-white text-text-secondary border-command-border hover:bg-slate-50'
              }`}
            >
              <div className="text-[11px] font-bold truncate">Fleet Ops</div>
              <div className="text-[9px] text-text-muted truncate">Telemetry & Maint.</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRole('CHIEF ANALYTICS OFFICER', 'analytics@freighttwin.internal')}
              className={`p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                role === 'CHIEF ANALYTICS OFFICER'
                  ? 'bg-blue-50 text-blue-700 border-blue-400 font-bold shadow-premium-xs'
                  : 'bg-white text-text-secondary border-command-border hover:bg-slate-50'
              }`}
            >
              <div className="text-[11px] font-bold truncate">Analytics</div>
              <div className="text-[9px] text-text-muted truncate">ESG & Reporting</div>
            </button>
          </div>
        </div>

        {/* Auth Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
          <Input
            label="Corporate Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4 text-text-muted" />}
            required
          />

          <Input
            label="Access Key / Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Key className="w-4 h-4 text-text-muted" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center mt-2"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {mode === 'signin' ? 'Enter Command Center' : 'Create Account & Enter'}
          </Button>
        </form>
      </div>
    </Modal>
  );
};
