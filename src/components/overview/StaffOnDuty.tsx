import {Link} from 'react-router-dom'
import {Avatar} from '@/components/ui/Avatar.tsx'
import {Panel, PanelBody, PanelHead, Subhead} from '@/components/ui/Panel.tsx'
import {Icon} from '@/components/icons/Icon.tsx'
import {cn} from '@/lib/cn.ts'
import {duty, nurseRatios, onCall} from '@/data/duty.ts'

const over = nurseRatios.filter((r) => r.perNurse > r.target)

export function StaffOnDuty({className}: { className?: string }) {
    return (
        <Panel className={className} aria-labelledby="staff-title">
            <PanelHead id="staff-title" title="Staff on duty"
                       actions={
                           <Link to="/staff" className="inline-flex items-center gap-1 text-[13px] font-medium">
                               Roster <Icon name="arrowRight" className="size-[15px]"/>
                           </Link>
                       }/>
            <PanelBody>
                <dl className="mb-5 grid grid-cols-3 gap-1.5 sm:gap-2.5">
                    {duty.map((d) => (
                        <div key={d.label} className="min-w-0 rounded-lg border border-line bg-surface-2 p-2.5 sm:px-3.5 sm:py-3">
                            <dt className="font-mono text-[10px] font-semibold uppercase tracking-[.09em] text-muted">{d.label}</dt>
                            <dd className="mb-0.5 mt-1.5 font-mono text-[22px] font-semibold leading-[1.1] text-ink sm:text-[26px]">{d.value}</dd>
                            <span className="hidden text-xs text-muted sm:block">{d.sub}</span>
                        </div>
                    ))}
                </dl>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
                    <div>
                        <Subhead>Nurse-to-patient ratio</Subhead>
                        <ul className="grid gap-[9px]">
                            {nurseRatios.map((r) => {
                                const isOver = r.perNurse > r.target
                                return (
                                    <li key={r.ward} className="grid grid-cols-[38px_minmax(0,1fr)_34px] items-center gap-2 text-[12.5px]">
                                        <span className="font-mono text-xs font-semibold text-ink">{r.ward}</span>
                                        <span aria-hidden="true" className="h-1.5 overflow-hidden rounded-[3px] bg-surface-3">
                                            <span className={cn('block h-full rounded-[3px]', isOver ? 'bg-coral' : 'bg-teal-500')}
                                                  style={{width: `${Math.min(100, (r.target / r.perNurse) * 100)}%`}}/>
                                        </span>
                                        <span className={cn('text-right font-mono', isOver ? 'font-semibold text-coral-ink' : 'text-text')}>
                                            1:{r.perNurse}
                                            {isOver && <span className="sr-only"> (above target)</span>}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                        {over.length > 0 && (
                            <p className="mt-2 text-xs text-muted">
                                {over.map((r) => `${r.ward} is above its 1:${r.target} target.`).join(' ')}
                            </p>
                        )}
                    </div>

                    <div>
                        <Subhead>Consultants on call</Subhead>
                        <ul className="grid gap-2.5">
                            {onCall.map((c) => (
                                <li key={c.bleep} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5">
                                    <Avatar initials={c.initials} tint={c.tint} size="sm"/>
                                    <div className="min-w-0">
                                        <strong className="block truncate text-[13px] font-semibold text-ink">{c.name}</strong>
                                        <span className="block text-xs text-muted">{c.dept}</span>
                                    </div>
                                    <span className="inline-flex items-center gap-[5px] whitespace-nowrap rounded bg-surface-3 px-[7px] py-0.5 font-mono text-xs font-medium text-ink">
                                        <Icon name="phone" className="size-[13px]"/>
                                        <span className="sr-only">Bleep </span>{c.bleep}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </PanelBody>
        </Panel>
    )
}