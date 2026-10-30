import type {PillTone} from '@/components/ui/Pill.tsx'
import type {AvatarTint} from '@/components/ui/Avatar.tsx'

export type OpdRow = {
    time: string
    name: string
    mrn: string
    initials: string
    tint: AvatarTint
    clinician: string
    clinic: string
    status: PillTone
}

export const opdSummary = {booked: 64, clinics: 6, seen: 14, consult: 6, noshow: 2}

/** The next appointments shown on the Overview. The full board comes in Step 7. */
export const opdPreview: OpdRow[] = [
    {time: '09:30', name: 'Bashir Hussain', mrn: 'SAG-336989', initials: 'BH', tint: 'coral', clinician: 'Dr. K. Ito', clinic: 'Cardiology', status: 'consult'},
    {time: '09:30', name: 'Anouk Iyer', mrn: 'SAG-102031', initials: 'AI', tint: 'amber', clinician: 'Dr. P. Raman', clinic: 'Endocrinology', status: 'consult'},
    {time: '09:30', name: 'Fatima Ashworth', mrn: 'SAG-272339', initials: 'FA', tint: 'sky', clinician: 'Dr. T. Wierzbicki', clinic: 'Orthopaedics', status: 'consult'},
    {time: '10:00', name: 'Nnamdi Laurent', mrn: 'SAG-206458', initials: 'NL', tint: 'navy', clinician: 'Dr. P. Raman', clinic: 'Endocrinology', status: 'arrived'},
    {time: '10:00', name: 'Cecile Lindahl', mrn: 'SAG-270241', initials: 'CL', tint: 'slate', clinician: 'Dr. T. Wierzbicki', clinic: 'Orthopaedics', status: 'arrived'},
    {time: '10:00', name: 'Lucinda Marchand', mrn: 'SAG-336663', initials: 'LM', tint: 'sky', clinician: 'Dr. H. Solberg', clinic: 'General Surgery', status: 'arrived'},
    {time: '10:00', name: 'Kofi Eze', mrn: 'SAG-328458', initials: 'KE', tint: 'amber', clinician: 'Dr. L. Haddad', clinic: 'Paediatrics', status: 'booked'},
    {time: '10:30', name: 'Carmen Osman', mrn: 'SAG-365430', initials: 'CO', tint: 'navy', clinician: 'Dr. K. Ito', clinic: 'Cardiology', status: 'arrived'},
    {time: '10:30', name: 'Wilhelmina Hoffmann', mrn: 'SAG-362565', initials: 'WH', tint: 'teal', clinician: 'Dr. P. Raman', clinic: 'Endocrinology', status: 'booked'},
]