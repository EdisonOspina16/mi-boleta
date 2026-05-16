import { HTMLAttributes, forwardRef } from 'react';
import { cn } from './utils';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-indigo-100/50 backdrop-blur-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
