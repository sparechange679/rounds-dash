import {wards} from '@/data/wards.ts'

export const doctors = {
    achterberg: {name: 'Dr. Samuel Achterberg', short: 'Dr. S. Achterberg', dept: 'Respiratory'},
    balogun: {name: 'Dr. Nkechi Balogun', short: 'Dr. N. Balogun', dept: 'Oncology'},
    castellanos: {name: 'Dr. Marguerite Castellanos', short: 'Dr. M. Castellanos', dept: 'Obstetrics'},
    duarte: {name: 'Dr. Rafael Duarte', short: 'Dr. R. Duarte', dept: 'General Medicine'},
    fraser: {name: 'Dr. Callum Fraser', short: 'Dr. C. Fraser', dept: 'Intensive Care'},
    haddad: {name: 'Dr. Leila Haddad', short: 'Dr. L. Haddad', dept: 'Paediatrics'},
    okafor: {name: 'Dr. Adaeze Okafor', short: 'Dr. A. Okafor', dept: 'Cardiology'},
    raman: {name: 'Dr. Priya Raman', short: 'Dr. P. Raman', dept: 'Endocrinology'},
    solberg: {name: 'Dr. Henrik Solberg', short: 'Dr. H. Solberg', dept: 'General Surgery'},
    wierzbicki: {name: 'Dr. Tomasz Wierzbicki', short: 'Dr. T. Wierzbicki', dept: 'Orthopaedics'},
    zhou: {name: 'Dr. Mei Lin Zhou', short: 'Dr. M. Zhou', dept: 'Neurology'},
} satisfies Record<string, { name: string; short: string; dept: string }>

export type DoctorKey = keyof typeof doctors

/** Display order for the summary chips and the status filter. */
export const STATUS_LABEL = {
    critical: 'Critical',
    observation: 'Observation',
    stable: 'Stable',
    postop: 'Post-op',
    ready: 'Discharge ready',
}

export type PatientStatus = keyof typeof STATUS_LABEL
export const STATUSES = Object.keys(STATUS_LABEL) as PatientStatus[]

/** Sort order for the Status column (same as the original data-v values). */
export const STATUS_RANK: Record<PatientStatus, number> = {critical: 0, observation: 1, postop: 2, stable: 3, ready: 4}

export type Patient = {
    mrn: string
    name: string
    age: number
    sex: 'F' | 'M' | 'X'
    bed: string
    doctor: DoctorKey
    admitted: number   // day of September
    diagnosis: string
    news: number
    status: PatientStatus
    isNew?: boolean
}

/** The demo "today" is Thursday 24 September. */
export const TODAY_DAY = 24

export const wardOf = (bed: string) => bed.split('-')[0]

const wardNames = new Map(wards.map((w) => [w.code, w.name]))
export const wardName = (code: string) => wardNames.get(code) ?? code

export const searchText = (p: Patient) =>
    [p.name, p.mrn, p.bed, p.diagnosis, doctors[p.doctor].name].join(' ').toLowerCase()

