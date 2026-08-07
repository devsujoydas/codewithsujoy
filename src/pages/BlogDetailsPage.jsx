import { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2, Tag } from "lucide-react";
import SectionWrapper from "../components/layout/SectionWrapper";
import blogsData from "../data/blog";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = useMemo(() => blogsData.find((b) => b.id === id), [id]);

  const relatedBlogs = useMemo(
    () => (blog ? blogsData.filter((b) => blog.relatedIds?.includes(b.id)) : []),
    [blog]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary-gradient mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Blog post not found</p>
          <Link to="/" className="text-primary hover:text-primary/80 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 mix-blend-overlay" />
      </div>

      {/* Content */}
      <SectionWrapper id="blog-details" className="-mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to Blogs
          </button>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={14} />
              {blog.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={14} />
              {blog.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Eye size={14} />
              {blog.views.toLocaleString()} views
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
            {blog.title}
          </h1>

          {/* Author & Actions Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 pb-10 border-b border-border">
            <div className="flex items-center gap-4">
              {blog.authorImage && (
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                />
              )}
              <div>
                <p className="font-semibold text-foreground">{blog.author}</p>
                <p className="text-sm text-muted-foreground">Published on {blog.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Heart size={16} />
                {blog.likes}
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>

          {/* Blog Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <div
              className="blog-content [&_p]:mb-6 [&_p]:leading-relaxed [&_p]:text-foreground/90 [&_p]:text-lg [&_h2]:text-3xl [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:space-y-3 [&_li]:text-foreground/90 [&_li]:leading-relaxed [&_strong]:text-foreground [&_em]:text-foreground/80 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-foreground/80"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-16 pb-10 border-b border-border">
            <Tag size={16} className="text-muted-foreground" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="mb-16">
              <h3 className="font-display text-2xl font-bold text-foreground mb-8">
                Related <span className="text-primary-gradient">Articles</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedBlogs.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.id}`}
                    className="glass rounded-2xl overflow-hidden card-hover group block"
                  >
                    <div className="aspect-video relative overflow-hidden bg-card">
                      {related.image && (
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium text-primary mb-2 block">
                        {related.category}
                      </span>
                      <h4 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                        {related.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {related.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {related.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA / Newsletter */}
          <div className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Enjoyed this article?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                I write about web development, React, and modern frontend practices. Subscribe to get notified when I publish new articles.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-auto sm:min-w-[300px] px-5 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-8 py-3 rounded-full bg-primary-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default BlogDetailsPage;
