import React from 'react';
import { Post } from '../../types';

const Label: React.FC<{ tone: string; children: React.ReactNode }> = ({ tone, children }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${tone}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
    {children}
  </span>
);

export const StatusBadge: React.FC<{ post: Post }> = ({ post }) => {
  const pct = post.verification?.approvalPercentage;

  if (post.status === 'Resolved') {
    return <Label tone="text-civic-green">{post.verification ? `Resolved · ${pct}% verified` : 'Resolved'}</Label>;
  }
  if (post.status === 'Resolution Disputed') {
    return <Label tone="text-civic-red">Resolution disputed · {pct || 20}% of 60% needed</Label>;
  }
  if (post.status === 'Pending Verification') {
    return <Label tone="text-civic-blue">Awaiting community check</Label>;
  }
  if (post.slaDays >= 7) {
    return <Label tone="text-civic-red">Overdue · {post.slaDays} days</Label>;
  }
  if (post.status === 'Under Review') {
    return <Label tone="text-civic-blue">Under review · {post.slaDays}d</Label>;
  }
  return <Label tone="text-civic-amber">Reported · {post.slaDays}d</Label>;
};
