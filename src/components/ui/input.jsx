import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };