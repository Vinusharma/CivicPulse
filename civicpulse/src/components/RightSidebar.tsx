import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCivic } from '../context/CivicContext';

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-accent';

const TOPICS = [
  { tag: 'Pune RTO bribe demands', count: 342, category: 'Corruption & Bribery' },
  { tag: 'EPFO passbook outage', count: 1240, category: 'Gov Website Problem' },
  { tag: 'Laxmi Nagar sewage water', count: 512, category: 'Water Problems' },
  { tag: 'Bellandur parking', count: 820, category: 'Parking & Roads' },
  { tag: 'Surat school waste dump', count: 680, category: 'Sanitation & Gandgi' },
  { tag: 'Parivahan portal errors', count: 1450, category: 'Gov Website Problem' },
];

export const RightSidebar: React.FC = () => {
  const { posts, portals, setSelectedCategory } = useCivic();
  const navigate = useNavigate();

  const resolved = posts.filter((p) => p.status === 'Resolved').length;
  const rate = Math.round((resolved / Math.max(1, posts.length)) * 100);
  const bribeTotal = posts.reduce((sum, p) => sum + (p.bribeAmount || 0), 0);
  const troubled = portals.filter((p) => p.status === 'Down' || p.status === 'Degraded');

  return (
    <div className="space-y-8 text-sm">
      <section aria-labelledby="side-numbers">
        <h2 id="side-numbers" className="mb-3 font-display text-base font-semibold text-civic-text">The numbers</h2>
        <dl className="divide-y divide-civic-border border-y border-civic-border">
          <div className="flex items-baseline justify-between py-2.5">
            <dt className="text-civic-muted">Reports</dt>
            <dd className="font-mono text-civic-text">{posts.length.toLocaleString('en-IN')}</dd>
          </div>
          <div className="flex items-baseline justify-between py-2.5">
            <dt className="text-civic-muted">Resolved</dt>
            <dd className="font-mono text-civic-text">{rate}%</dd>
          </div>
          <div className="flex items-baseline justify-between py-2.5">
            <dt className="text-civic-muted">Bribes demanded</dt>
            <dd className="font-mono text-civic-text">₹{bribeTotal.toLocaleString('en-IN')}</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-civic-muted">Counted from the reports in this dataset.</p>
      </section>

      <section aria-labelledby="side-portals">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="side-portals" className="font-display text-base font-semibold text-civic-text">Portals with problems</h2>
          <Link to="/gov-portals" className={`rounded text-xs text-civic-accent hover:underline ${ring}`}>See all</Link>
        </div>
        {troubled.length === 0 ? (
          <p className="text-civic-muted">No portal problems reported right now.</p>
        ) : (
          <ul className="divide-y divide-civic-border border-y border-civic-border">
            {troubled.slice(0, 3).map((port) => (
              <li key={port.id} className="flex items-start justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-civic-text">{port.portalName}</p>
                  <p className="truncate text-xs text-civic-muted">{port.commonIssues[0]}</p>
                </div>
                <span className={`shrink-0 text-xs font-medium ${port.status === 'Down' ? 'text-civic-red' : 'text-civic-amber'}`}>{port.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="side-topics">
        <h2 id="side-topics" className="mb-3 font-display text-base font-semibold text-civic-text">Most backed topics</h2>
        <ol className="divide-y divide-civic-border border-y border-civic-border">
          {TOPICS.map((t, i) => (
            <li key={t.tag}>
              <button type="button" onClick={() => { setSelectedCategory(t.category); navigate('/'); }} className={`flex w-full items-baseline gap-3 py-2.5 text-left hover:bg-civic-raised ${ring}`}>
                <span className="w-4 font-mono text-xs text-civic-muted">{i + 1}</span>
                <span className="flex-1 text-civic-text">{t.tag}</span>
                <span className="font-mono text-xs text-civic-muted">{t.count}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};
