import type {ReactNode} from 'react'
import {cn} from '@/lib/cn.ts'

const pills = {
    consult: {label: 'In consult', cls: 'bg-navy-card text-white before:bg-mint'},
    arrived: {label: 'Arrived', cls: 'bg-tint-teal text-teal'},
    booked: {label: 'Booked', cls: 'bg-tint-sky text-sky-ink'},
    seen: {label: 'Seen', cls: 'bg-surface-3 text-muted'},
    noshow: {label: 'No-show', cls: 'bg-tint-coral text-coral-ink'},
    active: {label: 'Active', cls: 'bg-tint-teal text-teal'},
    given: {label: 'Given', cls: 'bg-surface-3 text-muted'},
    held: {label: 'Held', cls: 'bg-tint-amber text-amber-ink'},
    prn: {label: 'As needed', cls: 'bg-tint-sky text-sky-ink'},
}

export type PillTone = keyof typeof pills

export function Pill({tone, children}: { tone: PillTone; children?: ReactNode }) {
    const p = pills[tone]
    return (
        <span className={cn(
            "inline-flex items-center gap-1.5 whitespace-nowrap rounded px-2 py-0.5 text-xs font-semibold",
            "before:size-1.5 before:rounded-full before:bg-current before:content-['']",
            p.cls,
        )}>
      {children ?? p.label}
    </span>
    )
}