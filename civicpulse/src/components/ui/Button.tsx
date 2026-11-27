import React from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-civic-accent text-civic-ink hover:bg-[#e5b050]',
  secondary: 'border border-civic-border bg-transparent text-civic-text hover:bg-civic-raised',
  ghost: 'text-civic-muted hover:bg-civic-raised hover:text-civic-text',
  danger: 'bg-civic-red text-civic-ink hover:bg-[#e2705d]',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-[32px] px-3 text-xs',
  md: 'min-h-[40px] px-4 text-sm',
  lg: 'min-h-[48px] px-6 text-base',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className, type = 'button', ...props }) => (
  <button
    type={type}
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-accent focus-visible:ring-offset-2 focus-visible:ring-offset-civic-dark',
      'disabled:cursor-not-allowed disabled:opacity-50',
      variants[variant],
      sizes[size],
      className,
    )}
    {...props}
  />
);
