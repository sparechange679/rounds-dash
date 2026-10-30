export type TriageLevel = { level: 1 | 2 | 3 | 4 | 5; name: string; waiting: number; median: string | null }

export const triage: TriageLevel[] = [
    {level: 1, name: 'Resuscitation', waiting: 0, median: null},
    {level: 2, name: 'Emergent', waiting: 3, median: '8 min'},
    {level: 3, name: 'Urgent', waiting: 11, median: '46 min'},
    {level: 4, name: 'Less urgent', waiting: 9, median: '71 min'},
    {level: 5, name: 'Non-urgent', waiting: 4, median: '88 min'},
]

export const edWaiting = triage.reduce((n, t) => n + t.waiting, 0) // 27

export type EdStat = { label: string; parts: { n: string; unit?: string }[]; alert?: boolean }

export const edStats: EdStat[] = [
    {label: 'Waiting', parts: [{n: String(edWaiting)}]},
    {label: 'Median wait', parts: [{n: '42', unit: 'min'}], alert: true},
    {label: 'Longest wait', parts: [{n: '3', unit: 'h'}, {n: '12', unit: 'm'}]},
    {label: 'Ambulances inbound', parts: [{n: '3'}]},
]