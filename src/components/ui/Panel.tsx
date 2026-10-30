import type {ComponentProps, ReactNode} from 'react'
import {cn} from '@/lib/cn.ts'

export function Panel({className, ...rest}: ComponentProps<'section'>) {
    return <section className={cn('flex min-w-0 flex-col rounded-lg border border-line bg-surface shadow-1', className)} {...rest} />
}

type HeadProps = { id?: string; title: ReactNode; subtitle?: ReactNode; actions?: ReactNode; stack?: boolean }

export function PanelHead({id, title, subtitle, actions}: HeadProps) {
    return (
        <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2.5 border-b border-line px-[18px] py-3.5 max-sm:px-4">
            <div className="min-w-0">
                <h2 id={id} className="m-0 flex items-center gap-2 text-[12.5px] font-semibold uppercase leading-normal tracking-[.07em] text-ink">
                    {title}
                </h2>
                {subtitle && <p className="mt-[3px] max-w-[64ch] text-[13px] text-muted">{subtitle}</p>}
            </div>
            {actions}
        </header>
    )
}

/** Small mono text for the right side of a PanelHead, e.g. "13 wards · 09:42". */
export function PanelMeta({children}: { children: ReactNode }) {
    return <span className="inline-flex items-center gap-[7px] whitespace-nowrap pt-0.5 font-mono text-[11.5px] font-medium text-muted">{children}</span>
}

export function PanelBody({className, ...rest}: ComponentProps<'div'>) {
    return <div className={cn('flex-1 p-[18px] max-sm:px-4', className)} {...rest} />
}

export function PanelFoot({className, ...rest}: ComponentProps<'div'>) {
    return <div className={cn('flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 border-t border-line px-[18px] py-3', className)} {...rest} />
}

/** Small count pill used in panel titles, e.g. "Critical alerts 5". */
export function CountBadge({tone, children}: { tone?: 'coral' | 'amber'; children: ReactNode }) {
    return (
        <span className={cn('inline-grid h-5 min-w-5 place-items-center rounded-[10px] px-1.5 font-mono text-[11px] font-semibold leading-none tracking-normal',
            tone === 'coral' ? 'bg-coral text-white' : tone === 'amber' ? 'bg-amber text-[#3b2600]' : 'bg-surface-3 text-ink')}>
      {children}
    </span>
    )
}

export function Subhead({children, className}: { children: ReactNode; className?: string }) {
    return <p className={cn('mb-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[.1em] text-muted', className)}>{children}</p>
}