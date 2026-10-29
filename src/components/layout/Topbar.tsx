import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../icons/Icon.tsx'
import { IconButton } from '../ui/IconButton.tsx'
import { NotificationsMenu } from './NotificationsMenu'
import { UserMenu } from './UserMenu'

type Props = { collapsed: boolean; onToggleCollapse: () => void; onOpenMobile: () => void }

export function Topbar({ collapsed, onToggleCollapse, onOpenMobile }: Props) {
    const navigate = useNavigate()
    const [q, setQ] = useState('')
    const searchRef = useRef<HTMLInputElement>(null)

    // "/" focuses the search box, unless you're already typing somewhere.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return
            const t = e.target as HTMLElement | null
            if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return
            e.preventDefault()
            searchRef.current?.focus()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [])

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const term = q.trim()
        navigate(term ? `/patients?q=${encodeURIComponent(term)}` : '/patients')
    }

    return (
        <header className="sticky top-0 z-[1020] flex h-[60px] items-center gap-1.5 border-b border-line bg-surface pl-2.5 pr-4 lg:gap-2.5 lg:px-6">
            <IconButton className="lg:hidden" aria-label="Open navigation" aria-controls="sidebar" onClick={onOpenMobile}>
                <Icon name="menu" />
            </IconButton>
            <IconButton
                className="hidden lg:inline-flex"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-expanded={!collapsed}
                onClick={onToggleCollapse}
            >
                <Icon name="panelLeft" />
            </IconButton>

            <form role="search" onSubmit={onSubmit} className="relative flex max-w-[440px] flex-1 items-center lg:ml-1">
                <label htmlFor="global-search" className="sr-only">Search patients by name, MRN or bed</label>
                <Icon name="search" className="pointer-events-none absolute left-3 text-muted" />
                <input
                    id="global-search"
                    ref={searchRef}
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search name, MRN or bed"
                    autoComplete="off"
                    className="h-[38px] w-full rounded border border-line bg-surface-2 px-[38px] text-sm text-ink placeholder:text-muted focus:border-focus focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-focus/25"
                />
                <kbd aria-hidden="true" className="absolute right-2 hidden rounded border border-b-2 border-line-2 bg-surface px-1.5 py-1 font-mono text-[11px] font-medium leading-none text-muted md:block">
                    /
                </kbd>
            </form>

            <div className="ml-auto flex items-center gap-1">
        <span className="mr-1.5 hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-2.5 py-[5px] text-[12.5px] text-muted xl:inline-flex">
          <Icon name="building" className="size-[15px]" /> Main campus
        </span>
                <NotificationsMenu />
                <UserMenu />
            </div>
        </header>
    )
}