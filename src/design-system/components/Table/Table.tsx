import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  density?: 'compact' | 'comfortable';
}

export const Table: React.FC<TableProps> & {
  Header: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  Body: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  Row: React.FC<React.HTMLAttributes<HTMLTableRowElement> & { isSelected?: boolean }>;
  HeadCell: React.FC<
    React.ThHTMLAttributes<HTMLTableCellElement> & {
      sortable?: boolean;
      sortDirection?: 'asc' | 'desc' | null;
      onSort?: () => void;
    }
  >;
  Cell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>>;
} = ({ className, density = 'comfortable', children, ...props }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-command-border bg-white shadow-command-sm">
      <table
        className={cn(
          'w-full text-left border-collapse text-sm',
          density === 'compact' ? 'table-compact' : 'table-comfortable',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => (
  <thead
    className={cn(
      'bg-slate-50/90 border-b border-command-border text-xs uppercase tracking-wider text-text-muted font-semibold font-display select-none',
      className
    )}
    {...props}
  >
    {children}
  </thead>
);

const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => (
  <tbody className={cn('divide-y divide-slate-100 text-text-primary', className)} {...props}>
    {children}
  </tbody>
);

const TableRow: React.FC<
  React.HTMLAttributes<HTMLTableRowElement> & { isSelected?: boolean }
> = ({ className, isSelected, children, ...props }) => (
  <tr
    className={cn(
      'transition-colors duration-150 hover:bg-slate-50/90',
      isSelected && 'bg-blue-50/80 hover:bg-blue-100/60',
      className
    )}
    {...props}
  >
    {children}
  </tr>
);

const TableHeadCell: React.FC<
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    onSort?: () => void;
  }
> = ({
  className,
  sortable = false,
  sortDirection = null,
  onSort,
  children,
  ...props
}) => (
  <th
    className={cn(
      'px-4 py-3.5 font-semibold text-text-muted whitespace-nowrap',
      sortable && 'cursor-pointer hover:text-text-primary transition-colors select-none',
      className
    )}
    onClick={sortable ? onSort : undefined}
    {...props}
  >
    <div className="flex items-center gap-1.5">
      <span>{children}</span>
      {sortable && (
        <span className="text-text-muted shrink-0">
          {sortDirection === 'asc' ? (
            <ArrowUp className="w-3.5 h-3.5 text-accent-primary stroke-[2.5]" />
          ) : sortDirection === 'desc' ? (
            <ArrowDown className="w-3.5 h-3.5 text-accent-primary stroke-[2.5]" />
          ) : (
            <ArrowUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
          )}
        </span>
      )}
    </div>
  </th>
);

const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => (
  <td className={cn('px-4 py-3.5 text-sm text-text-primary whitespace-nowrap', className)} {...props}>
    {children}
  </td>
);

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeadCell = TableHeadCell;
Table.Cell = TableCell;
