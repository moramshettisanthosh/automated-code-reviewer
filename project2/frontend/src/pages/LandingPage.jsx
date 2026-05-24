import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, GitBranch, Cpu, BookOpen, Activity } from 'lucide-react';

const features = [
  { label: 'AI-powered Review', icon: Sparkles },
  { label: 'Security Audit', icon: ShieldCheck },
  { label: 'GitHub Connect', icon: GitBranch },
  { label: 'Performance Insights', icon: Cpu },
  { label: 'Documentation Generator', icon: BookOpen },
  { label: 'Analytics Dashboard', icon: Activity },
];

const LandingPage = () => {
  return (
    <main className="min-h-screen px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <p className="inline-flex rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-cyan-200">AI review platform for modern engineering teams</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white md:text-6xl">NovaReviewAI makes every code review faster, safer, and smarter.</h1>
            <p className="max-w-2xl text-lg text-slate-300">Upload files, paste code, connect repositories, and get professional AI-driven suggestions for bugs, security, performance, and maintainability.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="rounded-3xl bg-gradient-to-r from-primary to-accent px-6 py-4 text-sm font-semibold text-slate-950 shadow-glow transition hover:opacity-90">Get Started</Link>
              <Link to="/login" className="rounded-3xl border border-white/10 px-6 py-4 text-sm text-slate-200 transition hover:bg-white/5">View demo</Link>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glow backdrop-blur-xl">
            <div className="mb-8 text-white">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Explore key capabilities</p>
              <h2 className="mt-4 text-3xl font-semibold">Built for quality-focused developers</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.label} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 transition hover:border-cyan-300/40 hover:bg-slate-900/90">
                  <feature.icon className="h-6 w-6 text-cyan-300" />
                  <p className="mt-4 text-lg font-semibold text-white">{feature.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
