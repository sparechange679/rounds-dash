export type Ward = { code: string; name: string; short: string; beds: number; occupied: number }

export const wards: Ward[] = [
    {code: 'ICU', name: 'Intensive Care', short: 'Intensive', beds: 12, occupied: 11},
    {code: 'CCU', name: 'Coronary Care', short: 'Coronary', beds: 8, occupied: 7},
    {code: '3A', name: 'Cardiology', short: 'Cardio', beds: 24, occupied: 20},
    {code: '4B', name: 'General Medicine', short: 'Gen Med', beds: 40, occupied: 38},
    {code: '4C', name: 'Respiratory', short: 'Resp', beds: 28, occupied: 25},
    {code: '5A', name: 'General Surgery', short: 'Surgery', beds: 36, occupied: 30},
    {code: '5C', name: 'Orthopaedics', short: 'Ortho', beds: 28, occupied: 21},
    {code: '6A', name: 'Oncology', short: 'Oncology', beds: 22, occupied: 19},
    {code: '6B', name: 'Neurology & Stroke', short: 'Neuro', beds: 20, occupied: 17},
    {code: '7A', name: 'Paediatrics', short: 'Paeds', beds: 30, occupied: 18},
    {code: '2M', name: 'Maternity', short: 'Maternity', beds: 26, occupied: 20},
    {code: '2B', name: 'Elder Care', short: 'Elder', beds: 34, occupied: 32},
    {code: 'AMU', name: 'Acute Medical Unit', short: 'Acute Med', beds: 32, occupied: 28},
]

export const totalBeds = wards.reduce((n, w) => n + w.beds, 0)          // 340
export const totalOccupied = wards.reduce((n, w) => n + w.occupied, 0)  // 286