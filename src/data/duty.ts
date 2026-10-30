import type {AvatarTint} from '@/components/ui/Avatar.tsx'

export const duty = [
    {label: 'Doctors', value: 46, sub: '14 consultants'},
    {label: 'Nurses', value: 128, sub: '104 RN · 24 HCA'},
    {label: 'Allied health', value: 31, sub: 'Physio, pharmacy, OT'},
]

/** perNurse is patients per nurse; target is the ward's limit. */
export const nurseRatios = [
    {ward: 'ICU', perNurse: 1, target: 1},
    {ward: 'CCU', perNurse: 2, target: 2},
    {ward: '3A', perNurse: 5, target: 5},
    {ward: '4B', perNurse: 7, target: 6},
    {ward: '5A', perNurse: 5, target: 5},
    {ward: '7A', perNurse: 4, target: 4},
]

export const onCall: { name: string; initials: string; tint: AvatarTint; dept: string; bleep: string }[] = [
    {name: 'Dr. K. Ito', initials: 'KI', tint: 'amber', dept: 'Cardiology', bleep: '4472'},
    {name: 'Dr. H. Solberg', initials: 'HS', tint: 'slate', dept: 'General Surgery', bleep: '5210'},
    {name: 'Dr. L. Haddad', initials: 'LH', tint: 'teal', dept: 'Paediatrics', bleep: '6034'},
    {name: 'Dr. C. Fraser', initials: 'CF', tint: 'amber', dept: 'Intensive Care', bleep: '2001'},
]