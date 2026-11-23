import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'interactive' | 'hero';
}

export const Card: React.FC<CardProps> & {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  Description: React.FC<React.HTMLAttributes<HTMLParagraphElement>>;
  Body: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Footer: React.FC<React.HTMLAttributes<HTMLDivElement>>;
} = ({ className, variant = 'default', children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-200 text-left',
        variant === 'default' && 'bg-white border-command-border shadow-command-sm',
        variant === 'surface' && 'bg-command-subdued border-command-border shadow-premium-xs',
        variant === 'interactive' &&
          'bg-white border-command-border hover:border-command-border-subtle cursor-pointer shadow-command-sm hover:shadow-command-md hover:-translate-y-0.5',
        variant === 'hero' &&
          'bg-gradient-to-br from-white via-white to-blue-50/30 border-command-border shadow-premium-md relative overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={cn('flex items-center justify-between p-5 pb-4 border-b border-command-border/70', className)}
    {...props}
  >
    {children}
  </div>
);

const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h3 className={cn('text-sm sm:text-base font-bold text-text-primary tracking-tight font-display', className)} {...props}>
    {children}
  </h3>
);

const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={cn('text-xs text-text-secondary mt-0.5 leading-relaxed', className)} {...props}>
    {children}
  </p>
);

const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn('p-5', className)} {...props}>
    {children}
  </div>
);

const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={cn('flex items-center justify-between p-5 pt-4 border-t border-command-border/70 text-xs text-text-secondary bg-slate-50/50 rounded-b-2xl', className)}
    {...props}
  >
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;
