import SectionWrapper from "../layout/SectionWrapper";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import blogsData from "../../data/blog";

const BlogSection = () => {
  return (
    <SectionWrapper id="blog" aria-labelledby="blog-heading">
      <div className="text-center mb-16">
        <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          My Blog
        </p>
        <h2 id="blog-heading" className="reveal font-display text-3xl md:text-4xl font-bold text-foreground">
          Latest <span className="text-primary-gradient">Articles</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {blogsData.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.id}`}
            className="reveal glass rounded-2xl overflow-hidden card-hover group relative block"
          >
            <div className="aspect-video relative overflow-hidden bg-card">
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} aria-hidden="true" />
                  {blog.date}
                </span>
                <span>{blog.readTime}</span>
              </div>
              <h3 className="font-display font-bold text-base mb-2 text-foreground group-hover:text-indigo-400 transition-colors duration-300">
                {blog.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm text-indigo-400 font-medium mt-4 group-hover:gap-2 transition-all duration-300">
                Read More <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default BlogSection;
