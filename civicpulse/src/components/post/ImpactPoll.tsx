import React from 'react';
import { Post } from '../../types';
import { cn } from '../ui';

interface Props {
  poll: Post['pollData'];
  onVote: (optionId: string) => void;
}

export const ImpactPoll: React.FC<Props> = ({ poll, onVote }) => {
  const hasVoted = Boolean(poll.userVotedOptionId);

  return (
    <section aria-label="Poll" className="mt-4 rounded-md border border-civic-border p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold text-civic-text">{poll.question}</h3>
        <span className="shrink-0 font-mono text-xs text-civic-muted">{poll.totalVotes.toLocaleString('en-IN')} votes</span>
      </div>

      <div className="mt-3 space-y-1">
        {poll.options.map((opt) => {
          const pct = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
          const selected = poll.userVotedOptionId === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              disabled={hasVoted}
              aria-pressed={selected}
              onClick={() => onVote(opt.id)}
              className={cn(
                'block min-h-[44px] w-full rounded-sm px-2 py-2 text-left transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-accent',
                hasVoted ? 'cursor-default' : 'hover:bg-civic-raised',
              )}
            >
              <span className="flex items-baseline justify-between gap-3 text-sm">
                <span className={selected ? 'font-semibold text-civic-text' : 'text-civic-text/85'}>
                  {opt.label}{selected ? ' (your vote)' : ''}
                </span>
                <span className="font-mono text-xs text-civic-muted">{pct}%</span>
              </span>
              <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-sm bg-civic-raised" aria-hidden="true">
                <span className={cn('block h-full transition-all duration-500 motion-reduce:transition-none', selected ? 'bg-civic-accent' : 'bg-civic-muted/60')} style={{ width: `${pct}%` }} />
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-2 px-2 text-xs text-civic-muted">
        {hasVoted ? 'Your vote is saved on this device.' : 'Votes are anonymous. Pick the option that fits you.'}
      </p>
    </section>
  );
};
