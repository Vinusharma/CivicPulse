import React from 'react';
import { cn } from './cn';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('rounded-md border border-civic-border bg-civic-surface', className)} {...props} />
);
