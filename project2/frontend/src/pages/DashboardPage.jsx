import { motion } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import StatCard from '../components/ui/StatCard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main>
          <Header title="Dashboard" subtitle="AI review center" />
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Reviews" value="128" description="Automated reviews completed this month." accent="text-cyan-300" />
            <StatCard title="Quality score" value="91" description="Average code quality score across all submissions." accent="text-emerald-300" />
            <StatCard title="Security alerts" value="14" description="Potential vulnerabilities detected for review." accent="text-amber-300" />
            <StatCard title="GitHub repos" value="8" description="Connected repositories for live analysis." accent="text-violet-300" />
          </section>
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Review workflow</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Smart modes for every developer</h2>
              <p className="mt-3 text-slate-300">Switch between explain, fix, optimize, security audit, and refactor modes for the review style you need.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Team analytics</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Track performance over time</h2>
              <p className="mt-3 text-slate-300">Use trend charts for code quality, bug frequency, and language distribution across review history.</p>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
