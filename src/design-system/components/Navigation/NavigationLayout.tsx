import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';
import { NavSection } from './Navigation.types';

export interface NavigationLayoutProps {
  sections: NavSection[];
  activeItemId: string;
  onSelect: (id: string) => void;
  breadcrumbs?: string[];
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSimulating?: boolean;
  onToggleSimulation?: () => void;
  roleLabel?: string;
  unreadAlertCount?: number;
  onAlertClick?: () => void;
  onProfileClick?: () => void;
  children: React.ReactNode;
}

export const NavigationLayout: React.FC<NavigationLayoutProps> = ({
  sections,
  activeItemId,
  onSelect,
  breadcrumbs,
  searchValue,
  onSearchChange,
  isSimulating,
  onToggleSimulation,
  roleLabel,
  unreadAlertCount = 3,
  onAlertClick,
  onProfileClick,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-command-base text-text-primary">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <Sidebar
          sections={sections}
          activeItemId={activeItemId}
          onSelect={onSelect}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        sections={sections}
        activeItemId={activeItemId}
        onSelect={onSelect}
      />

      {/* Main Area: TopNav + Viewport */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden h-full">
        <TopNav
          breadcrumbs={breadcrumbs}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          isSimulating={isSimulating}
          onToggleSimulation={onToggleSimulation}
          roleLabel={roleLabel}
          unreadAlertCount={unreadAlertCount}
          onAlertClick={onAlertClick}
          onProfileClick={onProfileClick}
          onMobileMenuToggle={() => setIsMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-command-base">
          {children}
        </main>
      </div>
    </div>
  );
};
