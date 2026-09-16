"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import "./background-boxes.css";

/**
 * A lightweight, dependency-free version of the interactive boxes background.
 *
 * The original implementation renders 15,000 animated DOM nodes. That is an
 * unnecessarily expensive background on a marketing page, especially on
 * mobile, so this keeps the same visual language with a deliberately bounded
 * grid and CSS-powered hover colour transitions.
 */
const BOX_ROWS = 18;
const BOX_COLUMNS = 26;
const BOX_COUNT = BOX_ROWS * BOX_COLUMNS;
const boxColors = [
  "#93c5fd",
  "#f9a8d4",
  "#86efac",
  "#fde047",
  "#fca5a5",
  "#d8b4fe",
  "#a5b4fc",
  "#c4b5fd",
];

const boxCells = Array.from({ length: BOX_COUNT }, (_, index) => index);

export type BoxesProps = React.HTMLAttributes<HTMLDivElement>;

export const BoxesCore = React.forwardRef<HTMLDivElement, BoxesProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "background-boxes",
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${BOX_COLUMNS}, 4rem)`,
        gridTemplateRows: `repeat(${BOX_ROWS}, 2rem)`,
      }}
      {...rest}
    >
      {boxCells.map((index) => (
        <span
          key={index}
          className="background-boxes-cell"
          style={
            {
              "--box-color": boxColors[index % boxColors.length],
            } as React.CSSProperties
          }
        >
          {index % 2 === 0 && Math.floor(index / BOX_COLUMNS) % 2 === 0 ? (
            <svg
              aria-hidden="true"
              className="background-boxes-plus"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 6v12m6-6H6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          ) : null}
        </span>
      ))}
    </div>
  ),
);

BoxesCore.displayName = "BoxesCore";

export const Boxes = React.memo(BoxesCore);
Boxes.displayName = "Boxes";
