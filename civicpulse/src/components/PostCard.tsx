import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, MessageSquare, Share2, Check } from 'lucide-react';
import { Post } from '../types';
import { useCivic } from '../context/CivicContext';
import { cn } from './ui';
import { StatusBadge } from './post/StatusBadge';
import { ImpactPoll } from './post/ImpactPoll';
import { OfficialResponse } from './post/OfficialResponse';

interface PostCardProps {
  post: Post;
}

const DESC_LIMIT = 240;
const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-accent';
const textBtn = `inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-2 text-xs font-medium text-civic-muted transition-colors hover:bg-civic-raised hover:text-civic-text ${ring}`;

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { votePost, votePoll, voteResolutionVerification, setSelectedState, setSelectedCategory } = useCivic();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const userVote = post.userVote;
  const netVotes = post.upvotes - post.downvotes;
  const isLong = post.description.length > DESC_LIMIT;

  const handleShare = () => {
    const url = `${window.location.origin}/post/${post.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="border-b border-civic-border py-6 first:pt-0">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-civic-muted">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <button type="button" onClick={() => { setSelectedState(post.state); navigate('/'); }} className={`rounded font-medium text-civic-text hover:text-civic-accent ${ring}`}>
            {post.state}
          </button>
          <span aria-hidden="true">·</span>
          <span>{post.city}{post.pincode ? ` ${post.pincode}` : ''}</span>
          <span aria-hidden="true">·</span>
          <span>{post.slaDays === 0 ? 'Today' : `${post.slaDays}d ago`}</span>
        </div>
        <StatusBadge post={post} />
      </header>

      <h2 className="mt-2">
        <Link to={`/post/${post.id}`} className={`rounded font-display text-xl font-semibold leading-snug text-civic-text hover:text-civic-accent sm:text-2xl ${ring}`}>
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 text-xs text-civic-muted">
        <button type="button" onClick={() => { setSelectedCategory(post.category); navigate('/'); }} className={`rounded hover:text-civic-text ${ring}`}>{post.category}</button>
        <span aria-hidden="true"> · </span>
        {post.subCategory}
        {post.bribeAmount !== undefined && <span className="font-medium text-civic-red"> · ₹{post.bribeAmount.toLocaleString('en-IN')} demanded in cash</span>}
        {post.status === 'Escalated' && <span className="font-medium text-civic-red"> · Escalated</span>}
      </p>

      <p className="mt-3 leading-relaxed text-civic-text/85">
        {expanded || !isLong ? post.description : `${post.description.slice(0, DESC_LIMIT)}… `}
        {isLong && (
          <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} className={`ml-1 rounded text-sm font-medium text-civic-accent hover:underline ${ring}`}>
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>

      {post.mediaUrl && (
        <figure className="mt-4">
          <img src={post.mediaUrl} alt={`Evidence photo for: ${post.title}`} className="h-auto max-h-80 w-full rounded-md border border-civic-border object-cover" loading="lazy" decoding="async" />
          <figcaption className="mt-1.5 text-xs text-civic-muted">
            Submitted by {post.anonymousHash}{post.exifStripped ? '. Location and device data removed.' : '.'}
          </figcaption>
        </figure>
      )}

      <ImpactPoll poll={post.pollData} onVote={(optionId) => votePoll(post.id, optionId)} />

      <OfficialResponse post={post} onVerify={(vote) => voteResolutionVerification(post.id, vote)} />

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <div className="flex items-center rounded-md border border-civic-border" role="group" aria-label="Back this report">
            <button type="button" aria-pressed={userVote === 'up'} aria-label="Upvote" onClick={() => votePost(post.id, 'up')} className={cn('flex min-h-[34px] min-w-[34px] items-center justify-center rounded-l-md transition-colors hover:bg-civic-raised', ring, userVote === 'up' ? 'text-civic-accent' : 'text-civic-muted')}>
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="min-w-[2rem] text-center font-mono text-xs text-civic-text" aria-label={`${netVotes} net votes`}>{netVotes}</span>
            <button type="button" aria-pressed={userVote === 'down'} aria-label="Downvote" onClick={() => votePost(post.id, 'down')} className={cn('flex min-h-[34px] min-w-[34px] items-center justify-center rounded-r-md transition-colors hover:bg-civic-raised', ring, userVote === 'down' ? 'text-civic-blue' : 'text-civic-muted')}>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <Link to={`/post/${post.id}`} className={textBtn}>
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            {post.commentsCount} comments
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <button type="button" onClick={handleShare} className={textBtn} aria-live="polite">
            {copied ? <Check className="h-3.5 w-3.5 text-civic-green" aria-hidden="true" /> : <Share2 className="h-3.5 w-3.5" aria-hidden="true" />}
            {copied ? 'Link copied' : 'Share'}
          </button>
          <Link to={`/post/${post.id}`} className={cn(textBtn, 'text-civic-accent hover:text-civic-accent')}>Full record</Link>
        </div>
      </footer>
    </article>
  );
};
