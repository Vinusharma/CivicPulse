import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { PostCard } from '../components/PostCard';

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-accent';

const TABS = [
  { key: 'hot', label: 'Most backed' },
  { key: 'new', label: 'Newest' },
  { key: 'shame', label: 'Overdue' },
  { key: 'resolved', label: 'Answered' },
];

const TOPICS = [
  { label: 'All', value: 'All' },
  { label: 'Corruption and bribery', value: 'Corruption & Bribery' },
  { label: 'Water', value: 'Water Problems' },
  { label: 'Sanitation', value: 'Sanitation & Gandgi' },
  { label: 'Roads and parking', value: 'Parking & Roads' },
  { label: 'Government portals', value: 'Gov Website Problem' },
];

export const HomePage: React.FC = () => {
  const { stateName } = useParams<{ stateName?: string }>();
  const {
    posts, selectedState, setSelectedState, selectedCategory, setSelectedCategory,
    searchQuery, setSearchQuery, feedFilter, setFeedFilter,
  } = useCivic();

  useEffect(() => {
    if (stateName) setSelectedState(stateName);
  }, [stateName, setSelectedState]);

  const filtered = posts.filter((post) => {
    if (selectedState !== 'All' && post.state.toLowerCase() !== selectedState.toLowerCase()) return false;
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.city.toLowerCase().includes(q) ||
        post.state.toLowerCase().includes(q) ||
        post.subCategory.toLowerCase().includes(q) ||
        post.anonymousHash.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (feedFilter === 'shame') return (post.slaDays >= 7 && post.status !== 'Resolved') || post.status === 'Resolution Disputed';
    if (feedFilter === 'resolved') return post.status === 'Resolved' || post.officialResponse !== undefined;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (feedFilter === 'hot') return b.upvotes + b.pollData.totalVotes - (a.upvotes + a.pollData.totalVotes);
    if (feedFilter === 'new' || feedFilter === 'resolved') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (feedFilter === 'shame') return b.slaDays - a.slaDays;
    return 0;
  });

  const hasFilters = selectedState !== 'All' || selectedCategory !== 'All' || Boolean(searchQuery);
  const resetAll = () => {
    setSelectedState('All');
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const chip = 'inline-flex items-center gap-1.5 rounded-sm border border-civic-border bg-civic-raised px-2 py-1 text-xs text-civic-text';

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-civic-text">Reports</h1>
        <p className="text-sm text-civic-muted" aria-live="polite">{sorted.length} {sorted.length === 1 ? 'report' : 'reports'}</p>
      </div>

      <div className="mt-5 flex gap-6 overflow-x-auto border-b border-civic-border" role="group" aria-label="Sort reports">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            aria-pressed={feedFilter === tab.key}
            onClick={() => setFeedFilter(tab.key as Parameters<typeof setFeedFilter>[0])}
            className={`-mb-px whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${ring} ${feedFilter === tab.key ? 'border-civic-accent text-civic-text' : 'border-transparent text-civic-muted hover:text-civic-text'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by topic">
        {TOPICS.map((t) => (
          <button
            key={t.value}
            type="button"
            aria-pressed={selectedCategory === t.value}
            onClick={() => setSelectedCategory(t.value)}
            className={`whitespace-nowrap rounded-sm border px-2.5 py-1 text-xs transition-colors ${ring} ${selectedCategory === t.value ? 'border-civic-accent text-civic-accent' : 'border-civic-border text-civic-muted hover:text-civic-text'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {hasFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-civic-muted">
          <span>Showing:</span>
          {selectedState !== 'All' && (
            <span className={chip}>{selectedState}<button type="button" onClick={() => setSelectedState('All')} aria-label={`Remove ${selectedState} filter`} className={`rounded ${ring}`}><X className="h-3 w-3" /></button></span>
          )}
          {selectedCategory !== 'All' && (
            <span className={chip}>{selectedCategory}<button type="button" onClick={() => setSelectedCategory('All')} aria-label="Remove topic filter" className={`rounded ${ring}`}><X className="h-3 w-3" /></button></span>
          )}
          {searchQuery && (
            <span className={chip}>“{searchQuery}”<button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search" className={`rounded ${ring}`}><X className="h-3 w-3" /></button></span>
          )}
          <button type="button" onClick={resetAll} className={`ml-auto rounded text-civic-accent hover:underline ${ring}`}>Clear all</button>
        </div>
      )}

      {feedFilter === 'shame' && (
        <p className="mt-4 border-l-2 border-civic-red pl-3 text-sm text-civic-muted">
          Complaints that have gone more than 7 days without a resolution, plus resolutions the community has disputed.
        </p>
      )}

      <div className="mt-6">
        {sorted.length === 0 ? (
          <div className="border-y border-civic-border py-12 text-center">
            <h2 className="font-display text-xl font-semibold text-civic-text">Nothing matches these filters</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm text-civic-muted">
              No reports found{selectedState !== 'All' ? ` in ${selectedState}` : ''}. Try removing a filter, or file the first one.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button type="button" onClick={() => { resetAll(); setFeedFilter('hot'); }} className={`min-h-[40px] rounded-md border border-civic-border px-4 text-sm text-civic-text hover:bg-civic-raised ${ring}`}>Reset filters</button>
              <Link to="/submit" className={`inline-flex min-h-[40px] items-center rounded-md bg-civic-accent px-4 text-sm font-semibold text-civic-ink hover:bg-[#e5b050] ${ring}`}>File a report</Link>
            </div>
          </div>
        ) : (
          sorted.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};
