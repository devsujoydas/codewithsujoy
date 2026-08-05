import { getProjects, getBlogs, getMessages, getTestimonials, getSkills, getNotices } from "../../utils/adminStore";
import { FolderKanban, FileText, MessageSquare, Star, Wrench, Bell } from "lucide-react";

const StatCard = ({ label, count, icon: Icon, color }) => (
  <div className="glass rounded-xl p-6 card-hover">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold font-display text-foreground mt-1">{count}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { label: "Projects", count: getProjects().length, icon: FolderKanban, color: "bg-primary/10 text-primary" },
    { label: "Blogs", count: getBlogs().length, icon: FileText, color: "bg-secondary/10 text-secondary" },
    { label: "Messages", count: getMessages().length, icon: MessageSquare, color: "bg-accent/10 text-accent" },
    { label: "Testimonials", count: getTestimonials().length, icon: Star, color: "bg-yellow-500/10 text-yellow-500" },
    { label: "Skills", count: getSkills().length, icon: Wrench, color: "bg-pink-500/10 text-pink-500" },
    { label: "Notices", count: getNotices().length, icon: Bell, color: "bg-orange-500/10 text-orange-500" },
  ];

  const recentMessages = getMessages().slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Recent Messages</h3>
        {recentMessages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((m) => (
              <div key={m.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${m.read ? "bg-muted-foreground" : "bg-primary"}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{m.message}</p>
                </div>
                <span className="text-xs text-muted-foreground ml-auto shrink-0">
                  {new Date(m.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;