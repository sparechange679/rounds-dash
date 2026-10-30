export type FlowDay = { day: string; admissions: number; discharges: number }

/** Last 14 days, oldest first. The final entry is yesterday (Wed 23). */
export const flow: FlowDay[] = [
    {day: 'Thu 10', admissions: 58, discharges: 60},
    {day: 'Fri 11', admissions: 61, discharges: 66},
    {day: 'Sat 12', admissions: 49, discharges: 41},
    {day: 'Sun 13', admissions: 47, discharges: 38},
    {day: 'Mon 14', admissions: 63, discharges: 55},
    {day: 'Tue 15', admissions: 66, discharges: 61},
    {day: 'Wed 16', admissions: 59, discharges: 63},
    {day: 'Thu 17', admissions: 57, discharges: 60},
    {day: 'Fri 18', admissions: 62, discharges: 67},
    {day: 'Sat 19', admissions: 51, discharges: 43},
    {day: 'Sun 20', admissions: 48, discharges: 39},
    {day: 'Mon 21', admissions: 64, discharges: 58},
    {day: 'Tue 22', admissions: 68, discharges: 62},
    {day: 'Wed 23', admissions: 60, discharges: 57},
]