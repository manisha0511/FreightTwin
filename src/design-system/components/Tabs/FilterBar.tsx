import React from 'react';
import { Filter, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FilterChip {
  id: string;
  category: string;
  value: string;
}

export interface FilterBarProps {
  chips: FilterChip[];
  onRemoveChip: (id: string) => void;
  onClearAll: () => void;
  onOpenFilterDialog?: () => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  chips,
  onRemoveChip,
  onClearAll,
  onOpenFilterDialog,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-white border border-command-border text-xs shadow-premium-xs',
        className
      )}
    >
      {/* Trigger Button */}
      {onOpenFilterDialog && (
        <button
          onClick={onOpenFilterDialog}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-command-border text-text-primary font-semibold transition-colors cursor-pointer"
        >
          <Filter className="w-3.5 h-3.5 text-accent-primary" />
          <span>Filters</span>
        </button>
      )}

      {/* Active Filter Chips */}
      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50/90 border border-blue-200/80 text-text-primary shadow-premium-xs"
        >
          <span className="text-text-muted font-medium">{chip.category}:</span>
          <span className="font-semibold text-accent-primary">{chip.value}</span>
          <button
            onClick={() => onRemoveChip(chip.id)}
            className="p-0.5 rounded-full hover:bg-blue-100 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            aria-label={`Remove filter ${chip.category} ${chip.value}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {/* Clear All */}
      {chips.length > 0 && (
        <button
          onClick={onClearAll}
          className="text-text-muted hover:text-status-danger text-xs font-semibold px-2 py-1 transition-colors cursor-pointer"
        >
          Clear all ({chips.length})
        </button>
      )}

      {chips.length === 0 && !onOpenFilterDialog && (
        <span className="text-text-muted px-2 py-1">No active filters applied</span>
      )}
    </div>
  );
};
