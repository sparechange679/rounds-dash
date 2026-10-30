export type SeriesKey = 'admissions' | 'discharges'

// Class names are written out in full so Tailwind can see them.
export const flowSeries = [
    {key: 'admissions', label: 'Admissions', line: 'stroke-chart-1', dot: 'stroke-chart-1', swatch: 'bg-chart-1', dash: undefined},
    {key: 'discharges', label: 'Discharges', line: 'stroke-chart-2', dot: 'stroke-chart-2', swatch: 'bg-chart-2', dash: '6 4'},
] as const