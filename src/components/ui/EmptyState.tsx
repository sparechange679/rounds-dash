import type {ReactNode} from 'react'
import {Icon, type IconName} from "@/components/icons/Icon.tsx";

export function EmptyState({icon = 'search', children}: { icon?: IconName; children: ReactNode }) {
    return (
        <div className="px-5 py-11 text-center text-sm text-muted">
            <Icon name={icon} className="mx-auto mb-2.5 size-8 text-muted-2"/>
            <p>{children}</p>
        </div>
    )
}