import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Card = forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("bg-card border border-border rounded-2xl overflow-hidden", className)}
      {...props}
    />
  );
});

Card.displayName = "Card";

export { Card };