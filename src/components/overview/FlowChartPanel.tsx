import {useState} from 'react'
import {Panel, PanelBody, PanelHead} from '@/components/ui/Panel.tsx'
import {Segmented} from '@/components/ui/Segmented.tsx'
import {FlowChart} from '@/components/charts/FlowChart.tsx'
import {flowSeries, type SeriesKey} from '@/components/charts/flowSeries.ts'
import {cn} from '@/lib/cn.ts'
import {flow} from '@/data/flow.ts'

type Range = '7' | '14'

export function FlowChartPanel({className}: { className?: string }) {
    const [range, setRange] = useState<Range>('14')
    const [show, setShow] = useState<Record<SeriesKey, boolean>>({admissions: true, discharges: true})

    const data = flow.slice(-Number(range))
    const totals: Record<SeriesKey, number> = {
        admissions: data.reduce((n, d) => n + d.admissions, 0),
        discharges: data.reduce((n, d) => n + d.discharges, 0),
    }
    const net = totals.admissions - totals.discharges

    return (
        <Panel className={className} aria-labelledby="flow-title">
            <PanelHead id="flow-title" title="Patient flow"
                       subtitle="Daily admissions and discharges. Shaded columns are weekends, when discharges drop."
                       actions={
                           <Segmented label="Date range" value={range} onChange={setRange}
                                      options={[{value: '7', label: '7 days'}, {value: '14', label: '14 days'}]}/>
                       }/>
            <PanelBody>
                <div role="group" aria-label="Show or hide series" className="mb-3 flex flex-wrap items-center gap-2">
                    {flowSeries.map((s) => (
                        <button key={s.key} type="button" aria-pressed={show[s.key]}
                                onClick={() => setShow((prev) => ({...prev, [s.key]: !prev[s.key]}))}
                                className="group inline-flex items-center gap-2 rounded border border-line bg-surface px-2.5 py-[5px] text-[13px] text-text transition-opacity aria-[pressed=false]:opacity-50">
                            <span aria-hidden="true"
                                  className={cn('h-[3px] w-4 rounded-[2px] group-aria-[pressed=false]:bg-line-2', s.swatch)}/>
                            {s.label}
                            <strong className="font-mono text-[12.5px] font-semibold text-ink">{totals[s.key]}</strong>
                        </button>
                    ))}
                    <span className="ml-auto font-mono text-xs text-muted">
                        Net {net > 0 ? '+' : ''}{net} beds over {range} days
                    </span>
                </div>
                <FlowChart data={data} show={show}/>
            </PanelBody>
        </Panel>
    )
}