import React, { useState } from 'react';
import {
  User,
  Shield,
  Clock,
  Save,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  Laptop,
  Check,
  Building2,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';
import {
  NavigationLayout,
  Button,
  Badge,
  Input,
  PageHeader,
} from '../../design-system';
import { getAppNavSections } from '../../core/navigation/navigationItems';

export interface UserProfilePageProps {
  onBackToDashboard: () => void;
  onNavigateToDigitalTwin: () => void;
  onNavigateToFleet: () => void;
  onNavigateToRouting: () => void;
  onNavigateToSimulation: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToReports: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToSettings: () => void;
  onNavigateToHelp: () => void;
  onBackToLanding: () => void;
  currentUserRole?: string;
  onUpdateRole?: (newRole: string) => void;
}

interface UserProfileData {
  fullName: string;
  email: string;
  roleTitle: string;
  organization: string;
  department: string;
  phone: string;
  location: string;
  timezone: string;
  clearanceLevel: string;
  terminalId: string;
}

const DEFAULT_PROFILE: UserProfileData = {
  fullName: 'Commander Elena Vance',
  email: 'e.vance@freighttwin.internal',
  roleTitle: 'Logistics Operations Director',
  organization: 'Global Freight Twin Intermodal Network',
  department: 'Central Command & Digital Twin Dispatch',
  phone: '+1 (312) 555-0192',
  location: 'Chicago Operations Center (IL, USA)',
  timezone: 'America/Chicago (CST, UTC-6)',
  clearanceLevel: 'LEVEL 4 — FULL DISPATCH & REROUTE AUTHORITY',
  terminalId: 'CHI-HQ-OPS-01',
};

export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  onBackToDashboard,
  onNavigateToDigitalTwin,
  onNavigateToFleet,
  onNavigateToRouting,
  onNavigateToSimulation,
  onNavigateToAnalytics,
  onNavigateToReports,
  onNavigateToNotifications,
  onNavigateToSettings,
  onNavigateToHelp,
  currentUserRole = 'Logistics Operations Director',
  onUpdateRole,
}) => {
  const [profile, setProfile] = useState<UserProfileData>(() => {
    try {
      const saved = localStorage.getItem('freighttwin_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback to default
    }
    return { ...DEFAULT_PROFILE, roleTitle: currentUserRole || DEFAULT_PROFILE.roleTitle };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('freighttwin_user_profile', JSON.stringify(profile));
    } catch {
      // Ignore storage errors
    }
    if (onUpdateRole) {
      onUpdateRole(profile.roleTitle);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem('freighttwin_user_profile');
    } catch {
      // Ignore storage errors
    }
  };

  const navSections = getAppNavSections(4);

  const handleNavSelect = (id: string) => {
    if (id === 'overview') onBackToDashboard();
    else if (id === 'digital_twin') onNavigateToDigitalTwin();
    else if (id === 'fleet') onNavigateToFleet();
    else if (id === 'routing') onNavigateToRouting();
    else if (id === 'simulation') onNavigateToSimulation();
    else if (id === 'analytics') onNavigateToAnalytics();
    else if (id === 'reports') onNavigateToReports();
    else if (id === 'notifications') onNavigateToNotifications();
    else if (id === 'settings') onNavigateToSettings();
    else if (id === 'help') onNavigateToHelp();
  };

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId="profile"
      onSelect={handleNavSelect}
      breadcrumbs={['FreightTwin', 'System & Support', 'Operator Profile & Credentials']}
      searchValue={searchValue}
      onSearchChange={(e) => setSearchValue(e.target.value)}
      roleLabel={profile.roleTitle}
      onAlertClick={onNavigateToNotifications}
      onProfileClick={() => {}}
    >
      <div className="max-w-4xl mx-auto space-y-6 pb-12 text-left">
        {/* Page Header */}
        <PageHeader
          title="Operator Profile & Security Credentials"
          description="Manage operational identity, dispatch clearance permissions, and local terminal workstation bindings."
          actions={
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={onBackToDashboard}
            >
              Dashboard
            </Button>
          }
        />

        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="p-1 rounded-md bg-blue-100 text-blue-600">
              <User className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-blue-700 font-bold uppercase">
              Local Operator Identity:
            </span>
            <span className="text-slate-600 truncate">
              Local frontend profile settings stored in browser local storage. No external OAuth backend modified.
            </span>
          </div>

          <Badge variant="cyan" size="sm">
            TERMINAL {profile.terminalId}
          </Badge>
        </div>

        {/* Profile Card Header */}
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-display text-2xl font-bold shadow-md">
                EV
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-slate-900">
                    {profile.fullName}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ACTIVE OPERATOR
                  </span>
                </div>
                <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  {profile.roleTitle}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Terminal: {profile.terminalId} • {profile.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
                ENCRYPTED LOCAL STORAGE
              </span>
            </div>
          </div>

          {/* Edit Profile Form */}
          <form onSubmit={handleSave} className="space-y-5 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Operator Full Name
                </label>
                <Input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-600" />
                  Work Email Address
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* Role Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  Assigned Operational Role
                </label>
                <Input
                  type="text"
                  value={profile.roleTitle}
                  onChange={(e) =>
                    setProfile({ ...profile, roleTitle: e.target.value })
                  }
                  required
                />
              </div>

              {/* Organization */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                  Enterprise Organization
                </label>
                <Input
                  type="text"
                  value={profile.organization}
                  onChange={(e) =>
                    setProfile({ ...profile, organization: e.target.value })
                  }
                  required
                />
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Department
                </label>
                <Input
                  type="text"
                  value={profile.department}
                  onChange={(e) =>
                    setProfile({ ...profile, department: e.target.value })
                  }
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  Contact Phone / Call Sign
                </label>
                <Input
                  type="text"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                />
              </div>

              {/* Timezone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-600" />
                  Operational Timezone
                </label>
                <Input
                  type="text"
                  value={profile.timezone}
                  onChange={(e) =>
                    setProfile({ ...profile, timezone: e.target.value })
                  }
                />
              </div>

              {/* Clearance Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Security Clearance Badge
                </label>
                <Input
                  type="text"
                  value={profile.clearanceLevel}
                  disabled
                  className="bg-slate-100 text-slate-500 font-mono text-xs cursor-not-allowed"
                />
              </div>
            </div>

            {savedSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Profile updated successfully in browser local storage.</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={handleReset}
              >
                Reset Default
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Recent Access History & Session Log */}
        <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
              <Laptop className="w-3.5 h-3.5" />
            </span>
            Active Operator Session & Security Audit
          </h3>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-slate-900 font-bold block">
                  Current Session: Command Terminal WebApp
                </span>
                <span className="text-[10px] text-slate-500">
                  IP 192.168.1.104 • Browser Client • SSL TLS 1.3
                </span>
              </div>
              <Badge variant="success" size="sm">
                CURRENT
              </Badge>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/50 border border-slate-200/50 flex items-center justify-between text-slate-500">
              <div>
                <span className="text-slate-700 font-medium block">
                  GIS Terminal Dispatch Workstation
                </span>
                <span className="text-[10px] text-slate-400">
                  Yesterday 17:45 CST • Session closed normally
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">LOGGED OUT</span>
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default UserProfilePage;
