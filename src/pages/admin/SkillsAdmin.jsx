import { useState } from "react";
import { getSkills, addSkill, updateSkill, deleteSkill } from "../../utils/adminStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";

const emptySkill = { name: "", icon: "", level: 80, category: "Frontend" };

const SkillsAdmin = () => {
  const [skills, setSkills] = useState(getSkills);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySkill);

  const refresh = () => setSkills(getSkills());

  const openAdd = () => { setForm(emptySkill); setEditing(null); setDialogOpen(true); };
  const openEdit = (s) => {
    setForm({ name: s.name, icon: s.icon, level: s.level, category: s.category });
    setEditing(s); setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) { updateSkill(editing.id, form); } else { addSkill(form); }
    refresh(); setDialogOpen(false);
  };

  const handleDelete = (id) => { if (confirm("Delete?")) { deleteSkill(id); refresh(); } };

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{skills.length} skills</p>
        <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1" /> Add</Button>
      </div>

      {skills.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center"><p className="text-muted-foreground">No skills added yet.</p></div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="font-display font-semibold text-foreground mb-3">{cat}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {skills.filter((s) => s.category === cat).map((s) => (
                  <div key={s.id} className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {s.icon && <span className="text-lg">{s.icon}</span>}
                        <span className="font-medium text-foreground text-sm">{s.name}</span>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(s)}><Pencil className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" /></button>
                        <button onClick={() => handleDelete(s.id)}><Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" /></button>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${s.level}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{s.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><Label>Icon (emoji or text)</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="⚛️" /></div>
        <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Frontend, Backend, Tools" /></div>
        <div>
          <Label>Level ({form.level}%)</Label>
          <input type="range" min={0} max={100} value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} className="w-full mt-1" />
        </div>
        <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Create"}</Button>
      </div>
    </div>
  );
};

export default SkillsAdmin;