export const patients: Patient[] = [
    {mrn: 'SAG-204817', name: 'Marisol Ventura', age: 67, sex: 'F', bed: '3A-07', doctor: 'okafor', admitted: 19, diagnosis: 'Heart failure, decompensated', news: 3, status: 'observation'},
    {mrn: 'SAG-300729', name: 'Harold Pembrook', age: 74, sex: 'M', bed: 'CCU-03', doctor: 'okafor', admitted: 22, diagnosis: 'NSTEMI', news: 6, status: 'critical'},
    {mrn: 'SAG-195730', name: 'Jun-seo Park', age: 45, sex: 'M', bed: '5A-12', doctor: 'solberg', admitted: 23, diagnosis: 'Laparoscopic cholecystectomy', news: 2, status: 'postop'},
    {mrn: 'SAG-214435', name: 'Beatrix Holloway', age: 82, sex: 'F', bed: '2B-04', doctor: 'duarte', admitted: 16, diagnosis: 'Community-acquired pneumonia', news: 1, status: 'stable'},
    {mrn: 'SAG-187728', name: 'Tobias Engel', age: 58, sex: 'M', bed: 'ICU-02', doctor: 'fraser', admitted: 21, diagnosis: 'Septic shock, urosepsis', news: 8, status: 'critical'},
    {mrn: 'SAG-201761', name: 'Nadia Petrova', age: 36, sex: 'F', bed: '6B-09', doctor: 'zhou', admitted: 20, diagnosis: 'Ischaemic stroke, post-thrombolysis', news: 3, status: 'observation'},
    {mrn: 'SAG-188800', name: 'Kwame Asante', age: 51, sex: 'M', bed: '4B-22', doctor: 'duarte', admitted: 22, diagnosis: 'Diabetic ketoacidosis', news: 4, status: 'observation'},
    {mrn: 'SAG-148122', name: 'Evelyn Marchetti', age: 71, sex: 'F', bed: '5C-05', doctor: 'wierzbicki', admitted: 18, diagnosis: 'Fractured neck of femur, post-ORIF', news: 2, status: 'postop'},
    {mrn: 'SAG-179324', name: 'Rory Gallagher', age: 9, sex: 'M', bed: '7A-03', doctor: 'haddad', admitted: 23, diagnosis: 'Acute asthma', news: 1, status: 'stable'},
    {mrn: 'SAG-248568', name: 'Ines Carvalho', age: 44, sex: 'F', bed: '6A-14', doctor: 'balogun', admitted: 21, diagnosis: 'Neutropenic sepsis', news: 5, status: 'critical'},
    {mrn: 'SAG-106664', name: 'Walter Brennan', age: 79, sex: 'M', bed: '4C-08', doctor: 'achterberg', admitted: 20, diagnosis: 'COPD exacerbation', news: 4, status: 'observation'},
    {mrn: 'SAG-331409', name: 'Leilani Kahale', age: 33, sex: 'F', bed: '2M-11', doctor: 'castellanos', admitted: 23, diagnosis: 'Pre-eclampsia, 34 weeks', news: 3, status: 'observation'},
    {mrn: 'SAG-345241', name: 'Arjun Mehta', age: 62, sex: 'M', bed: '3A-15', doctor: 'okafor', admitted: 22, diagnosis: 'Atrial fibrillation, fast rate', news: 2, status: 'stable'},
    {mrn: 'SAG-160604', name: 'Grete Johansson', age: 88, sex: 'F', bed: '2B-17', doctor: 'duarte', admitted: 17, diagnosis: 'Delirium secondary to UTI', news: 2, status: 'stable'},
    {mrn: 'SAG-114769', name: 'Mateo Silva', age: 24, sex: 'M', bed: '5C-10', doctor: 'wierzbicki', admitted: 19, diagnosis: 'Tibial plateau fracture', news: 0, status: 'ready'},
    {mrn: 'SAG-371001', name: 'Olufemi Adeyemi', age: 57, sex: 'M', bed: '5A-03', doctor: 'solberg', admitted: 21, diagnosis: 'Small bowel obstruction', news: 3, status: 'observation'},
    {mrn: 'SAG-188421', name: 'Clara Whitfield', age: 49, sex: 'F', bed: '6A-02', doctor: 'balogun', admitted: 23, diagnosis: 'Chemotherapy, cycle 3', news: 0, status: 'stable'},
    {mrn: 'SAG-357587', name: 'Dmitri Volkov', age: 66, sex: 'M', bed: 'ICU-06', doctor: 'fraser', admitted: 22, diagnosis: 'Post-CABG ventilation', news: 7, status: 'critical'},
    {mrn: 'SAG-332892', name: 'Hana Suzuki', age: 5, sex: 'F', bed: '7A-12', doctor: 'haddad', admitted: 22, diagnosis: 'Gastroenteritis, dehydration', news: 0, status: 'ready'},
    {mrn: 'SAG-259698', name: "Patrick O'Dwyer", age: 70, sex: 'M', bed: '4B-31', doctor: 'duarte', admitted: 20, diagnosis: 'Cellulitis, left leg', news: 1, status: 'stable'},
    {mrn: 'SAG-362017', name: 'Sunita Chaudhary', age: 39, sex: 'F', bed: '4C-19', doctor: 'achterberg', admitted: 22, diagnosis: 'Pulmonary embolism', news: 3, status: 'observation'},
    {mrn: 'SAG-144626', name: 'Frederick Lam', age: 81, sex: 'M', bed: '3A-20', doctor: 'okafor', admitted: 21, diagnosis: 'Complete heart block, awaiting pacemaker', news: 2, status: 'observation'},
    {mrn: 'SAG-233121', name: 'Yasmin Farouk', age: 27, sex: 'F', bed: '5A-18', doctor: 'solberg', admitted: 22, diagnosis: 'Appendicectomy', news: 1, status: 'ready'},
    {mrn: 'SAG-182680', name: 'Bernard Achebe', age: 73, sex: 'M', bed: '6B-04', doctor: 'zhou', admitted: 19, diagnosis: 'Intracerebral haemorrhage', news: 5, status: 'critical'},
    {mrn: 'SAG-271374', name: 'Lucia Romano', age: 64, sex: 'F', bed: '4B-07', doctor: 'raman', admitted: 21, diagnosis: 'Hyperosmolar hyperglycaemic state', news: 4, status: 'observation'},
    {mrn: 'SAG-260095', name: 'George Whitlock', age: 55, sex: 'M', bed: 'CCU-06', doctor: 'okafor', admitted: 23, diagnosis: 'Unstable angina', news: 2, status: 'stable'},
    {mrn: 'SAG-139057', name: 'Freya Lindgren', age: 31, sex: 'F', bed: '2M-04', doctor: 'castellanos', admitted: 23, diagnosis: 'Postpartum haemorrhage', news: 1, status: 'stable'},
    {mrn: 'SAG-384209', name: 'Samir Haddou', age: 47, sex: 'M', bed: '5C-16', doctor: 'wierzbicki', admitted: 23, diagnosis: 'Lumbar discectomy', news: 2, status: 'postop'},
    {mrn: 'SAG-292412', name: 'Agnes Whitaker', age: 91, sex: 'F', bed: '2B-09', doctor: 'duarte', admitted: 18, diagnosis: 'Fall with rib fractures', news: 3, status: 'observation'},
    {mrn: 'SAG-117437', name: 'Idris Bello', age: 12, sex: 'M', bed: '7A-08', doctor: 'haddad', admitted: 21, diagnosis: 'New type 1 diabetes', news: 1, status: 'stable'},
    {mrn: 'SAG-212055', name: 'Margot Dubois', age: 68, sex: 'F', bed: '6A-19', doctor: 'balogun', admitted: 20, diagnosis: 'Hypercalcaemia of malignancy', news: 2, status: 'observation'},
    {mrn: 'SAG-265763', name: 'Viktor Hansen', age: 60, sex: 'M', bed: 'AMU-05', doctor: 'duarte', admitted: 24, diagnosis: 'Chest pain, ACS ruled out', news: 1, status: 'stable'},
]