import React from 'react';
import { cn } from './cn';

type Tone = 'neutral' | 'accent' | 'blue' | 'green' | 'amber' | 'red';

const tones: Record<Tone, string> = {
  neutral: 'border-civic-border text-civic-muted',
  accent: 'border-civic-accent/50 text-civic-accent',
  blue: 'border-civic-blue/50 text-civic-blue',
  green: 'border-civic-green/50 text-civic-green',
  amber: 'border-civic-amber/50 text-civic-amber',
  red: 'border-civic-red/50 text-civic-red',
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export const Badge: React.FC<BadgeProps> = ({ tone = 'neutral', className, ...props }) => (
  <span className={cn('inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[11px] font-medium', tones[tone], className)} {...props} />
);
