import React from 'react';
import { cn } from './cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, hint, error, id, className, ...props }) => {
  const inputId = id ?? `in-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const describedBy = error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-civic-text">{label}</label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={cn(
          'w-full rounded-md border bg-civic-surface px-3 py-2.5 text-sm text-civic-text placeholder:text-civic-muted/70',
          'focus:outline-none focus:ring-2 focus:ring-civic-accent',
          error ? 'border-civic-red' : 'border-civic-border',
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-err`} className="text-xs text-civic-red">{error}</p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-civic-muted">{hint}</p>
      ) : null}
    </div>
  );
};
