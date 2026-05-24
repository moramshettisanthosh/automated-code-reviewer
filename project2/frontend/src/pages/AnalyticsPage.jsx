import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import api from '../services/api';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get('/analytics/summary').then((res) => setAnalytics(res.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main>
          <Header title="Analytics" subtitle="Quality dashboard" />
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <h2 className="text-2xl font-semibold text-white">Review analytics</h2>
            <p className="mt-2 text-slate-400">A summary of total reviews, code quality trends, and language usage.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Total reviews</p>
                <p className="mt-4 text-3xl font-semibold text-white">{analytics?.totalReviews ?? 0}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Avg quality</p>
                <p className="mt-4 text-3xl font-semibold text-white">{analytics?.averageQuality ?? 0}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Avg maintainability</p>
                <p className="mt-4 text-3xl font-semibold text-white">{analytics?.averageMaintainability ?? 0}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <h3 className="text-lg font-semibold text-white">Language usage</h3>
                <div className="mt-4 space-y-3 text-slate-300">
                  {analytics?.languageUsage && Object.entries(analytics.languageUsage).map(([lang, count]) => (
                    <div key={lang} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span>{lang}</span>
                      <span className="font-semibold text-white">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <h3 className="text-lg font-semibold text-white">Top issues</h3>
                <ul className="mt-4 space-y-3 text-slate-300">
                  {analytics?.commonBugs?.map((item) => (
                    <li key={item} className="rounded-2xl bg-white/5 px-4 py-3">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
