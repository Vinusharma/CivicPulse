import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useCivic } from '../context/CivicContext';

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-accent';

const SearchBox: React.FC<{ id: string }> = ({ id }) => {
  const { searchQuery, setSearchQuery } = useCivic();
  return (
    <div role="search" className="relative w-full">
      <label htmlFor={id} className="sr-only">Search reports</label>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-civic-muted" aria-hidden="true" />
      <input
        id={id}
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by place, department or keyword"
        className="w-full rounded-md border border-civic-border bg-civic-surface py-2 pl-9 pr-9 text-sm text-civic-text placeholder:text-civic-muted/70 focus:border-civic-accent focus:outline-none focus:ring-1 focus:ring-civic-accent [&::-webkit-search-cancel-button]:hidden"
      />
      {searchQuery && (
        <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search" className={`absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-civic-muted hover:text-civic-text ${ring}`}>
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

const navLink = ({ isActive }: { isActive: boolean }) =>
  `border-b-2 py-4 text-sm font-medium transition-colors ${ring} ${isActive ? 'border-civic-accent text-civic-text' : 'border-transparent text-civic-muted hover:text-civic-text'}`;

export const Navbar: React.FC = () => {
  const { role, setRole } = useCivic();
  const navigate = useNavigate();

  const seg = (active: boolean) =>
    `min-h-[32px] px-3 text-xs font-medium transition-colors ${ring} ${active ? 'bg-civic-raised text-civic-text' : 'text-civic-muted hover:text-civic-text'}`;

  return (
    <header className="sticky top-0 z-50 border-b border-civic-border bg-civic-dark">
      <div className="hidden border-b border-civic-border/60 bg-civic-surface sm:block">
        <p className="mx-auto max-w-[1280px] px-4 py-1.5 text-xs text-civic-muted">
          Reports are anonymous. Photo metadata is stripped before anything is published.
        </p>
      </div>

      <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-6 px-4">
        <Link to="/" aria-label="CivicPulse home" className={`flex shrink-0 items-baseline gap-2 rounded ${ring}`}>
          <span className="font-display text-2xl font-bold tracking-tight text-civic-text">CivicPulse</span>
          <span className="hidden text-xs text-civic-muted lg:inline">public record</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <NavLink to="/" end className={navLink}>Reports</NavLink>
          <NavLink to="/gov-portals" className={navLink}>Portals</NavLink>
          <NavLink to="/gov-dashboard" className={navLink}>Officials</NavLink>
        </nav>

        <div className="mx-auto hidden w-full max-w-md lg:block">
          <SearchBox id="search-desktop" />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="flex overflow-hidden rounded-md border border-civic-border" role="group" aria-label="View as">
            <button type="button" aria-pressed={role === 'citizen'} onClick={() => setRole('citizen')} className={seg(role === 'citizen')}>Citizen</button>
            <button type="button" aria-pressed={role === 'official'} onClick={() => { setRole('official'); navigate('/gov-dashboard'); }} className={`border-l border-civic-border ${seg(role === 'official')}`}>Official</button>
          </div>
          <Link to="/submit" className={`inline-flex min-h-[36px] items-center rounded-md bg-civic-accent px-4 text-sm font-semibold text-civic-ink transition-colors hover:bg-[#e5b050] ${ring}`}>
            File a report
          </Link>
        </div>
      </div>

      <div className="border-t border-civic-border/60 px-4 py-2 lg:hidden">
        <SearchBox id="search-mobile" />
      </div>
    </header>
  );
};

export const MobileNav: React.FC = () => {
  const items = [
    { to: '/', label: 'Reports', end: true },
    { to: '/gov-portals', label: 'Portals', end: false },
    { to: '/submit', label: 'File', end: false },
    { to: '/gov-dashboard', label: 'Officials', end: false },
  ];
  return (
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-civic-border bg-civic-dark md:hidden">
      {items.map((i) => (
        <NavLink key={i.to} to={i.to} end={i.end}
          className={({ isActive }) => `flex min-h-[52px] items-center justify-center border-t-2 text-xs font-medium ${ring} ${isActive ? 'border-civic-accent text-civic-text' : 'border-transparent text-civic-muted'}`}>
          {i.label}
        </NavLink>
      ))}
    </nav>
  );
};
