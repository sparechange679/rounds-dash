import {Fragment} from 'react'
import {Panel, PanelBody, PanelHead, PanelMeta, Subhead} from '@/components/ui/Panel.tsx'
import {cn} from '@/lib/cn.ts'
import {edStats, edWaiting, triage} from '@/data/ed.ts'

const level = {
    1: 'bg-[#b42318] text-white',
    2: 'bg-[#e5533d] text-white',
    3: 'bg-[#eea935] text-[#3b2600]',
    4: 'bg-[#1f9d7a] text-white',
    5: 'bg-[#2f74c0] text-white',
} as const

const barLabel = `${edWaiting} waiting: ${triage
    .filter((t) => t.waiting > 0)
    .map((t) => `${t.waiting} ${t.name.toLowerCase()}`)
    .join(', ')}`

const th = 'pb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[.08em] text-muted'

export function EdPanel({className}: { className?: string }) {
    return (
        <Panel className={className} aria-labelledby="ed-title">
            <PanelHead id="ed-title" title="Emergency department" actions={<PanelMeta>09:42</PanelMeta>}/>
            <PanelBody>
                <dl className="mb-[18px] grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
                    {edStats.map((s) => (
                        <div key={s.label} className="bg-surface px-3.5 py-3">
                            <dt className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[.09em] text-muted">{s.label}</dt>
                            <dd className={cn('font-mono text-[22px] font-semibold leading-[1.1]', s.alert ? 'text-coral-ink' : 'text-ink')}>
                                {s.parts.map((p, i) => (
                                    <Fragment key={i}>
                                        {p.n}
                                        {p.unit && <small className="mx-0.5 text-xs font-medium text-muted">{p.unit}</small>}
                                    </Fragment>
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>

                <Subhead>Waiting by triage level (ESI)</Subhead>
                <div role="img" aria-label={barLabel} className="mb-3.5 flex h-3.5 gap-0.5 overflow-hidden rounded-[4px]">
                    {triage.filter((t) => t.waiting > 0).map((t) => (
                        <span key={t.level} title={`ESI ${t.level}: ${t.waiting} waiting`}
                              className={cn('block min-w-1', level[t.level])} style={{flexGrow: t.waiting}}/>
                    ))}
                </div>

                <table className="w-full text-[13px]">
                    <caption className="sr-only">Patients waiting and median wait by ESI triage level</caption>
                    <thead>
                    <tr>
                        <th scope="col" colSpan={2} className={cn(th, 'text-left')}>Level</th>
                        <th scope="col" className={cn(th, 'text-right')}>Waiting</th>
                        <th scope="col" className={cn(th, 'text-right')}>Median</th>
                    </tr>
                    </thead>
                    <tbody>
                    {triage.map((t) => (
                        <tr key={t.level} className="border-b border-dashed border-line last:border-b-0">
                            <td className="w-8 py-[7px]">
                                <span className={cn('grid size-[22px] place-items-center rounded-[4px] font-mono text-[11.5px] font-semibold leading-none', level[t.level])}>
                                    {t.level}
                                </span>
                            </td>
                            <td className="py-[7px]">{t.name}</td>
                            <td className="py-[7px] text-right font-mono font-semibold text-ink">{t.waiting}</td>
                            <td className="py-[7px] text-right font-mono text-muted">{t.median ?? '—'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </PanelBody>
        </Panel>
    )
}