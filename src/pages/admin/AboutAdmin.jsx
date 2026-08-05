import { useState } from "react";
import { getAbout, saveAbout } from "../../utils/adminStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Trash2, Save } from "lucide-react";

const AboutAdmin = () => {
  const [about, setAbout] = useState(getAbout);

  const handleSave = () => {
    saveAbout(about);
    alert("About section saved!");
  };

  const addExperience = () => {
    setAbout({ ...about, experience: [...about.experience, { title: "", company: "", period: "", description: "" }] });
  };

  const updateExperience = (i, field, value) => {
    const exp = [...about.experience];
    exp[i] = { ...exp[i], [field]: value };
    setAbout({ ...about, experience: exp });
  };

  const removeExperience = (i) => {
    setAbout({ ...about, experience: about.experience.filter((_, j) => j !== i) });
  };

  const addEducation = () => {
    setAbout({ ...about, education: [...about.education, { degree: "", school: "", period: "" }] });
  };

  const updateEducation = (i, field, value) => {
    const edu = [...about.education];
    edu[i] = { ...edu[i], [field]: value };
    setAbout({ ...about, education: edu });
  };

  const removeEducation = (i) => {
    setAbout({ ...about, education: about.education.filter((_, j) => j !== i) });
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <div><Label>Bio / Description</Label><Textarea value={about.bio} onChange={(e) => setAbout({ ...about, bio: e.target.value })} rows={4} /></div>
        <div><Label>Profile Image URL</Label><Input value={about.profileImage} onChange={(e) => setAbout({ ...about, profileImage: e.target.value })} /></div>
        <div><Label>Resume URL (PDF)</Label><Input value={about.resumeUrl} onChange={(e) => setAbout({ ...about, resumeUrl: e.target.value })} /></div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-foreground">Experience</h3>
          <Button size="sm" variant="outline" onClick={addExperience}><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </div>
        <div className="space-y-4">
          {about.experience.map((exp, i) => (
            <div key={i} className="glass rounded-xl p-4 space-y-3">
              <div className="flex justify-between"><Label>Experience #{i + 1}</Label><button onClick={() => removeExperience(i)}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button></div>
              <Input placeholder="Title" value={exp.title} onChange={(e) => updateExperience(i, "title", e.target.value)} />
              <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} />
              <Input placeholder="Period (e.g. 2023 - Present)" value={exp.period} onChange={(e) => updateExperience(i, "period", e.target.value)} />
              <Textarea placeholder="Description" value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} rows={2} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-foreground">Education</h3>
          <Button size="sm" variant="outline" onClick={addEducation}><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </div>
        <div className="space-y-4">
          {about.education.map((edu, i) => (
            <div key={i} className="glass rounded-xl p-4 space-y-3">
              <div className="flex justify-between"><Label>Education #{i + 1}</Label><button onClick={() => removeEducation(i)}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button></div>
              <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} />
              <Input placeholder="School" value={edu.school} onChange={(e) => updateEducation(i, "school", e.target.value)} />
              <Input placeholder="Period" value={edu.period} onChange={(e) => updateEducation(i, "period", e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="w-full"><Save className="h-4 w-4 mr-2" /> Save About Section</Button>
    </div>
  );
};

export default AboutAdmin;