import {useState} from 'react'
import {Link} from 'react-router-dom'
import {Icon} from '../icons/Icon.tsx'
import {IconButton} from '../ui/IconButton.tsx'
import {notifications} from '../../data/notifications'
import {useDismiss} from '../../hooks/useDismiss'
import {cn} from '../../lib/cn'

const tones = {
    coral: 'bg-tint-coral text-coral-ink',
    amber: 'bg-tint-amber text-amber-ink',
    teal: 'bg-tint-teal text-teal',
}

export function NotificationsMenu() {
    const [open, setOpen] = useState(false)
    const [unread, setUnread] = useState(() => new Set(notifications.map((n) => n.id)))
    const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false))

    return (
        <div className="relative" ref={ref}>
            <IconButton
                aria-label={`Notifications, ${unread.size ? `${unread.size} unread` : 'none unread'}`}
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((o) => !o)}
            >
                <Icon name="bell"/>
                {unread.size > 0 && (
                    <span
                        className="absolute right-px top-[3px] h-[18px] min-w-[18px] rounded-full bg-coral px-1 text-center font-mono text-[10px] font-semibold leading-[18px] text-white ring-2 ring-surface">
            {unread.size}
          </span>
                )}
            </IconButton>

            {open && (
                <div
                    className="absolute right-0 top-full z-[1050] mt-1 w-[360px] max-w-[calc(100vw-24px)] rounded-lg border border-line bg-surface shadow-3">
                    <div className="flex items-center justify-between border-b border-line px-3.5 py-3">
                        <strong className="text-sm text-ink">Notifications</strong>
                        <button
                            type="button"
                            disabled={unread.size === 0}
                            onClick={() => setUnread(new Set())}
                            className="text-[13px] font-medium text-link hover:underline disabled:text-muted-2 disabled:no-underline"
                        >
                            Mark all read
                        </button>
                    </div>
                    <ul className="p-1.5">
                        {notifications.map((n) => (
                            <li key={n.id}>
                                <Link
                                    to={n.to}
                                    onClick={() => setOpen(false)}
                                    className="relative grid grid-cols-[32px_1fr_auto] gap-2.5 rounded p-2.5 text-text hover:bg-surface-2 hover:no-underline"
                                >
                  <span className={cn('grid size-8 place-items-center rounded', tones[n.tone])}>
                    <Icon name={n.icon} className="size-4"/>
                  </span>
                                    <span className="min-w-0">
                    <strong className="block text-[13px] font-semibold leading-snug text-ink">{n.title}</strong>
                    <span className="text-xs text-muted">{n.detail}</span>
                  </span>
                                    <time className="whitespace-nowrap font-mono text-[11px] text-muted">{n.time}</time>
                                    {unread.has(n.id) &&
                                        <span className="absolute bottom-3.5 right-3 size-[7px] rounded-full bg-sky"/>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}