import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

function Spinner({
  className,
  'aria-label': ariaLabel = 'Loading',
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <output aria-live="polite" aria-label={ariaLabel} className="contents">
      <Loader2Icon
        data-slot="spinner"
        aria-hidden="true"
        className={cn('size-4 animate-spin', className)}
        {...props}
      />
    </output>
  );
}

export { Spinner };
