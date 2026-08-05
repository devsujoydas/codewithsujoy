import { useState } from "react";
import { getProjects, addProject, updateProject, deleteProject } from "../../utils/adminStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Pencil, Trash2, Search, ExternalLink, Star } from "lucide-react";

const emptyProject = {
  title: "", description: "", techStack: [], liveLink: "", githubLink: "",
  image: "", images: [], category: "Frontend", featured: false, features: [],
};

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState(getProjects);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const refresh = () => setProjects(getProjects());
  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filtered = projects
    .filter((p) => filter === "All" || p.category === filter)
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm(emptyProject); setEditing(null); setTechInput(""); setFeatureInput(""); setDialogOpen(true); };
  const openEdit = (p) => {
    setForm({ title: p.title, description: p.description, techStack: p.techStack, liveLink: p.liveLink, githubLink: p.githubLink, image: p.image, images: p.images, category: p.category, featured: p.featured, features: p.features });
    setEditing(p);
    setTechInput("");
    setFeatureInput("");
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) {
      updateProject(editing.id, form);
    } else {
      addProject(form);
    }
    refresh();
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this project?")) {
      deleteProject(id);
      refresh();
    }
  };

  const addTech = () => { if (techInput.trim()) { setForm({ ...form, techStack: [...form.techStack, techInput.trim()] }); setTechInput(""); } };
  const addFeature = () => { if (featureInput.trim()) { setForm({ ...form, features: [...form.features, featureInput.trim()] }); setFeatureInput(""); } };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {c}
            </button>
          ))}
          <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center"><p className="text-muted-foreground">No projects found.</p></div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {p.image && <img src={p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground truncate">{p.title}</h4>
                  {p.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {p.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>
                  ))}
                  {p.techStack.length > 4 && <span className="text-xs text-muted-foreground">+{p.techStack.length - 4}</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {p.liveLink && p.liveLink !== "#" && <a href={p.liveLink} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" /></a>}
                <button onClick={() => openEdit(p)}><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary" /></button>
                <button onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Frontend, Fullstack, etc." /></div>
        <div><Label>Image URL</Label><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
        <div><Label>Live Link</Label><Input value={form.liveLink} onChange={(e) => setForm({ ...form, liveLink: e.target.value })} /></div>
        <div><Label>GitHub Link</Label><Input value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} /></div>
        <div>
          <Label>Tech Stack</Label>
          <div className="flex gap-2"><Input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} placeholder="Add tech..." /><Button type="button" size="sm" onClick={addTech}>Add</Button></div>
          <div className="flex gap-1 mt-2 flex-wrap">{form.techStack.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1">{t}<button onClick={() => setForm({ ...form, techStack: form.techStack.filter((_, j) => j !== i) })} className="hover:text-destructive">×</button></span>
          ))}</div>
        </div>
        <div>
          <Label>Features</Label>
          <div className="flex gap-2"><Input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())} placeholder="Add feature..." /><Button type="button" size="sm" onClick={addFeature}>Add</Button></div>
          <div className="flex gap-1 mt-2 flex-wrap">{form.features.map((f, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent flex items-center gap-1">{f}<button onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })} className="hover:text-destructive">×</button></span>
          ))}</div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
          Featured project
        </label>
        <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Create"}</Button>
      </div>
    </div>
  );
};

export default ProjectsAdmin;