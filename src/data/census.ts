export type CensusItem = {
    label: string
    value: string
    of?: string
    tone?: 'alert' | 'warn'
}

export const census: CensusItem[] = [
    {label: 'Census', value: '286', of: '/340'},
    {label: 'Occupancy', value: '84.1%'},
    {label: 'Beds ready', value: '36'},
    {label: 'ED wait', value: '42 min', tone: 'alert'},
    {label: 'ED queue', value: '27'},
    {label: 'Awaiting bed', value: '6', tone: 'warn'},
    {label: 'Theatres', value: '7', of: '/9'},
    {label: 'Admits', value: '31'},
    {label: 'Discharges', value: '9', of: '/38'},
]