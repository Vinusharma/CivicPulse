import React from 'react';
import { cn } from './cn';

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div aria-hidden="true" className={cn('animate-pulse rounded-lg bg-civic-raised motion-reduce:animate-none', className)} {...props} />
);
