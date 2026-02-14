import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';

const ADMIN_NAV = [
  { label: 'Impact Stories', path: '/admin' },
  { label: 'She Stories', path: '/admin/she-stories' },
];

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
  onSignOut: () => void;
}

export function AdminLayout({ title, children, onSignOut }: AdminLayoutProps) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h1>
            <nav className="flex gap-1">
              {ADMIN_NAV.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    location.pathname === path ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
