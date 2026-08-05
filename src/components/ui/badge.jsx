import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Badge = forwardRef(function Badge({ className, variant = "default", ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-primary/10 text-primary-foreground",
        variant === "secondary" && "bg-secondary/10 text-secondary-foreground",
        variant === "accent" && "bg-accent/10 text-accent-foreground",
        variant === "muted" && "bg-muted text-muted-foreground",
        variant === "destructive" && "bg-destructive/10 text-destructive-foreground",
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export { Badge };