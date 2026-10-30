import type {IconName} from "@/components/icons/Icon.tsx";

export type AppNotification = {
    id: number
    tone: 'coral' | 'amber' | 'teal'
    icon: IconName
    title: string
    detail: string
    time: string
    to: string
}

export const notifications: AppNotification[] = [
    {
        id: 1,
        tone: 'coral',
        icon: 'alert',
        title: 'Critical potassium 6.3 mmol/L',
        detail: '4B-22 · K. Asante',
        time: '4 min ago',
        to: '/patients'
    },
    {
        id: 2,
        tone: 'amber',
        icon: 'clock',
        title: 'ED boarding over 4 hours',
        detail: '2 patients awaiting medical beds',
        time: '12 min ago',
        to: '/beds'
    },
    {
        id: 3,
        tone: 'amber',
        icon: 'patients',
        title: '4B night shift is 1 RN short',
        detail: 'Open shift offered to bank staff',
        time: '26 min ago',
        to: '/staff'
    },
    {
        id: 4,
        tone: 'teal',
        icon: 'calendar',
        title: 'Echo confirmed for M. Ventura',
        detail: 'Fri 25 Sep, 10:30 · Cardiac Investigations',
        time: '1 h ago',
        to: '/patient'
    },
]