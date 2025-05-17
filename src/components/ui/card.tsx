import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />);
Card.displayName = 'Card';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('p-6', className)} {...props} />);
CardContent.displayName = 'CardContent';

export { Card, CardContent };
