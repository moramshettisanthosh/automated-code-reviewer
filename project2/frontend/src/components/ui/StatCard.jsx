const StatCard = ({ title, value, description, accent }) => {
  return (
    <div className="glass-card rounded-3xl border border-white/10 p-6 shadow-glow">
      <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">{title}</p>
      <p className={`mt-4 text-4xl font-semibold ${accent || 'text-white'}`}>{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
};

export default StatCard;
