import { useMemo, useState } from "react";
import { Download, Eye, FileText, Search } from "lucide-react";

const sampleDocuments = [
  { id: 1, name: "Employee Handbook", category: "Policies", type: "PDF", updated: "Nov 20, 2026", description: "Company policies, workplace expectations, and employee resources." },
  { id: 2, name: "Leave and Attendance Policy", category: "Policies", type: "PDF", updated: "Nov 18, 2026", description: "Guidelines for requesting leave and recording attendance." },
  { id: 3, name: "Project Onboarding Guide", category: "Guides", type: "DOC", updated: "Nov 14, 2026", description: "A quick guide to joining projects and collaborating with your team." },
  { id: 4, name: "IT and Security Guidelines", category: "Guides", type: "PDF", updated: "Nov 10, 2026", description: "Recommendations for protecting accounts, devices, and company data." },
  { id: 5, name: "Team Directory Template", category: "Templates", type: "XLS", updated: "Nov 05, 2026", description: "A sample template for organizing team contact information." },
  { id: 6, name: "Weekly Status Report", category: "Templates", type: "DOC", updated: "Oct 29, 2026", description: "A simple format for sharing weekly progress and blockers." },
];

const Document = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All documents");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const documents = useMemo(() => sampleDocuments.filter((doc) => {
    const matchesSearch = `${doc.name} ${doc.description}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesSearch && (category === "All documents" || doc.category === category);
  }), [search, category]);

  const downloadSample = (doc) => {
    const content = `${doc.name}\n\n${doc.description}\n\nSample document for the TeamSync workspace.`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `${doc.name.replaceAll(" ", "-")}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-main p-6 text-primary md:p-8">
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">Workspace resources</p>
        <h1 className="text-2xl font-bold">Documents</h1>
        <p className="mt-1 text-sm text-muted">Browse shared policies, guides, and team templates.</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{documents.length} sample document{documents.length === 1 ? "" : "s"}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search documents" className="w-full rounded-lg border border-theme bg-surface py-2.5 pl-9 pr-3 text-sm text-primary outline-none focus:border-brand sm:w-64" /></div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-theme bg-surface px-3 py-2.5 text-sm text-primary outline-none focus:border-brand"><option>All documents</option><option>Policies</option><option>Guides</option><option>Templates</option></select>
        </div>
      </div>

      {documents.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{documents.map((doc) => <article key={doc.id} className="rounded-xl border border-theme bg-surface p-5 transition hover:shadow-theme"><div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand"><FileText size={21} /></div><span className="rounded-full border border-theme px-2.5 py-1 text-xs text-muted">{doc.type}</span></div><h2 className="mt-4 font-semibold text-primary">{doc.name}</h2><p className="mt-2 min-h-12 text-sm leading-5 text-muted">{doc.description}</p><div className="mt-4 flex items-center justify-between"><span className="text-xs text-muted">{doc.category} · Updated {doc.updated}</span><div className="flex gap-1"><button onClick={() => setSelectedDocument(doc)} title="Preview" className="rounded-lg p-2 text-muted hover:bg-hover hover:text-primary"><Eye size={17} /></button><button onClick={() => downloadSample(doc)} title="Download sample" className="rounded-lg p-2 text-muted hover:bg-hover hover:text-primary"><Download size={17} /></button></div></div></article>)}</div> : <div className="rounded-xl border border-theme bg-surface p-10 text-center text-sm text-muted">No documents match your search.</div>}

      {selectedDocument && <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedDocument(null)}><section role="dialog" aria-modal="true" aria-label="Document preview" onClick={(event) => event.stopPropagation()} className="w-full max-w-lg rounded-xl border border-theme bg-surface p-6 shadow-theme"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-wider text-brand">Sample preview</p><h2 className="mt-1 text-xl font-semibold text-primary">{selectedDocument.name}</h2></div><button onClick={() => setSelectedDocument(null)} className="text-sm text-muted hover:text-primary">Close</button></div><p className="mt-5 text-sm leading-6 text-secondary">{selectedDocument.description}</p><p className="mt-4 rounded-lg border border-theme bg-main p-4 text-sm text-muted">This is sample document data for the interface. Connect a documents API to show and download real company files.</p></section></div>}
    </main>
  );
};

export default Document;
