import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCivic } from '../context/CivicContext';
import { STATES_LIST, CATEGORIES_LIST } from '../mockData';

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-accent';

const row = (active: boolean) =>
  `flex w-full items-center justify-between border-l-2 px-3 py-1.5 text-left text-sm transition-colors ${ring} ${
    active ? 'border-civic-accent bg-civic-raised text-civic-text' : 'border-transparent text-civic-muted hover:bg-civic-raised hover:text-civic-text'
  }`;

export const LeftSidebar: React.FC = () => {
  const { selectedState, setSelectedState, selectedCategory, setSelectedCategory } = useCivic();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 text-sm">
      <section aria-labelledby="side-states">
        <div className="mb-2 flex items-baseline justify-between px-3">
          <h2 id="side-states" className="font-display text-base font-semibold text-civic-text">States</h2>
          {selectedState !== 'All' && (
            <button type="button" onClick={() => { setSelectedState('All'); navigate('/'); }} className={`rounded text-xs text-civic-accent hover:underline ${ring}`}>
              Show all
            </button>
          )}
        </div>
        <ul className="max-h-64 overflow-y-auto">
          {STATES_LIST.map((st) => (
            <li key={st.name}>
              <button type="button" aria-current={selectedState === st.name} onClick={() => { setSelectedState(st.name); navigate(`/s/${st.name}`); }} className={row(selectedState === st.name)}>
                <span className="truncate">{st.name}</span>
                <span className="ml-2 font-mono text-xs text-civic-muted">{st.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="side-categories">
        <div className="mb-2 flex items-baseline justify-between px-3">
          <h2 id="side-categories" className="font-display text-base font-semibold text-civic-text">Topics</h2>
          {selectedCategory !== 'All' && (
            <button type="button" onClick={() => setSelectedCategory('All')} className={`rounded text-xs text-civic-accent hover:underline ${ring}`}>
              Show all
            </button>
          )}
        </div>
        <ul>
          {CATEGORIES_LIST.map((cat) => {
            const key = cat.name === 'All Categories' ? 'All' : cat.name;
            return (
              <li key={cat.name}>
                <button type="button" aria-current={selectedCategory === key} onClick={() => { setSelectedCategory(key); navigate('/'); }} className={row(selectedCategory === key)}>
                  <span className="truncate">{cat.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="border-t border-civic-border px-3 pt-4 text-xs leading-relaxed text-civic-muted">
        Photos lose their location and device data before they are shown here.
      </p>
    </div>
  );
};
