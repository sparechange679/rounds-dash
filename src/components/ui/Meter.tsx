import {cn} from '@/lib/cn.ts'

const fills = {navy: 'bg-chart-1', teal: 'bg-teal-500', coral: 'bg-coral', amber: 'bg-amber'}

type Props = { value: number; target?: number; tone?: keyof typeof fills; label: string; className?: string }

/** value and target are percentages (0-100). `label` is read by screen readers. */
export function Meter({value, target, tone = 'navy', label, className}: Props) {
    return (
        <div role="img" aria-label={label} className={cn('relative h-1.5 rounded-[3px] bg-surface-3', className)}>
            <span className={cn('block h-full rounded-[3px]', fills[tone])} style={{width: `${Math.min(100, value)}%`}}/>
            {target !== undefined && (
                <i className="absolute -bottom-[3px] -top-[3px] -ml-px w-0.5 rounded-[1px] bg-ink" style={{left: `${target}%`}}/>
            )}
        </div>
    )
}