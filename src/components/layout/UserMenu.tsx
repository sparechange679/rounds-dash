import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../icons/Icon.tsx'
import { Avatar } from '../ui/Avatar.tsx'
import { useDismiss } from '../../hooks/useDismiss'

const items: { to: string; label: string; icon: IconName }[] = [
    { to: '/staff', label: 'My shifts', icon: 'calendar' },
    { to: '/patients', label: 'My patients', icon: 'patients' },
]

const itemClass = 'flex items-center gap-2.5 rounded-[5px] px-2.5 py-2 text-sm text-text hover:bg-surface-2 hover:text-ink hover:no-underline'

export function UserMenu() {
    const [open, setOpen] = useState(false)
    const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false))

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                aria-label="Account menu for Dr. Adaeze Okafor"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((o) => !o)}
                className="ml-1 flex items-center gap-2.5 rounded-lg p-1 text-left text-ink hover:bg-surface-3 md:py-1 md:pl-1 md:pr-2"
            >
                <Avatar initials="AO" tint="sky" />
                <span className="hidden flex-col leading-tight md:flex">
          <strong className="whitespace-nowrap text-[13px] font-semibold">Dr. A. Okafor</strong>
          <small className="text-[11.5px] text-muted">Cardiology</small>
        </span>
                <Icon name="chevronDown" className="hidden size-[15px] text-muted md:block" />
            </button>

            {open && (
                <ul className="absolute right-0 top-full z-[1050] mt-1 min-w-60 rounded-lg border border-line bg-surface p-1.5 shadow-3">
                    <li className="mb-1.5 flex flex-col gap-0.5 border-b border-line px-2.5 pb-2.5 pt-2">
                        <strong className="text-sm text-ink">Dr. Adaeze Okafor</strong>
                        <span className="text-xs text-muted">Consultant cardiologist · Bleep 4471</span>
                    </li>
                    {items.map((i) => (
                        <li key={i.to}>
                            <Link to={i.to} className={itemClass} onClick={() => setOpen(false)}>
                                <Icon name={i.icon} className="size-4 text-muted" /> {i.label}
                            </Link>
                        </li>
                    ))}
                    <li><hr className="my-1.5 border-line" /></li>
                    <li>
                        <Link to="/login" className={itemClass}>
                            <Icon name="logout" className="size-4 text-muted" /> Sign out
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}