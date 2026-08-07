const blogs = [
  {
    id: "1",
    title: "Why I Chose React Over Other Frameworks",
    slug: "why-i-chose-react-over-other-frameworks",
    excerpt:
      "My journey exploring different JavaScript frameworks and why React became my go-to choice for building modern web apps.",
    image:
      "https://images.unsplash.com/photo-1687603921109-46401b201195?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Dec 15, 2024",
    category: "React",
    readTime: "5 min read",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    author: "Sujoy Das",
    authorImage: "https://ui-avatars.com/api/?name=Sujoy+Das&background=4F79E8&color=fff&size=128",
    views: 1240,
    likes: 89,
    featured: true,
    content: `
      <p class="mb-6 text-lg leading-relaxed text-foreground/90">
        When I first started learning web development, I was overwhelmed by the sheer number of JavaScript frameworks available. Angular, Vue, Svelte, React — each promising to solve different problems with unique approaches. After spending time with several of them, React emerged as my clear favorite.
      </p>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">The Declarative Power</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        React's declarative approach fundamentally changed how I think about UI. Instead of imperatively manipulating the DOM, I describe <em>what</em> the UI should look like, and React handles the <em>how</em>. This mental model shift was profound.
      </p>
      <div class="glass rounded-2xl p-6 my-8 border-l-4 border-primary">
        <p class="text-lg italic text-foreground/90 mb-2">"React allows you to build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps."</p>
        <p class="text-sm text-muted-foreground">— React Documentation</p>
      </div>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">Component Architecture</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        The component-based architecture is what makes React truly scalable. Whether you're building a small widget or a massive enterprise application, React's component model keeps things organized and maintainable.
      </p>
      <h3 class="text-xl font-display font-bold text-foreground mt-8 mb-3">Key Benefits I've Experienced:</h3>
      <ul class="list-none space-y-3 mb-8">
        <li class="flex items-start gap-3 text-foreground/90">
          <span class="text-primary mt-1.5">&#10003;</span>
          <span><strong>Reusability:</strong> Components can be reused across projects and teams.</span>
        </li>
        <li class="flex items-start gap-3 text-foreground/90">
          <span class="text-primary mt-1.5">&#10003;</span>
          <span><strong>Ecosystem:</strong> An enormous library of tools and libraries available.</span>
        </li>
        <li class="flex items-start gap-3 text-foreground/90">
          <span class="text-primary mt-1.5">&#10003;</span>
          <span><strong>Performance:</strong> Virtual DOM and efficient re-rendering strategies.</span>
        </li>
        <li class="flex items-start gap-3 text-foreground/90">
          <span class="text-primary mt-1.5">&#10003;</span>
          <span><strong>Flexibility:</strong> Works with any backend or frontend architecture.</span>
        </li>
      </ul>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">The Learning Curve Was Worth It</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        Learning React wasn't easy. Concepts like JSX, state management, hooks, and the component lifecycle took time to master. But once I grasped these fundamentals, I found myself building applications faster and with fewer bugs than ever before.
      </p>
      <p class="mb-6 leading-relaxed text-foreground/90">
        The investment in learning React has paid dividends in my career. From building interactive dashboards to full-stack applications with Next.js, React continues to be my framework of choice.
      </p>
    `,
    relatedIds: ["2", "3"],
  },
  {
    id: "2",
    title: "Building a Full-Stack App with the MERN Stack",
    slug: "building-full-stack-app-mern-stack",
    excerpt:
      "A step-by-step guide on creating a complete web application using MongoDB, Express, React, and Node.js.",
    image: "https://i.ytimg.com/vi/aibtHnbeuio/maxresdefault.jpg",
    date: "Nov 28, 2024",
    category: "Tutorial",
    readTime: "8 min read",
    tags: ["MERN", "Node.js", "MongoDB", "Express", "Fullstack"],
    author: "Sujoy Das",
    authorImage: "https://ui-avatars.com/api/?name=Sujoy+Das&background=4F79E8&color=fff&size=128",
    views: 2100,
    likes: 156,
    featured: true,
    content: `
      <p class="mb-6 text-lg leading-relaxed text-foreground/90">
        The MERN stack — MongoDB, Express.js, React, and Node.js — is one of the most popular full-stack JavaScript combinations. In this guide, I'll walk you through building a complete web application from scratch.
      </p>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">Setting Up the Backend</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        First, let's set up our Node.js backend with Express. We'll connect to MongoDB using Mongoose and create RESTful API endpoints.
      </p>
      <div class="glass rounded-2xl p-6 my-8">
        <p class="text-sm font-mono text-muted-foreground mb-2"># Initialize project</p>
        <p class="text-sm font-mono text-foreground/90">npm init -y<br/>npm install express mongoose cors dotenv</p>
      </div>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">Designing the Database Schema</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        MongoDB's flexible document model allows us to design schemas that match our application's needs perfectly. Let's create a schema for our main entity.
      </p>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">Connecting the Frontend</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        On the frontend side, React provides a dynamic user experience. We'll use React Router for navigation and Axios for API calls.
      </p>
      <div class="glass rounded-2xl p-6 my-8">
        <p class="text-sm font-mono text-muted-foreground mb-2"># Install dependencies</p>
        <p class="text-sm font-mono text-foreground/90">npm install react-router-dom axios</p>
      </div>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">Deploying Your Application</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        Once everything works locally, it's time to deploy. I recommend using Vercel or Netlify for the frontend and MongoDB Atlas for the database.
      </p>
    `,
    relatedIds: ["1", "3"],
  },
  {
    id: "3",
    title: "Tailwind CSS Tips & Tricks for Better UIs",
    slug: "tailwind-css-tips-tricks-better-uis",
    excerpt:
      "Advanced Tailwind CSS techniques I use daily to create beautiful, responsive interfaces faster.",
    image:
      "https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fgvwedu130q4v35oigl7l.png",
    date: "Oct 10, 2024",
    category: "CSS",
    readTime: "4 min read",
    tags: ["Tailwind CSS", "UI/UX", "CSS", "Frontend"],
    author: "Sujoy Das",
    authorImage: "https://ui-avatars.com/api/?name=Sujoy+Das&background=4F79E8&color=fff&size=128",
    views: 890,
    likes: 67,
    featured: false,
    content: `
      <p class="mb-6 text-lg leading-relaxed text-foreground/90">
        Tailwind CSS has completely transformed how I approach styling. What once required hundreds of lines of custom CSS can now be achieved with a handful of utility classes. Let me share some advanced techniques that have made my development workflow much smoother.
      </p>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">Custom Utilities with @layer</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        One of Tailwind's most powerful features is the ability to create custom utilities using the @layer directive. This lets you extend Tailwind without leaving your CSS file.
      </p>
      <div class="glass rounded-2xl p-6 my-8">
        <p class="text-sm font-mono text-muted-foreground mb-2">/* Custom utility in CSS */</p>
        <p class="text-sm font-mono text-foreground/90">@layer utilities {<br/>&nbsp;&nbsp;.text-shadow {<br/>&nbsp;&nbsp;&nbsp;&nbsp;text-shadow: 0 2px 4px rgba(0,0,0,0.1);<br/>&nbsp;&nbsp;}<br/>}</p>
      </div>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">Responsive Container Queries</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        Tailwind v3.4 introduced container queries, allowing you to style elements based on their container's size rather than the viewport. This is a game-changer for component-driven design.
      </p>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">Gradient Text Effects</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        Creating beautiful gradient text is straightforward with Tailwind's background-clip utilities. I use this technique extensively in my portfolio for headings and call-to-action elements.
      </p>
      <h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">Animation Delays</h2>
      <p class="mb-6 leading-relaxed text-foreground/90">
        Staggered animations bring interfaces to life. Tailwind's arbitrary value syntax makes it easy to add animation delays for polished micro-interactions.
      </p>
    `,
    relatedIds: ["1", "2"],
  },
];

export default blogs;
