import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import api from '../services/api';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get('/reviews/history').then((res) => setHistory(res.data.reviews)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main>
          <Header title="Review History" subtitle="Session archive" />
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <h2 className="text-2xl font-semibold text-white">Latest reviews</h2>
            <div className="mt-6 space-y-4">
              {history.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-400">You have no review history yet.</div>
              ) : (
                history.map((review) => (
                  <div key={review._id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">{review.fileName}</p>
                        <p className="mt-1 text-sm text-slate-400">{review.language} · {new Date(review.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="flex gap-3 text-sm text-slate-300">
                        <span className="rounded-full bg-white/5 px-3 py-2">Quality {review.qualityScore}</span>
                        <span className="rounded-full bg-white/5 px-3 py-2">Readability {review.readabilityScore}</span>
                      </div>
                    </div>
                    <p className="mt-4 text-slate-300 line-clamp-3">{review.summary}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoryPage;
