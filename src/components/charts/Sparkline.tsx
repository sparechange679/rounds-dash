type Props = { values: number[] }

const W = 92
const H = 34

export function Sparkline({values}: Props) {
    if (values.length < 2) return null
    const min = Math.min(...values)
    const max = Math.max(...values)
    const span = max - min || 1
    const pts = values.map((y, i) => [
        2 + (i * (W - 6)) / (values.length - 1),
        H - 4 - ((y - min) / span) * (H - 10),
    ])
    const fmt = (p: number[]) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`
    const last = pts[pts.length - 1]
    const area = `M${pts.map(fmt).join('L')}L${last[0].toFixed(1)},${H}L2,${H}Z`

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[34px] w-[92px] overflow-visible" aria-hidden="true" focusable="false">
            <path d={area} className="fill-tint-navy opacity-90"/>
            <polyline points={pts.map(fmt).join(' ')} className="fill-none stroke-chart-1"
                      strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round"/>
            <circle cx={last[0]} cy={last[1]} r={2.8} className="fill-surface stroke-chart-1" strokeWidth={2}/>
        </svg>
    )
}