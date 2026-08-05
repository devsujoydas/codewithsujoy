import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, FileText, MessageSquare, Star, Wrench,
  User, Bell, Settings, LogOut, Menu, Sun, Moon, ChevronLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import { isAuthenticated, logout, getAuthUser } from "../../utils/adminAuth";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Projects", icon: FolderKanban, path: "/admin/projects" },
  { label: "Blogs", icon: FileText, path: "/admin/blogs" },
  { label: "Messages", icon: MessageSquare, path: "/admin/messages" },
  { label: "Testimonials", icon: Star, path: "/admin/testimonials" },
  { label: "Skills", icon: Wrench, path: "/admin/skills" },
  { label: "About", icon: User, path: "/admin/about" },
  { label: "Notices", icon: Bell, path: "/admin/notices" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const user = getAuthUser();

  if (!isAuthenticated()) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 bg-card border-r border-border flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && <span className="font-display font-bold text-lg text-foreground">Admin</span>}
          <button onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }} className="text-muted-foreground hover:text-foreground hidden lg:block">
            <ChevronLeft className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <button onClick={toggleTheme} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
            {dark ? <Sun className="h-5 w-5 shrink-0" /> : <Moon className="h-5 w-5 shrink-0" />}
            {!collapsed && <span>{dark ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10">
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-card/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-muted-foreground">
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-display font-semibold text-foreground">
              {navItems.find(i => i.path === location.pathname)?.label || "Admin"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">← View Site</Link>
            {user && !collapsed && (
              <span className="text-xs text-muted-foreground hidden md:block">{user.email}</span>
            )}
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;