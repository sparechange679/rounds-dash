import {useEffect, useRef, useState} from 'react'
import {Button} from '@/components/ui/Button.tsx'
import {CountBadge, Panel, PanelHead, PanelMeta} from '@/components/ui/Panel.tsx'
import {LiveDot} from '@/components/ui/LiveDot.tsx'
import {Icon} from '@/components/icons/Icon.tsx'
import {useAnnounce} from '@/hooks/useAnnounce.ts'
import {clockNow} from '@/lib/time.ts'
import {cn} from '@/lib/cn.ts'
import {alerts, type AlertItem} from '@/data/alerts.ts'

const tone = {
    crit: {bar: 'before:bg-coral', icon: 'bg-tint-coral text-coral-ink', label: 'Critical'},
    warn: {bar: 'before:bg-amber', icon: 'bg-tint-amber text-amber-ink', label: 'Warning'},
    info: {bar: 'before:bg-sky', icon: 'bg-tint-sky text-sky-ink', label: 'Notice'},
} as const

export function AlertsPanel({className}: { className?: string }) {
    const announce = useAnnounce()
    const [acked, setAcked] = useState<Record<number, string>>({})
    const listRef = useRef<HTMLUListElement>(null)
    const refocus = useRef(false)
    const open = alerts.length - Object.keys(acked).length

    // After acknowledging, move focus to the next open alert's button.
    useEffect(() => {
        if (!refocus.current) return
        refocus.current = false
        listRef.current?.querySelector<HTMLButtonElement>('[data-ack]')?.focus()
    }, [acked])

    const acknowledge = (a: AlertItem) => {
        refocus.current = true
        setAcked((prev) => ({...prev, [a.id]: clockNow()}))
        const left = open - 1
        announce(`Acknowledged: ${a.title}. ${left} ${left === 1 ? 'alert' : 'alerts'} open.`)
    }

    return (
        <Panel className={className} aria-labelledby="alerts-title">
            <PanelHead id="alerts-title"
                       title={<>Critical alerts <CountBadge tone={open > 0 ? 'coral' : undefined}>{open}</CountBadge></>}
                       actions={<PanelMeta><LiveDot/>Live</PanelMeta>}/>
            <ul ref={listRef} className="py-0.5">
                {alerts.map((a) => {
                    const t = tone[a.severity]
                    const ackTime = acked[a.id]
                    return (
                        <li key={a.id}
                            className={cn(
                                "relative grid grid-cols-[32px_minmax(0,1fr)] items-start gap-x-3 gap-y-2 border-b border-line px-[18px] py-[13px] transition-opacity last:border-b-0 max-sm:grid-cols-[28px_minmax(0,1fr)] max-sm:px-4",
                                "before:absolute before:bottom-[13px] before:left-0 before:top-[13px] before:w-[3px] before:rounded-r-[3px] before:content-['']",
                                ackTime ? 'opacity-[.62] before:bg-line-2' : t.bar,
                            )}>
                            <span aria-hidden="true"
                                  className={cn('grid size-8 place-items-center rounded max-sm:size-7', t.icon)}>
                                <Icon name={a.severity === 'info' ? 'droplet' : 'alert'} className="size-4"/>
                            </span>
                            <div>
                                <p className="text-sm font-semibold leading-snug text-ink">
                                    <span className="sr-only">{t.label}: </span>{a.title}
                                </p>
                                <p className="mt-[3px] text-[12.5px] leading-snug text-muted">{a.detail}</p>
                            </div>
                            <div className="col-start-2 flex items-center justify-between gap-2">
                                <time className="font-mono text-[11.5px] font-medium text-muted">{a.time}</time>
                                {ackTime ? (
                                    <span className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-[11px] font-semibold text-teal">
                                        <Icon name="check" className="size-3.5"/> Acknowledged {ackTime}
                                    </span>
                                ) : (
                                    <Button size="xs" variant="outline" data-ack onClick={() => acknowledge(a)}>
                                        Acknowledge<span className="sr-only">: {a.title}</span>
                                    </Button>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </Panel>
    )
}