import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Post } from '../../types';
import { Button, cn } from '../ui';

interface Props {
  post: Post;
  onVerify: (vote: 'verify' | 'dispute') => void;
}

export const OfficialResponse: React.FC<Props> = ({ post, onVerify }) => {
  const res = post.officialResponse;
  if (!res) return null;
  const v = post.verification;
  const passing = v ? v.approvalPercentage >= 60 : false;

  return (
    <section aria-label="Official response" className="mt-5 border-l-2 border-civic-blue pl-4 text-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="font-semibold text-civic-text">{res.authorityName}</p>
        {res.actionOrderNumber && <span className="font-mono text-xs text-civic-muted">Order {res.actionOrderNumber}</span>}
      </div>
      <p className="text-xs text-civic-muted">{res.officerRole} · {res.department}</p>

      <p className="mt-2 leading-relaxed text-civic-text/90">{res.statement}</p>

      {res.proofUrl && (
        <a href={res.proofUrl} target="_blank" rel="noreferrer noopener" className="mt-2 inline-flex items-center gap-1 text-xs text-civic-blue hover:underline">
          Official proof photo <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      )}

      {v && (
        <div className="mt-4 border-t border-civic-border pt-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
            <span className="font-medium text-civic-text">Do residents accept this? 60% must agree.</span>
            <span className={cn('font-mono', passing ? 'text-civic-green' : 'text-civic-red')}>{v.approvalPercentage}% agree</span>
          </div>

          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={v.approvalPercentage}
            aria-label="Residents who accept the resolution, 60 percent needed"
            className="relative mt-2 h-1.5 w-full overflow-hidden rounded-sm bg-civic-raised"
          >
            <div className={cn('h-full transition-all duration-500 motion-reduce:transition-none', passing ? 'bg-civic-green' : 'bg-civic-red')} style={{ width: `${Math.min(100, Math.max(3, v.approvalPercentage))}%` }} />
            <div className="absolute inset-y-0 w-px bg-civic-text" style={{ left: '60%' }} title="60% threshold" />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-civic-muted">{v.verifiedVotes} accept, {v.disputedVotes} dispute ({v.totalVotes} votes)</span>
            {v.userVote ? (
              <span className="text-xs font-medium text-civic-green">{v.userVote === 'verify' ? 'You accepted this proof' : 'You disputed this claim'}</span>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => onVerify('verify')} title="The problem is actually fixed">Accept</Button>
                <Button size="sm" variant="secondary" onClick={() => onVerify('dispute')} title="The photo is fake or the work is incomplete">Dispute</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
