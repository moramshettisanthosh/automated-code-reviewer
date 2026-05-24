import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import api from '../services/api';
import Button from '../components/ui/Button';

const GitHubPage = () => {
  const [token, setToken] = useState('');
  const [repos, setRepos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/github/repos').then((res) => setRepos(res.data.repositories)).catch(() => {});
  }, []);

  const handleConnect = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      const response = await api.post('/github/connect', { githubToken: token });
      setRepos(response.data.repositories);
      setMessage('Connected repositories loaded.');
    } catch (err) {
      setMessage('Unable to connect GitHub token.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main>
          <Header title="GitHub Integration" subtitle="Repository sync" />
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <div className="grid gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-2xl font-semibold text-white">Connect your GitHub repositories</h2>
                <p className="mt-2 text-slate-400">Use a GitHub personal access token to fetch connected repository metadata and start review scans.</p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleConnect}>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="GitHub token"
                  className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none"
                />
                <Button type="submit">Connect</Button>
              </form>
            </div>
            {message && <p className="mt-4 text-sm text-cyan-200">{message}</p>}
          </div>
          <div className="mt-6 grid gap-4">
            {repos.length === 0 ? (
              <div className="glass-card rounded-[2rem] border border-white/10 p-6 text-slate-400">No GitHub repositories connected.</div>
            ) : (
              repos.map((repo) => (
                <div key={repo.githubId} className="glass-card rounded-[2rem] border border-white/10 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-white">{repo.name}</p>
                      <p className="mt-2 text-slate-400">{repo.description || 'No description available'}</p>
                    </div>
                    <a href={repo.url} target="_blank" rel="noreferrer" className="rounded-full bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-500/20">Open</a>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GitHubPage;
