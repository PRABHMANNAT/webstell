import { useId, type CSSProperties, type SVGProps } from 'react';
import { cn } from '@/lib/utils';
import './animated-grid-pattern.css';

type AnimatedGridPatternProps = SVGProps<SVGSVGElement> & {
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
};

const squarePosition = (index: number) => ({
  x: (index * 37 + 11) % 96,
  y: (index * 53 + 17) % 96,
});

export function AnimatedGridPattern({
  className,
  numSquares = 30,
  maxOpacity = 0.1,
  duration = 3,
  repeatDelay = 1,
  ...props
}: AnimatedGridPatternProps) {
  const patternId = useId().replace(/:/g, '');
  const animationDuration = duration + repeatDelay;

  return (
    <svg
      aria-hidden="true"
      className={cn('animated-grid-pattern', className)}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      {...props}
    >
      <defs>
        <pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#${patternId})`} />
      {Array.from({ length: numSquares }, (_, index) => {
        const position = squarePosition(index);

        return (
          <rect
            className="animated-grid-pattern-square"
            height="7"
            key={index}
            style={
              {
                '--grid-delay': `${(index % 10) * -0.42}s`,
                '--grid-duration': `${animationDuration}s`,
                '--grid-max-opacity': maxOpacity,
              } as CSSProperties
            }
            width="7"
            x={position.x}
            y={position.y}
          />
        );
      })}
    </svg>
  );
}
