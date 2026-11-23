import React, { useState } from 'react';
import {
  Bell,
  X,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCheck,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { Badge, Button } from '../../../design-system';
import { DashboardAlert } from '../types/dashboard.types';

export interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: DashboardAlert[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAlert: (id: string) => void;
  onActionClick?: (alert: DashboardAlert) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAlert,
  onActionClick,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'danger'>('all');

  if (!isOpen) return null;

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'unread') return !a.isRead;
    if (filter === 'danger') return a.severity === 'danger';
    return true;
  });

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer (Right side) */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200 text-left">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                <span>Alerts & Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-600 text-white">
                    {unreadCount} NEW
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-500">
                System telemetry & corridor bottleneck monitors
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close alerts"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Mark-all-read bar */}
        <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-white text-xs">
          <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                filter === 'unread'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('danger')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                filter === 'danger'
                  ? 'bg-white text-red-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Critical
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Alert List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-3 space-y-2">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No notifications matching current filter.
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-2xl transition-all border ${
                  !alert.isRead
                    ? 'bg-blue-50/40 border-blue-200/80 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`p-1.5 rounded-lg border ${
                        alert.severity === 'danger'
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : alert.severity === 'warning'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-blue-50 text-blue-600 border-blue-200'
                      }`}
                    >
                      {alert.severity === 'danger' ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : alert.severity === 'warning' ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <Info className="w-4 h-4" />
                      )}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-display">
                        {alert.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        {alert.timestamp} • {alert.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {!alert.isRead && (
                      <button
                        onClick={() => onMarkAsRead(alert.id)}
                        className="p-1 rounded text-slate-400 hover:text-blue-600 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onClearAlert(alert.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
                      title="Dismiss alert"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  {alert.message}
                </p>

                {alert.actionLabel && onActionClick && (
                  <div className="pl-8 pt-2">
                    <Button
                      variant="outline"
                      size="xs"
                      rightIcon={<ExternalLink className="w-3 h-3" />}
                      onClick={() => onActionClick(alert)}
                    >
                      {alert.actionLabel}
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
