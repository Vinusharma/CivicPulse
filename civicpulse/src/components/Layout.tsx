import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, MobileNav } from './Navbar';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';

export const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-civic-dark font-sans text-civic-text">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-civic-accent focus:px-4 focus:py-2 focus:text-civic-ink">
        Skip to content
      </a>
      <Navbar />

      <div className="mx-auto flex w-full max-w-[1280px] flex-1 gap-10 px-4 pb-24 pt-8 md:pb-10">
        <aside aria-label="Browse" className="sticky top-36 hidden max-h-[calc(100vh-10rem)] w-52 shrink-0 self-start overflow-y-auto lg:block">
          <LeftSidebar />
        </aside>

        <main id="main" className="min-w-0 max-w-[680px] flex-1">
          <Outlet />
        </main>

        <aside aria-label="Summary" className="sticky top-36 hidden max-h-[calc(100vh-10rem)] w-72 shrink-0 self-start overflow-y-auto xl:block">
          <RightSidebar />
        </aside>
      </div>

      <footer className="border-t border-civic-border py-6">
        <p className="mx-auto max-w-[1280px] px-4 text-xs text-civic-muted">
          CivicPulse is a demonstration project. The reports shown are sample data, not real complaints.
        </p>
      </footer>
      <MobileNav />
    </div>
  );
};
