import { useState } from "react";
import { getSettings, saveSettings } from "../../utils/adminStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Save } from "lucide-react";

const SettingsAdmin = () => {
  const [settings, setSettings] = useState(getSettings);

  const handleSave = () => {
    saveSettings(settings);
    alert("Settings saved!");
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-foreground">General</h3>
        <div><Label>Website Title</Label><Input value={settings.websiteTitle} onChange={(e) => setSettings({ ...settings, websiteTitle: e.target.value })} /></div>
        <div><Label>Logo URL</Label><Input value={settings.logo} onChange={(e) => setSettings({ ...settings, logo: e.target.value })} /></div>
        <div><Label>Favicon URL</Label><Input value={settings.favicon} onChange={(e) => setSettings({ ...settings, favicon: e.target.value })} /></div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display font-semibold text-foreground">Social Links</h3>
        {Object.keys(settings.socialLinks).map((key) => (
          <div key={key}>
            <Label className="capitalize">{key}</Label>
            <Input value={settings.socialLinks[key]} onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, [key]: e.target.value } })} />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-display font-semibold text-foreground">Contact Info</h3>
        <div><Label>Email</Label><Input value={settings.contactInfo.email} onChange={(e) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, email: e.target.value } })} /></div>
        <div><Label>Phone</Label><Input value={settings.contactInfo.phone} onChange={(e) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, phone: e.target.value } })} /></div>
        <div><Label>Address</Label><Input value={settings.contactInfo.address} onChange={(e) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, address: e.target.value } })} /></div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display font-semibold text-foreground">SEO</h3>
        <div><Label>Meta Title</Label><Input value={settings.seoTitle} onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })} /></div>
        <div><Label>Meta Description</Label><Input value={settings.seoDescription} onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })} /></div>
      </div>

      <Button onClick={handleSave} className="w-full"><Save className="h-4 w-4 mr-2" /> Save Settings</Button>
    </div>
  );
};

export default SettingsAdmin;