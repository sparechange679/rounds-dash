import type {ReactNode} from 'react'
import {cn} from '@/lib/cn.ts'

const marker = "before:size-2 before:flex-none before:bg-current before:content-['']"

const chips = {
    critical: {label: 'Critical', cls: 'bg-tint-coral text-coral-ink', shape: 'before:[clip-path:polygon(50%_0,100%_100%,0_100%)]'},
    observation: {label: 'Observation', cls: 'bg-tint-amber text-amber-ink', shape: 'before:[clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]'},
    stable: {label: 'Stable', cls: 'bg-tint-teal text-teal', shape: 'before:rounded-full'},
    postop: {label: 'Post-op', cls: 'bg-tint-sky text-sky-ink', shape: 'before:rounded-[1px]'},
    ready: {label: 'Discharge ready', cls: 'bg-transparent text-teal ring-1 ring-inset ring-teal-line', shape: 'before:rounded-full before:border-2 before:border-current before:bg-transparent'},
    new: {label: 'New', cls: 'bg-teal-500 text-white', shape: 'before:hidden'},
}

export type ChipKind = keyof typeof chips

export function Chip({kind, children}: { kind: ChipKind; children?: ReactNode }) {
    const c = chips[kind]
    return (
        <span className={cn('inline-flex h-[22px] items-center gap-1.5 whitespace-nowrap rounded px-2 text-xs font-semibold', marker, c.cls, c.shape)}>
      {children ?? c.label}
    </span>
    )
}

export function Tag({tone, children}: { tone?: 'amber'; children: ReactNode }) {
    return (
        <span className={cn('inline-flex h-[22px] items-center whitespace-nowrap rounded border px-2 text-xs font-medium',
            tone === 'amber' ? 'border-transparent bg-tint-amber text-amber-ink' : 'border-line-2 text-text')}>
      {children}
    </span>
    )
}

/** NEWS2 score badge. 0-4 low, 5-6 medium, 7+ high. */
export function News({score}: { score: number }) {
    const tone = score >= 7 ? 'bg-coral text-white' : score >= 5 ? 'bg-tint-amber text-amber-ink' : 'bg-surface-3 text-ink'
    return (
        <span title="NEWS2 score" className={cn('inline-grid h-[22px] min-w-[26px] place-items-center rounded px-1.5 font-mono text-xs font-semibold', tone)}>
      {score}
    </span>
    )
}