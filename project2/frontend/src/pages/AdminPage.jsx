import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import api from '../services/api';

const AdminPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/stats')
      .then((res) => setStats(res.data))
      .catch(() => setError('Admin data is available for users with permission.'));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main>
          <Header title="Admin Panel" subtitle="Team control center" />
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <h2 className="text-2xl font-semibold text-white">Administration</h2>
            <p className="mt-3 text-slate-400">Review application metrics and manage users from one place.</p>
            {error && <p className="mt-6 rounded-3xl bg-rose-500/10 p-5 text-rose-200">{error}</p>}
            {stats && (
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Active users</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{stats.activeUsers}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Total reviews</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{stats.totalReviews}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Average score</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{stats.averageScore}</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
