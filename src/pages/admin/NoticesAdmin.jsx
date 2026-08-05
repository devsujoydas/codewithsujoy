import { useState } from "react";
import { getNotices, addNotice, updateNotice, deleteNotice } from "../../utils/adminStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

const emptyNotice = { title: "", description: "", expiryDate: "", showOnHomepage: true };

const NoticesAdmin = () => {
  const [notices, setNotices] = useState(getNotices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyNotice);

  const refresh = () => setNotices(getNotices());

  const openAdd = () => { setForm(emptyNotice); setEditing(null); setDialogOpen(true); };
  const openEdit = (n) => {
    setForm({ title: n.title, description: n.description, expiryDate: n.expiryDate, showOnHomepage: n.showOnHomepage });
    setEditing(n); setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) { updateNotice(editing.id, form); } else { addNotice(form); }
    refresh(); setDialogOpen(false);
  };

  const handleDelete = (id) => { if (confirm("Delete?")) { deleteNotice(id); refresh(); } };
  const toggleVisibility = (n) => { updateNotice(n.id, { showOnHomepage: !n.showOnHomepage }); refresh(); };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{notices.length} notices</p>
        <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1" /> Add</Button>
      </div>

      {notices.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center"><p className="text-muted-foreground">No notices yet.</p></div>
      ) : (
        <div className="grid gap-4">
          {notices.map((n) => (
            <div key={n.id} className="glass rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-foreground">{n.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{n.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {n.expiryDate ? `Expires: ${new Date(n.expiryDate).toLocaleDateString()}` : "No expiry"}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${n.showOnHomepage ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                    {n.showOnHomepage ? "Visible" : "Hidden"}
                  </span>
                  <button onClick={() => toggleVisibility(n)}>{n.showOnHomepage ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}</button>
                  <button onClick={() => openEdit(n)}><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary" /></button>
                  <button onClick={() => handleDelete(n.id)}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div><Label>Expiry Date</Label><Input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.showOnHomepage} onChange={(e) => setForm({ ...form, showOnHomepage: e.target.checked })} className="rounded" /> Show on homepage</label>
        <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Create"}</Button>
      </div>
    </div>
  );
};

export default NoticesAdmin;