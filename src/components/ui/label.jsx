import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Label = forwardRef(function Label({ className, ...props }, ref) {
  return (
    <label
      ref={ref}
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  );
});

Label.displayName = "Label";

export { Label };