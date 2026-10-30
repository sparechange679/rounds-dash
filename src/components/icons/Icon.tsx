import type {ReactNode} from 'react'
import {cn} from "@/lib/cn.ts";

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
    plus: <path d="M12 5v14M5 12h14"/>,
    check: <path d="M20 6 9 17l-5-5"/>,
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6"/>,
    chevronLeft: <path d="m15 18-6-6 6-6"/>,
    chevronRight: <path d="m9 18 6-6-6-6"/>,
    sort: <path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>,
    trendUp: (<>
        <path d="m22 7-8.5 8.5-5-5L2 17"/>
        <path d="M16 7h6v6"/>
    </>),
    trendDown: (<>
        <path d="m22 17-8.5-8.5-5 5L2 7"/>
        <path d="M16 17h6v-6"/>
    </>),
    download: (<>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <path d="m7 10 5 5 5-5M12 15V3"/>
    </>),
    print: (<>
        <path d="M6 9V2h12v7"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
    </>),
    reset: (<>
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
        <path d="M8 16H3v5"/>
    </>),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>,
    lock: (<>
        <rect x="4" y="11" width="16" height="10" rx="2"/>
        <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </>),
    eye: (<>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
        <circle cx="12" cy="12" r="3"/>
    </>),
    phone: <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>,
    droplet: <path
        d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
    pill: (<>
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
        <path d="m8.5 8.5 7 7"/>
    </>),
    flask: (<>
        <path d="M9 3h6M10 3v6.5L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9.5V3"/>
        <path d="M7 15h10"/>
    </>),
    fileText: (<>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
    </>),
    transfer: <path d="M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/>,
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