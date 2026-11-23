import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
  badgeVariant?: 'neutral' | 'cyan' | 'warning' | 'danger';
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}
