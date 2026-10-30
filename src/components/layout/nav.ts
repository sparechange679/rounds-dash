import type {IconName} from "@/components/icons/Icon.tsx";

export type NavItem = { to: string; label: string; icon: IconName; count?: string }

export const navGroups: { label: string; items: NavItem[] }[] = [
    {
        label: 'Clinical',
        items: [
            {to: '/', label: 'Overview', icon: 'overview'},
            {to: '/patients', label: 'Inpatients', icon: 'patients', count: '286'},
            {to: '/patient', label: 'Patient record', icon: 'record'},
            {to: '/appointments', label: 'OPD appointments', icon: 'calendar', count: '64'},
        ],
    },
    {
        label: 'Operations',
        items: [
            {to: '/beds', label: 'Beds & wards', icon: 'bed', count: '36 free'},
            {to: '/staff', label: 'Staff roster', icon: 'staff'},
        ],
    },
]