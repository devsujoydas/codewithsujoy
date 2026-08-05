import { useState } from "react";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../../utils/adminStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from "lucide-react";

const emptyBlog = {
  title: "", content: "", category: "", tags: [], slug: "",
  thumbnail: "", published: false, metaTitle: "", metaDescription: "",
};

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState(getBlogs);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [tagInput, setTagInput] = useState("");

  const refresh = () => setBlogs(getBlogs());

  const filtered = blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm(emptyBlog); setEditing(null); setTagInput(""); setDialogOpen(true); };
  const openEdit = (b) => {
    setForm({ title: b.title, content: b.content, category: b.category, tags: b.tags, slug: b.slug, thumbnail: b.thumbnail, published: b.published, metaTitle: b.metaTitle, metaDescription: b.metaDescription });
    setEditing(b); setTagInput(""); setDialogOpen(true);
  };

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = () => {
    if (!form.title.trim()) return;
    const data = { ...form, slug: form.slug || generateSlug(form.title) };
    if (editing) { updateBlog(editing.id, data); } else { addBlog(data); }
    refresh(); setDialogOpen(false);
  };

  const handleDelete = (id) => { if (confirm("Delete this blog post?")) { deleteBlog(id); refresh(); } };
  const togglePublish = (b) => { updateBlog(b.id, { published: !b.published }); refresh(); };
  const addTag = () => { if (tagInput.trim()) { setForm({ ...form, tags: [...form.tags, tagInput.trim()] }); setTagInput(""); } };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search blogs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1" /> Add Post</Button>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center"><p className="text-muted-foreground">No blog posts yet.</p></div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((b) => (
            <div key={b.id} className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {b.thumbnail && <img src={b.thumbnail} alt={b.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">{b.title}</h4>
                <p className="text-xs text-muted-foreground">{b.category} · {new Date(b.createdAt).toLocaleDateString()}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {b.tags.map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2 items-center shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${b.published ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                  {b.published ? "Published" : "Draft"}
                </span>
                <button onClick={() => togglePublish(b)}>{b.published ? <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground hover:text-accent" />}</button>
                <button onClick={() => openEdit(b)}><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary" /></button>
                <button onClick={() => handleDelete(b.id)}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Auto-generated from title" /></div>
        <div><Label>Content</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} /></div>
        <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
        <div><Label>Thumbnail URL</Label><Input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} /></div>
        <div>
          <Label>Tags</Label>
          <div className="flex gap-2"><Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add tag..." /><Button type="button" size="sm" onClick={addTag}>Add</Button></div>
          <div className="flex gap-1 mt-2 flex-wrap">{form.tags.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary flex items-center gap-1">{t}<button onClick={() => setForm({ ...form, tags: form.tags.filter((_, j) => j !== i) })} className="hover:text-destructive">×</button></span>
          ))}</div>
        </div>
        <div><Label>Meta Title</Label><Input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} /></div>
        <div><Label>Meta Description</Label><Textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={2} /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" /> Published</label>
        <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Create"}</Button>
      </div>
    </div>
  );
};

export default BlogsAdmin;