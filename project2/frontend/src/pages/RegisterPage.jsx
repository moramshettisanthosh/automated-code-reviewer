import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

const RegisterPage = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/register', form);
      login(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to register, please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(63,78,252,0.18),_transparent_18%),_linear-gradient(180deg,_#020617_0%,_#060a17_100%)] px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-glow backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">NovaReviewAI</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Create your account and launch smart reviews.</h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-300"
                placeholder="First Last"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-300"
                placeholder="hello@developer.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-300"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
            <button type="submit" className="inline-flex w-full justify-center rounded-3xl bg-gradient-to-r from-primary to-accent px-6 py-4 text-base font-semibold text-slate-950 shadow-glow transition hover:opacity-95">
              Create account
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-300 hover:text-cyan-200">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
