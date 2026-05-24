import { useState } from 'react';
import Editor from '@monaco-editor/react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import api from '../services/api';
import Button from '../components/ui/Button';

const modes = [
  'review',
  'explain',
  'fix',
  'optimize',
  'audit',
  'summary',
];

const CodeEditorPage = () => {
  const [code, setCode] = useState('// Paste your code here\nfunction sum(a, b) {\n  return a + b;\n}');
  const [language, setLanguage] = useState('JavaScript');
  const [mode, setMode] = useState('review');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/reviews/analyze', { code, language, mode, fileName: 'editor-input' });
      setResult(response.data.review.summary);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main>
          <Header title="Code Editor" subtitle="Live AI analysis" />
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Paste code or select a review mode</h2>
                <p className="mt-2 text-slate-400">Send source code to the AI engine for inline review, explanation, or refactor guidance.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none">
                  <option>JavaScript</option>
                  <option>TypeScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C</option>
                  <option>C++</option>
                  <option>C#</option>
                  <option>Go</option>
                  <option>PHP</option>
                  <option>Rust</option>
                </select>
                <select value={mode} onChange={(e) => setMode(e.target.value)} className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none">
                  {modes.map((option) => (<option key={option}>{option}</option>))}
                </select>
                <Button type="button" onClick={handleAnalyze}>{loading ? 'Analyzing...' : 'Analyze'}</Button>
              </div>
            </div>
            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <Editor
                height="420px"
                defaultLanguage="javascript"
                value={code}
                theme="vs-dark"
                onChange={(value) => setCode(value)}
                options={{ minimap: { enabled: false }, fontSize: 14, lineNumbers: 'on' }}
              />
            </div>
            {error && <p className="mt-4 rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
            {result && (
              <section className="mt-6 rounded-[2rem] border border-white/10 bg-slate-950/90 p-6">
                <h3 className="text-xl font-semibold text-white">Analysis output</h3>
                <p className="mt-4 whitespace-pre-line text-slate-300">{result}</p>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CodeEditorPage;
