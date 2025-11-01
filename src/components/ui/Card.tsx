import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
}

/**
 * Card Component
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white rounded-xl shadow-md',
      outlined: 'bg-white rounded-xl border-2 border-gray-200',
      elevated: 'bg-white rounded-xl shadow-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 border-b border-gray-100', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Content
 */
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6', className)}
      {...props}
    />
  )
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 border-t border-gray-100', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';
