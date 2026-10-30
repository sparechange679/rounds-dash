import {useState, type KeyboardEvent, type PointerEvent} from 'react'
import {useElementWidth} from '@/hooks/useElementWidth.ts'
import {flowSeries, type SeriesKey} from '@/components/charts/flowSeries.ts'
import {cn} from '@/lib/cn.ts'
import type {FlowDay} from '@/data/flow.ts'

type Props = { data: FlowDay[]; show: Record<SeriesKey, boolean> }

const PAD = {l: 34, r: 8, t: 12, b: 28}

export function FlowChart({data, show}: Props) {
    const [ref, width] = useElementWidth<HTMLDivElement>()
    const [index, setIndex] = useState<number | null>(null)
    const [speech, setSpeech] = useState('')

    const n = data.length
    const active = index === null ? null : Math.min(index, n - 1) // data length changes with the range toggle
    const h = width < 520 ? 220 : 262
    const pw = width - PAD.l - PAD.r
    const ph = h - PAD.t - PAD.b
    const step = pw / n

    const visible = flowSeries.filter((s) => show[s.key])
    const pool = (visible.length ? visible : flowSeries).flatMap((s) => data.map((d) => d[s.key]))
    const lo = Math.floor((Math.min(...pool) - 3) / 10) * 10
    const hi = Math.ceil((Math.max(...pool) + 3) / 10) * 10
    const X = (i: number) => PAD.l + step * (i + 0.5)
    const Y = (v: number) => PAD.t + ph - ((v - lo) / (hi - lo)) * ph

    const gridValues: number[] = []
    for (let v = lo; v <= hi; v += 10) gridValues.push(v)

    const every = step < 26 ? 2 : 1
    const path = (key: SeriesKey) => 'M' + data.map((d, i) => `${X(i).toFixed(1)},${Y(d[key]).toFixed(1)}`).join('L')
    const areaPath = `${path('admissions')}L${X(n - 1)},${PAD.t + ph}L${X(0)},${PAD.t + ph}Z`

    const speak = (i: number) => `${data[i].day} September: ${data[i].admissions} admissions, ${data[i].discharges} discharges.`
    const clamp = (i: number) => Math.max(0, Math.min(n - 1, i))

    const move = (i: number) => {
        const next = clamp(i)
        setIndex(next)
        setSpeech(speak(next))
    }

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const cur = active ?? n - 1
        let next: number
        switch (e.key) {
            case 'ArrowRight': next = cur + 1; break
            case 'ArrowLeft': next = cur - 1; break
            case 'Home': next = 0; break
            case 'End': next = n - 1; break
            case 'Escape': setIndex(null); return
            default: return
        }
        e.preventDefault()
        move(next)
    }

    const onPointerMove = (e: PointerEvent<SVGRectElement>) => {
        setIndex(clamp(Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().left) / step)))
    }

    const d = active === null ? null : data[active]
    const net = d ? d.admissions - d.discharges : 0
    const flip = active !== null && X(active) > width / 2

    return (
        <figure aria-label="Admissions and discharges per day">
            <div
                ref={ref}
                tabIndex={0}
                role="group"
                aria-label="Admissions and discharges per day. Use the left and right arrow keys to read each point."
                onKeyDown={onKeyDown}
                onFocus={(e) => {
                    // Only jump to a reading for keyboard focus, not for a click.
                    if (e.currentTarget.matches(':focus-visible') && index === null) move(n - 1)
                }}
                onBlur={() => setIndex(null)}
                className="relative min-h-[220px] rounded"
            >
                {width > 0 && (
                    <svg viewBox={`0 0 ${width} ${h}`} width={width} height={h}
                         className="block overflow-visible" aria-hidden="true" focusable="false">
                        <defs>
                            {/* currentColor keeps the gradient on a theme class instead of a raw var() */}
                            <linearGradient id="flow-fill" x1="0" y1="0" x2="0" y2="1" className="text-chart-1">
                                <stop offset="0%" stopColor="currentColor" stopOpacity={0.16}/>
                                <stop offset="100%" stopColor="currentColor" stopOpacity={0}/>
                            </linearGradient>
                        </defs>

                        {data.map((day, i) =>
                            /^(Sat|Sun)/.test(day.day) && (
                                <rect key={day.day} x={PAD.l + step * i} y={PAD.t} width={step} height={ph}
                                      className="fill-surface-2"/>
                            ))}

                        {gridValues.map((v) => (
                            <g key={v}>
                                <line x1={PAD.l} x2={width - PAD.r} y1={Y(v)} y2={Y(v)} className="stroke-line"
                                      strokeDasharray={v === lo ? undefined : '2 4'}/>
                                <text x={PAD.l - 8} y={Y(v) + 4} textAnchor="end" className="fill-muted font-mono text-[11px]">{v}</text>
                            </g>
                        ))}

                        {data.map((day, i) =>
                            (n - 1 - i) % every === 0 && (
                                <text key={day.day} x={X(i)} y={h - 8} textAnchor="middle"
                                      className="fill-muted font-mono text-[11px]">
                                    {step < 46 ? day.day.split(' ')[1] : day.day}
                                </text>
                            ))}

                        {show.admissions && <path d={areaPath} fill="url(#flow-fill)"/>}

                        {flowSeries.map((s) => show[s.key] && (
                            <g key={s.key}>
                                <path d={path(s.key)} fill="none" strokeWidth={2.25} strokeLinejoin="round"
                                      strokeLinecap="round" strokeDasharray={s.dash} className={s.line}/>
                                {step >= 22 && data.map((day, i) => (
                                    <circle key={day.day} cx={X(i)} cy={Y(day[s.key])} r={2.6} strokeWidth={2}
                                            className={cn('fill-surface', s.dot)}/>
                                ))}
                            </g>
                        ))}

                        {active !== null && (
                            <g>
                                <line x1={X(active)} x2={X(active)} y1={PAD.t} y2={PAD.t + ph}
                                      className="stroke-muted-2" strokeDasharray="3 3"/>
                                {flowSeries.map((s) => show[s.key] && (
                                    <circle key={s.key} cx={X(active)} cy={Y(data[active][s.key])} r={5} strokeWidth={3}
                                            className={cn('fill-surface', s.dot)}/>
                                ))}
                            </g>
                        )}

                        <rect x={PAD.l} y={PAD.t} width={pw} height={ph}
                              className="cursor-crosshair touch-pan-y fill-transparent"
                              onPointerMove={onPointerMove} onPointerLeave={() => setIndex(null)}/>
                    </svg>
                )}

                {d && active !== null && (
                    <div aria-hidden="true"
                         className="pointer-events-none absolute top-3 z-[5] min-w-[150px] whitespace-nowrap rounded bg-ink px-2.5 py-2 font-mono text-xs leading-normal text-surface shadow-2"
                         style={{left: flip ? X(active) - 14 : X(active) + 14, transform: flip ? 'translateX(-100%)' : undefined}}>
                        <b className="mb-[3px] block font-semibold">{d.day} Sep</b>
                        {flowSeries.map((s) => show[s.key] && (
                            <div key={s.key} className="flex items-center justify-between gap-3.5">
                                <span className="inline-flex items-center">
                                    <i className={cn('mr-1.5 inline-block size-2 rounded-[2px]', s.swatch)}/>{s.label}
                                </span>
                                <span>{d[s.key]}</span>
                            </div>
                        ))}
                        {show.admissions && show.discharges && (
                            <div className="flex items-center justify-between gap-3.5">
                                <span>Net</span><span>{net > 0 ? '+' : ''}{net}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <p className="sr-only" aria-live="polite">{speech}</p>

            <table className="sr-only">
                <caption>Admissions and discharges per day, {data[0].day} to {data[n - 1].day} September</caption>
                <thead>
                <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Admissions</th>
                    <th scope="col">Discharges</th>
                </tr>
                </thead>
                <tbody>
                {data.map((day) => (
                    <tr key={day.day}>
                        <th scope="row">{day.day} Sep</th>
                        <td>{day.admissions}</td>
                        <td>{day.discharges}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </figure>
    )
}