import { LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Header = ({ title, subtitle }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-glow md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">{subtitle}</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-200 shadow-sm">
          <p className="text-xs uppercase text-slate-400">Signed in as</p>
          <p className="mt-1 text-sm font-medium">{user?.name || 'Developer'}</p>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </header>
  );
};

export default Header;
