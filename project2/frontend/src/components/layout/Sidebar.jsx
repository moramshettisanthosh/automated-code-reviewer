import { NavLink } from 'react-router-dom';
import { Home, Code2, Upload, GitBranch, Activity, Clock3, Settings2, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/editor', label: 'Code Editor', icon: Code2 },
  { to: '/upload', label: 'Upload', icon: Upload },
  { to: '/results', label: 'Review Results', icon: Sparkles },
  { to: '/github', label: 'GitHub', icon: GitBranch },
  { to: '/analytics', label: 'Analytics', icon: Activity },
  { to: '/history', label: 'History', icon: Clock3 },
  { to: '/settings', label: 'Settings', icon: Settings2 },
  { to: '/admin', label: 'Admin Panel', icon: ShieldCheck },
];

const Sidebar = () => {
  return (
    <aside className="hidden xl:flex xl:w-72 xl:flex-col xl:gaps-6 xl:p-6 bg-slate-950/90 glass-card">
      <div className="mb-10">
        <p className="text-xl font-semibold text-white">NovaReviewAI</p>
        <p className="text-sm text-slate-400">AI review studio</p>
      </div>
      <nav className="space-y-2">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                isActive ? 'bg-primary/15 text-white shadow-glow' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
