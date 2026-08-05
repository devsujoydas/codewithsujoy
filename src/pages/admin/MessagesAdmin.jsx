import { useState } from "react";
import { getMessages, toggleMessageRead, deleteMessage } from "../../utils/adminStore";
import { Input } from "../../components/ui/input";
import { Search, Trash2, Mail, MailOpen } from "lucide-react";

const MessagesAdmin = () => {
  const [messages, setMessages] = useState(getMessages);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const refresh = () => setMessages(getMessages());

  const filtered = messages
    .filter((m) => filter === "all" || (filter === "unread" ? !m.read : m.read))
    .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.message.toLowerCase().includes(search.toLowerCase()));

  const handleToggleRead = (id) => { toggleMessageRead(id); refresh(); };
  const handleDelete = (id) => { if (confirm("Delete this message?")) { deleteMessage(id); refresh(); } };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {(["all", "unread", "read"]).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {f === "all" ? `All (${messages.length})` : f === "unread" ? `Unread (${unreadCount})` : `Read (${messages.length - unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center"><p className="text-muted-foreground">No messages found.</p></div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((m) => (
            <div key={m.id} className={`glass rounded-xl p-4 ${!m.read ? "border-l-4 border-l-primary" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{m.name}</h4>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{m.email}{m.phone ? ` · ${m.phone}` : ""}</p>
                  <p className="text-sm text-foreground/80 mt-2">{m.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleToggleRead(m.id)} title={m.read ? "Mark unread" : "Mark read"}>
                    {m.read ? <Mail className="h-4 w-4 text-muted-foreground hover:text-primary" /> : <MailOpen className="h-4 w-4 text-primary hover:text-muted-foreground" />}
                  </button>
                  <button onClick={() => handleDelete(m.id)}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesAdmin;