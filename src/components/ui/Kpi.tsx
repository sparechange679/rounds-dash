import type {ReactNode} from 'react'
import {cn} from '@/lib/cn.ts'
import {Icon, type IconName} from "@/components/icons/Icon.tsx";

const iconTones = {
    navy: 'bg-tint-navy text-navy',
    teal: 'bg-tint-teal text-teal',
    coral: 'bg-tint-coral text-coral-ink',
    amber: 'bg-tint-amber text-amber-ink',
}

type Props = {
    label: string
    icon?: IconName
    tone?: keyof typeof iconTones
    value: ReactNode
    unit?: ReactNode
    alert?: boolean
    spark?: ReactNode      // a <Sparkline />, positioned top-right of the value
    children?: ReactNode   // usually a <Meter />
    footer?: ReactNode
    className?: string
}

export function Kpi({label, icon, tone = 'navy', value, unit, alert, spark, children, footer, className}: Props) {
    return (
        <article className={cn(
            'relative h-full overflow-hidden rounded-lg border border-line bg-surface px-[18px] pb-3.5 pt-4 shadow-1 max-sm:px-3.5 max-sm:pb-3 max-sm:pt-3.5',
            "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:content-['']",
            alert ? 'before:bg-coral' : 'before:bg-chart-1', className,
        )}>
            <div className="mb-3 flex items-center justify-between gap-2">
                <p className="font-mono text-[10.5px] font-semibold uppercase leading-tight tracking-[.09em] text-muted">{label}</p>
                {icon && (
                    <span className={cn('grid size-[30px] flex-none place-items-center rounded-md', iconTones[tone])}>
            <Icon name={icon} className="size-4"/>
          </span>
                )}
            </div>
            <p className={cn('mb-2.5 font-mono text-[34px] font-semibold leading-none tracking-[-.03em] max-sm:text-[28px]', alert ? 'text-coral-ink' : 'text-ink')}>
                {value}
                {unit && <span className="ml-1.5 font-sans text-[13px] font-medium tracking-normal text-muted max-sm:text-xs">{unit}</span>}
            </p>
            {children && <div className="mb-2.5">{children}</div>}
            {footer && <p className="text-[12.5px] leading-snug text-muted">{footer}</p>}
            {spark && <div className="absolute right-4 top-[50px] max-sm:hidden">{spark}</div>}
        </article>
    )
}

const deltaTones = {up: 'bg-tint-navy text-navy', bad: 'bg-tint-coral text-coral-ink', good: 'bg-tint-teal text-teal'}

export function Delta({tone = 'up', icon, children}: { tone?: keyof typeof deltaTones; icon?: IconName; children: ReactNode }) {
    return (
        <span className={cn('mr-[3px] inline-flex items-center gap-[3px] rounded px-1.5 py-px font-mono text-[11.5px] font-semibold leading-normal', deltaTones[tone])}>
      {icon && <Icon name={icon} className="size-[13px]"/>}
            {children}
    </span>
    )
}