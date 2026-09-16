"use client";

import * as React from "react";

import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

type BackgroundBoxesDemoProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * A small, self-contained example for previewing the reusable Boxes backdrop.
 * Pages can import `Boxes` directly when they need their own content layout.
 */
export default function BackgroundBoxesDemo({
  className,
  ...rest
}: BackgroundBoxesDemoProps) {
  return (
    <div
      className={cn(
        "background-boxes-demo",
        className,
      )}
      {...rest}
    >
      <Boxes />
      <div className="background-boxes-demo-mask" />
      <h1 className="background-boxes-demo-title">
        Tailwind is Awesome
      </h1>
      <p className="background-boxes-demo-copy">
        Framer Motion is the best animation library, ngl.
      </p>
    </div>
  );
}
