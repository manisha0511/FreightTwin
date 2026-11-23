import {
  Activity,
  Layers,
  Truck,
  Compass,
  Sliders,
  BarChart2,
  FileText,
  Bell,
  User,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { NavSection } from '../../design-system';

export function getAppNavSections(unreadAlerts: number = 4): NavSection[] {
  return [
    {
      title: 'Command Center',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          icon: Activity,
          href: '#/dashboard',
        },
        {
          id: 'digital_twin',
          label: 'Digital Twin',
          icon: Layers,
          href: '#/digital-twin',
          badge: 'GIS Live',
        },
        {
          id: 'fleet',
          label: 'Fleet Management',
          icon: Truck,
          href: '#/fleet',
          badge: '142 Units',
        },
        {
          id: 'routing',
          label: 'Route Planning',
          icon: Compass,
          href: '#/routing',
          badge: 'Multi-Modal',
          badgeVariant: 'cyan',
        },
      ],
    },
    {
      title: 'Decision Intelligence',
      items: [
        {
          id: 'simulation',
          label: 'Transport Simulation',
          icon: Sliders,
          href: '#/simulation',
          badge: 'Sandbox',
          badgeVariant: 'warning',
        },
        {
          id: 'analytics',
          label: 'Analytics & KPIs',
          icon: BarChart2,
          href: '#/analytics',
        },
        {
          id: 'reports',
          label: 'Reports & ESG',
          icon: FileText,
          href: '#/reports',
          badge: 'GLEC v3',
        },
      ],
    },
    {
      title: 'System & Support',
      items: [
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          href: '#/notifications',
          badge: unreadAlerts > 0 ? unreadAlerts : undefined,
          badgeVariant: 'danger',
        },
        {
          id: 'profile',
          label: 'User Profile',
          icon: User,
          href: '#/profile',
        },
        {
          id: 'settings',
          label: 'System Settings',
          icon: Settings,
          href: '#/settings',
        },
        {
          id: 'help',
          label: 'Help & Support',
          icon: HelpCircle,
          href: '#/help',
        },
      ],
    },
  ];
}
