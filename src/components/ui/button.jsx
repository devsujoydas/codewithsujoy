import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Button = forwardRef(function Button(
  { className, variant = "default", size = "default", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
        variant === "default" &&
          "bg-primary text-primary-foreground hover:opacity-90 glow-primary",
        variant === "outline" &&
          "border border-border text-foreground hover:bg-muted",
        variant === "ghost" &&
          "bg-transparent hover:bg-muted text-foreground",
        variant === "accent" &&
          "bg-accent text-accent-foreground hover:opacity-90",
        size === "default" && "px-6 py-3 text-sm",
        size === "sm" && "px-4 py-2 text-xs",
        size === "lg" && "px-8 py-4 text-base",
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };