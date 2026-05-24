import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import api from '../services/api';
import Button from '../components/ui/Button';

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/files').then((res) => setFiles(res.data.files)).catch(() => {});
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;
    const form = new FormData();
    form.append('source', selectedFile);

    try {
      const response = await api.post('/files/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setFiles((prev) => [response.data.file, ...prev]);
      setMessage('Upload successful.');
    } catch (err) {
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main>
          <Header title="Upload Files" subtitle="Source ingestion" />
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">Upload source files for AI review</h2>
                <p className="mt-2 text-slate-400">Supported languages include JavaScript, Python, Java, C/C++, C#, Go, PHP, and Rust.</p>
              </div>
              <form className="grid gap-4 sm:grid-cols-[1fr_auto]" onSubmit={handleUpload}>
                <input
                  type="file"
                  onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4 text-slate-200 outline-none"
                />
                <Button type="submit">Upload</Button>
              </form>
              {message && <p className="text-sm text-cyan-200">{message}</p>}
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {files.length === 0 ? (
              <div className="glass-card rounded-[2rem] border border-white/10 p-6 text-slate-400">No uploaded files yet.</div>
            ) : (
              files.map((file) => (
                <div key={file._id} className="glass-card rounded-[2rem] border border-white/10 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-white">{file.originalName}</p>
                      <p className="mt-2 text-sm text-slate-400">{file.language} · {Math.round(file.size / 1024)} KB</p>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{new Date(file.createdAt).toLocaleDateString()}</span>
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

export default UploadPage;
