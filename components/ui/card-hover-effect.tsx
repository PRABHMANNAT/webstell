'use client';

import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from 'motion/react';

import { useId, useState } from 'react';

export const HoverEffect = ({
  items,
  className,
  itemClassName,
  hoverClassName,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    content?: React.ReactNode;
  }[];
  className?: string;
  itemClassName?: string;
  hoverClassName?: string;
}) => {
  const groupId = useId();
  const reduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <LayoutGroup id={groupId}>
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10',
          className,
        )}
      >
        {items.map((item, idx) => (
          <a
            href={item?.link}
            key={item?.link}
            className={cn(
              'relative group  block p-2 h-full w-full',
              itemClassName,
            )}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(idx)}
            onBlur={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl',
                    hoverClassName,
                  )}
                  layoutId={reduceMotion ? undefined : 'hoverBackground'}
                  initial={{ opacity: reduceMotion ? 1 : 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: reduceMotion ? 0 : 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: reduceMotion ? 0 : 0.15,
                      delay: reduceMotion ? 0 : 0.2,
                    },
                  }}
                />
              )}
            </AnimatePresence>
            {item.content ?? (
              <Card>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </Card>
            )}
          </a>
        ))}
      </div>
    </LayoutGroup>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn('text-zinc-100 font-bold tracking-wide mt-4', className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        'mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm',
        className,
      )}
    >
      {children}
    </p>
  );
};
