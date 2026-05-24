import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const sampleReview = {
  summary: 'AI review detected a small performance optimization in the loop structure. The function is well-written, but a few naming improvements and code comments will improve maintainability.',
  qualityScore: 88,
  readabilityScore: 92,
  maintainabilityScore: 85,
  details: {
    bugs: ['No immediate runtime bugs found'],
    suggestions: ['Avoid nested loops where possible', 'Add explanatory comments for edge cases', 'Normalize variable naming conventions'],
    security: ['Consider sanitizing user input before processing'],
  },
};

const ReviewResultsPage = () => {
  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main>
          <Header title="Review Results" subtitle="AI-powered feedback" />
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <h2 className="text-2xl font-semibold text-white">Code review summary</h2>
            <p className="mt-3 text-slate-300">Inspect the AI findings, suggestions, and quality metrics for your latest review.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Quality</p>
                <p className="mt-3 text-4xl font-semibold text-white">{sampleReview.qualityScore}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Readability</p>
                <p className="mt-3 text-4xl font-semibold text-white">{sampleReview.readabilityScore}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Maintainability</p>
                <p className="mt-3 text-4xl font-semibold text-white">{sampleReview.maintainabilityScore}</p>
              </div>
            </div>
            <div className="mt-6 space-y-6">
              <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <h3 className="text-xl font-semibold text-white">Summary</h3>
                <p className="mt-4 text-slate-300">{sampleReview.summary}</p>
              </section>
              <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Bugs</p>
                  <ul className="mt-4 space-y-2 text-slate-300">
                    {sampleReview.details.bugs.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Performance</p>
                  <ul className="mt-4 space-y-2 text-slate-300">
                    {sampleReview.details.suggestions.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Security</p>
                  <ul className="mt-4 space-y-2 text-slate-300">
                    {sampleReview.details.security.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReviewResultsPage;
