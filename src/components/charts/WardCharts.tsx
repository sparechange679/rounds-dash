import {useEffect, useState} from 'react'
import {useElementWidth} from '@/hooks/useElementWidth.ts'
import {wards} from '@/data/wards.ts'

const rows = wards
    .map((w) => ({...w, pct: (w.occupied / w.beds) * 100}))
    .sort((a, b) => b.pct - a.pct)

const barClass = {ok: 'fill-chart-1', warn: 'fill-amber', crit: 'fill-coral'}
const toneOf = (pct: number) => (pct >= 95 ? 'crit' : pct >= 85 ? 'warn' : 'ok')

const TOP = 22
const BAR_H = 12
const BOTTOM = 22

export function WardChart() {
    const [ref, width] = useElementWidth<HTMLDivElement>()
    const ready = width > 0
    const [drawn, setDrawn] = useState(false)

    // Grow the bars once, after the first real measurement. Two frames so the
    // scaleX(0) start state is painted before it flips.
    useEffect(() => {
        if (!ready) return
        let id2 = 0
        const id1 = requestAnimationFrame(() => {
            id2 = requestAnimationFrame(() => setDrawn(true))
        })
        return () => {
            cancelAnimationFrame(id1)
            cancelAnimationFrame(id2)
        }
    }, [ready])

    const narrow = width < 520
    const labelW = narrow ? 104 : 196
    const valueW = narrow ? 42 : 96
    const rowH = narrow ? 28 : 30
    const plotW = Math.max(60, width - labelW - valueW - 10)
    const h = TOP + rows.length * rowH + BOTTOM
    const ticks = narrow ? [0, 50, 100] : [0, 25, 50, 75, 100]
    const limitX = labelW + plotW * 0.85

    return (
        <figure aria-label="Bed occupancy by ward">
            <div ref={ref}>
                {ready && (
                    <svg viewBox={`0 0 ${width} ${h}`} width={width} height={h}
                         className="block overflow-visible" aria-hidden="true" focusable="false">
                        {ticks.map((p) => {
                            const x = labelW + (plotW * p) / 100
                            return (
                                <g key={p}>
                                    <line x1={x} x2={x} y1={TOP - 4} y2={h - BOTTOM + 2}
                                          className="stroke-line" strokeDasharray={p ? '2 4' : undefined}/>
                                    <text x={x} y={11} className="fill-muted font-mono text-[11px]"
                                          textAnchor={p === 0 ? 'start' : p === 100 ? 'end' : 'middle'}>
                                        {p}%
                                    </text>
                                </g>
                            )
                        })}

                        {rows.map((r, i) => {
                            const cy = TOP + i * rowH + rowH / 2
                            return (
                                <g key={r.code}>
                                    <title>{`${r.code} ${r.name}: ${r.occupied} of ${r.beds} beds occupied (${Math.round(r.pct)}%)`}</title>
                                    <text x={0} y={cy + 4} className="fill-ink font-mono text-[11.5px] font-semibold">{r.code}</text>
                                    <text x={narrow ? 34 : 40} y={cy + 4} className="fill-text text-[12.5px]">
                                        {narrow ? r.short : r.name}
                                    </text>
                                    <rect x={labelW} y={cy - BAR_H / 2} width={plotW} height={BAR_H} rx={3} className="fill-surface-3"/>
                                    <rect x={labelW} y={cy - BAR_H / 2} width={(plotW * r.pct) / 100} height={BAR_H} rx={3}
                                          className={barClass[toneOf(r.pct)]}
                                          style={{
                                              transformBox: 'fill-box',
                                              transformOrigin: 'left',
                                              transform: `scaleX(${drawn ? 1 : 0})`,
                                              transition: `transform .7s cubic-bezier(.2,.7,.2,1) ${i * 35}ms`,
                                          }}/>
                                    <text x={width} y={cy + 4} textAnchor="end"
                                          className="fill-ink font-mono text-xs font-semibold">
                                        {Math.round(r.pct)}%
                                    </text>
                                    {!narrow && (
                                        <text x={width - 42} y={cy + 4} textAnchor="end"
                                              className="fill-muted font-mono text-xs font-semibold">
                                            {r.occupied}/{r.beds}
                                        </text>
                                    )}
                                </g>
                            )
                        })}

                        <line x1={limitX} x2={limitX} y1={TOP - 4} y2={h - BOTTOM + 4}
                              className="stroke-ink" strokeWidth={1.25} strokeDasharray="4 3"/>
                        <text x={limitX} y={h - 4} textAnchor="middle" className="fill-ink font-mono text-[10.5px]">
                            85% limit
                        </text>
                    </svg>
                )}
            </div>

            <table className="sr-only">
                <thead>
                <tr>
                    <th scope="col">Ward</th>
                    <th scope="col">Occupied</th>
                    <th scope="col">Beds</th>
                    <th scope="col">Occupancy</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((r) => (
                    <tr key={r.code}>
                        <th scope="row">{r.code} {r.name}</th>
                        <td>{r.occupied}</td>
                        <td>{r.beds}</td>
                        <td>{Math.round(r.pct)}%</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </figure>
    )
}