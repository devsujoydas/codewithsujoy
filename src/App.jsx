import {
  createContext,
  useState,
  useEffect,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroAnimation from "./components/layout/IntroAnimation";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import Home from "./pages/Home"; // Normal import
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const BlogDetailsPage = lazy(() => import("./pages/BlogDetailsPage"));
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProjectsAdmin = lazy(() => import("./pages/admin/ProjectsAdmin"));
const BlogsAdmin = lazy(() => import("./pages/admin/BlogsAdmin"));
const MessagesAdmin = lazy(() => import("./pages/admin/MessagesAdmin"));
const TestimonialsAdmin = lazy(() => import("./pages/admin/TestimonialsAdmin"));
const SkillsAdmin = lazy(() => import("./pages/admin/SkillsAdmin"));
const AboutAdmin = lazy(() => import("./pages/admin/AboutAdmin"));
const NoticesAdmin = lazy(() => import("./pages/admin/NoticesAdmin"));
const SettingsAdmin = lazy(() => import("./pages/admin/SettingsAdmin"));

const App = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const handleIntroFinish = useCallback(() => setIntroFinished(true), []);

  return (
    <ThemeProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        {!introFinished && <IntroAnimation onFinish={handleIntroFinish} />}
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetailsPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="blogs" element={<BlogsAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="about" element={<AboutAdmin />} />
              <Route path="notices" element={<NoticesAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
