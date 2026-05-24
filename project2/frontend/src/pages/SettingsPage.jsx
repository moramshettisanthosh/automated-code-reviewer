import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const SettingsPage = () => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main>
          <Header title="Settings" subtitle="Workspace preferences" />
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Theme mode</h2>
                <p className="mt-2 text-slate-400">Switch between dark and light themes for the editor and dashboard experience.</p>
              </div>
              <button onClick={toggleTheme} className="rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
                {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              </button>
            </div>
            <div className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-300">
              <p>Your current selection is <span className="text-white">{theme}</span>.</p>
              <p>More workspace personalization features are ready to connect to real settings storage.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
