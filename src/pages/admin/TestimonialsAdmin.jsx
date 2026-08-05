import { useState } from "react";
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from "../../utils/adminStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from "lucide-react";

const emptyTestimonial = { clientName: "", image: "", feedback: "", rating: 5, approved: true };

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState(getTestimonials);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);

  const refresh = () => setTestimonials(getTestimonials());

  const openAdd = () => { setForm(emptyTestimonial); setEditing(null); setDialogOpen(true); };
  const openEdit = (t) => {
    setForm({ clientName: t.clientName, image: t.image, feedback: t.feedback, rating: t.rating, approved: t.approved });
    setEditing(t); setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.clientName.trim()) return;
    if (editing) { updateTestimonial(editing.id, form); } else { addTestimonial(form); }
    refresh(); setDialogOpen(false);
  };

  const handleDelete = (id) => { if (confirm("Delete?")) { deleteTestimonial(id); refresh(); } };
  const toggleApprove = (t) => { updateTestimonial(t.id, { approved: !t.approved }); refresh(); };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{testimonials.length} testimonials</p>
        <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1" /> Add</Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center"><p className="text-muted-foreground">No testimonials yet.</p></div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.id} className="glass rounded-xl p-5">
              <div className="flex items-start gap-3">
                {t.image && <img src={t.image} alt={t.clientName} className="w-10 h-10 rounded-full object-cover" />}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm">{t.clientName}</h4>
                  <div className="flex gap-0.5 mt-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-3 w-3 ${i < t.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />)}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.approved ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                  {t.approved ? "Approved" : "Hidden"}
                </span>
              </div>
              <p className="text-sm text-foreground/80 mt-3">"{t.feedback}"</p>
              <div className="flex gap-2 mt-3 justify-end">
                <button onClick={() => toggleApprove(t)}>{t.approved ? <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground hover:text-accent" />}</button>
                <button onClick={() => openEdit(t)}><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary" /></button>
                <button onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div><Label>Client Name</Label><Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} /></div>
        <div><Label>Image URL</Label><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
        <div><Label>Feedback</Label><Textarea value={form.feedback} onChange={(e) => setForm({ ...form, feedback: e.target.value })} /></div>
        <div><Label>Rating (1-5)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.approved} onChange={(e) => setForm({ ...form, approved: e.target.checked })} className="rounded" /> Approved</label>
        <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Create"}</Button>
      </div>
    </div>
  );
};

export default TestimonialsAdmin;