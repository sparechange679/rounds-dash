import type {ReactNode} from 'react'
import {cn} from "../../lib/cn.ts";

const paths = {
    overview: (<>
        <rect x="3" y="3" width="7" height="9" rx="1"/>
        <rect x="14" y="3" width="7" height="5" rx="1"/>
        <rect x="14" y="12" width="7" height="9" rx="1"/>
        <rect x="3" y="16" width="7" height="5" rx="1"/>
    </>),
    patients: (<>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </>),
    record: (<>
        <rect x="8" y="2" width="8" height="4" rx="1"/>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>
    </>),
    calendar: (<>
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
    </>),
    bed: (<>
        <path d="M2 4v16"/>
        <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
        <path d="M2 17h20"/>
        <path d="M6 8v9"/>
    </>),
    staff: (<>
        <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/>
        <path d="M8 15v1a6 6 0 0 0 12 0v-3"/>
        <circle cx="20" cy="11" r="2"/>
    </>),
    logout: (<>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <path d="m16 17 5-5-5-5M21 12H9"/>
    </>),
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
    close: <path d="M18 6 6 18M6 6l12 12"/>,
    search: (<>
        <circle cx="11" cy="11" r="7"/>
        <path d="m21 21-4.3-4.3"/>
    </>),
    building: (<>
        <rect x="4" y="2" width="16" height="20" rx="1"/>
        <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>
    </>),
    bell: (<>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </>),
    chevronDown: <path d="m6 9 6 6 6-6"/>,
    panelLeft: (<>
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 3v18"/>
        <path d="m16 15-3-3 3-3"/>
    </>),
    alert: (<>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <path d="M12 9v4M12 17h.01"/>
    </>),
    clock: (<>
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 2"/>
    </>),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof paths

type Props = { name: IconName; className?: string }

export function Icon({name, className}: Props) {
    return (
        <svg className={cn('ic', className)} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {paths[name]}
        </svg>
    )
}