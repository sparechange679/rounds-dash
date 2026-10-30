export type Severity = 'crit' | 'warn' | 'info'

export type AlertItem = { id: number; severity: Severity; title: string; detail: string; time: string }

export const alerts: AlertItem[] = [
    {id: 1, severity: 'crit', title: 'Sepsis screen positive', detail: 'ICU-02 · Tobias Engel · lactate 4.1 mmol/L, MAP 61', time: '09:31'},
    {id: 2, severity: 'crit', title: 'Critical potassium 6.3 mmol/L', detail: '4B-22 · Kwame Asante · repeat sample sent', time: '09:18'},
    {id: 3, severity: 'warn', title: 'ICU at 92%: no bed ready', detail: 'ICU-09 being cleaned, ready about 10:10. Two planned post-op admissions.', time: '09:05'},
    {id: 4, severity: 'warn', title: 'ED boarding over 4 hours', detail: '2 patients awaiting medical beds. Site manager informed.', time: '08:52'},
    {id: 5, severity: 'info', title: 'O-negative stock below par', detail: 'Blood bank holds 6 units (par 10). Delivery due 13:00.', time: '08:30'},
]