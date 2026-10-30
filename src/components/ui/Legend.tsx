import type {ReactNode} from 'react'
import {cn} from '@/lib/cn.ts'

export function Legend({children, className}: { children: ReactNode; className?: string }) {
    return <ul className={cn('flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px] text-muted', className)}>{children}</ul>
}

export function LegendItem({swatch, children}: { swatch: ReactNode; children: ReactNode }) {
    return <li className="inline-flex items-center gap-[7px]">{swatch}{children}</li>
}

/** Pass the color via className, e.g. <Swatch className="bg-chart-1" /> */
export function Swatch({className}: { className?: string }) {
    return <span aria-hidden="true" className={cn('inline-block size-3 flex-none rounded-[3px]', className)}/>
}