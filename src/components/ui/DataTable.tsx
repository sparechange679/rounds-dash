import type {ReactNode} from 'react'
import {cn} from '@/lib/cn.ts'
import {Icon} from "@/components/icons/Icon.tsx";

export function DataTable({caption, className, children}: { caption: string; className?: string; children: ReactNode }) {
    return (
        <div className="overflow-x-auto">
            <table className={cn('clinical-table', className)}>
                <caption className="sr-only">{caption}</caption>
                {children}
            </table>
        </div>
    )
}

export type SortDir = 'none' | 'ascending' | 'descending'

type SortProps = { label: string; sort: SortDir; onSort: () => void; className?: string }

export function SortHeader({label, sort, onSort, className}: SortProps) {
    const active = sort !== 'none'
    return (
        <th scope="col" aria-sort={sort} className={className}>
            <button type="button" onClick={onSort}
                    className={cn('inline-flex items-center gap-[5px] uppercase tracking-[inherit] hover:text-ink', active && 'text-ink')}>
                {label}
                <Icon name="sort" className={cn('size-[13px]', active ? 'text-navy' : 'opacity-45')}/>
            </button>
        </th>
    )
}

type PagerProps = { page: number; pages: number; onChange: (page: number) => void }

export function Pager({page, pages, onChange}: PagerProps) {
    if (pages < 2) return null
    const btn = 'inline-flex h-[34px] min-w-[34px] items-center justify-center rounded-md border border-line bg-surface px-2.5 font-mono text-[13px] font-medium text-text hover:bg-surface-3 hover:text-ink disabled:pointer-events-none disabled:opacity-45'
    return (
        <nav aria-label="Pagination" className="flex flex-wrap gap-1">
            <button type="button" className={btn} aria-label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)}>
                <Icon name="chevronLeft" className="size-4"/>
            </button>
            {Array.from({length: pages}, (_, i) => i + 1).map((p) => (
                <button key={p} type="button" aria-label={`Page ${p}`} aria-current={p === page ? 'page' : undefined}
                        className={cn(btn, p === page && 'border-primary bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary')}
                        onClick={() => onChange(p)}>
                    {p}
                </button>
            ))}
            <button type="button" className={btn} aria-label="Next page" disabled={page === pages} onClick={() => onChange(page + 1)}>
                <Icon name="chevronRight" className="size-4"/>
            </button>
        </nav>
    )
}