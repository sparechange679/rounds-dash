import {useRef, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {PageHeader} from '@/components/ui/PageHeader.tsx'
import {Button} from '@/components/ui/Button.tsx'
import {Panel, PanelFoot, PanelHead} from '@/components/ui/Panel.tsx'
import {Input, Select, Toolbar, ToolbarField} from '@/components/ui/Form.tsx'
import {DataTable, Pager, SortHeader, type SortDir} from '@/components/ui/DataTable.tsx'
import {Chip, News} from '@/components/ui/Chip.tsx'
import {PatientCell} from '@/components/ui/PatientCell.tsx'
import {EmptyState} from '@/components/ui/EmptyState.tsx'
import {Icon} from '@/components/icons/Icon.tsx'
import {useAnnounce} from '@/hooks/useAnnounce.ts'
import {downloadCsv} from '@/lib/csv.ts'
import {initialsOf, tintOf} from '@/lib/names.ts'
import {cn} from '@/lib/cn.ts'
import {wards, totalOccupied} from '@/data/wards.ts'
import {
    doctors, patients as seed, searchText, STATUS_LABEL, STATUS_RANK, STATUSES, TODAY_DAY, wardName, wardOf,
    type Patient, type PatientStatus,
} from '@/data/patients.ts'

const PER_PAGE = 10

type SortKey = 'name' | 'age' | 'bed' | 'doctor' | 'admitted' | 'news' | 'status'
type Sort = { key: SortKey; dir: 1 | -1 } | null

const lastFirst = (name: string) => {
    const i = name.lastIndexOf(' ')
    return i < 0 ? name : `${name.slice(i + 1)} ${name.slice(0, i)}`
}

const sortValue: Record<SortKey, (p: Patient) => string | number> = {
    name: (p) => lastFirst(p.name),
    age: (p) => p.age,
    bed: (p) => p.bed,
    doctor: (p) => doctors[p.doctor].short.split(' ').at(-1) ?? '',
    admitted: (p) => p.admitted,
    news: (p) => p.news,
    status: (p) => STATUS_RANK[p.status],
}

const collator = new Intl.Collator(undefined, {numeric: true})
const compare = (a: string | number, b: string | number) =>
    typeof a === 'number' && typeof b === 'number' ? a - b : collator.compare(String(a), String(b))

const sub = 'mt-px block text-xs text-muted'

export default function Patients() {
    const announce = useAnnounce()
    const panelRef = useRef<HTMLElement>(null)
    const [params, setParams] = useSearchParams()
    const [patients] = useState(seed)

    const urlQ = params.get('q') ?? ''
    const [q, setQ] = useState(urlQ)
    const [seenUrlQ, setSeenUrlQ] = useState(urlQ)
    const [ward, setWard] = useState('')
    const [status, setStatus] = useState('')
    const [doctor, setDoctor] = useState('')
    const [sort, setSort] = useState<Sort>(null)
    const [page, setPage] = useState(1)

    // The top bar search navigates to /patients?q=...; follow it when the URL term changes.
    if (urlQ !== seenUrlQ) {
        setSeenUrlQ(urlQ)
        setQ(urlQ)
        setPage(1)
    }

    const term = q.trim().toLowerCase()
    const filtered = patients.filter(
        (p) =>
            (!term || searchText(p).includes(term)) &&
            (!ward || wardOf(p.bed) === ward) &&
            (!status || p.status === status) &&
            (!doctor || p.doctor === doctor),
    )
    const rows = sort
        ? filtered.toSorted((a, b) => compare(sortValue[sort.key](a), sortValue[sort.key](b)) * sort.dir)
        : filtered

    const total = rows.length
    const pages = Math.max(1, Math.ceil(total / PER_PAGE))
    const current = Math.min(page, pages)
    const start = (current - 1) * PER_PAGE
    const pageRows = rows.slice(start, start + PER_PAGE)

    const counts = Object.fromEntries(
        STATUSES.map((s) => [s, patients.filter((p) => p.status === s).length]),
    ) as Record<PatientStatus, number>

    const filterBy = (set: (v: string) => void) => (e: { target: { value: string } }) => {
        set(e.target.value)
        setPage(1)
    }

    const toggleSort = (key: SortKey) => {
        setSort((s) => ({key, dir: s?.key === key && s.dir === 1 ? -1 : 1}))
        setPage(1)
    }
    const sortOf = (key: SortKey): SortDir =>
        sort?.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'

    const reset = () => {
        setQ('')
        setWard('')
        setStatus('')
        setDoctor('')
        setPage(1)
        if (params.has('q')) setParams({}, {replace: true})
    }

    const goTo = (p: number) => {
        setPage(p)
        const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        panelRef.current?.scrollIntoView({block: 'start', behavior: calm ? 'auto' : 'smooth'})
    }

    const exportCsv = () => {
        downloadCsv('inpatients-24-sep.csv', [
            ['Patient', 'MRN', 'Age and sex', 'Bed', 'Ward', 'Attending', 'Admitted', 'Diagnosis', 'NEWS2', 'Status'],
            ...rows.map((p) => [
                p.name, p.mrn, `${p.age} ${p.sex}`, p.bed, wardName(wardOf(p.bed)),
                doctors[p.doctor].short, `${p.admitted} Sep`, p.diagnosis, p.news, STATUS_LABEL[p.status],
            ]),
        ])
        announce(`Exported ${rows.length} patients as CSV`)
    }

    const countText = total
        ? `Showing ${start + 1}–${Math.min(start + PER_PAGE, total)} of ${total} patients${total < patients.length ? ' (filtered)' : ''}`
        : 'No matching patients'

    return (
        <>
            <PageHeader
                crumb="Inpatients"
                title="Inpatients"
                subtitle={`${totalOccupied} patients admitted across ${wards.length} wards · ${counts.critical} critical · ${counts.ready} ready for discharge`}
                actions={
                    <Button variant="outline" className="max-sm:flex-1" onClick={exportCsv}>
                        <Icon name="download"/> Export list
                    </Button>
                }
            />

            <Panel ref={panelRef} aria-labelledby="list-title">
                <PanelHead
                    id="list-title"
                    title="Admitted patients"
                    actions={
                        <ul className="flex flex-wrap gap-x-3.5 gap-y-1.5">
                            {STATUSES.map((s) => (
                                <li key={s} className="inline-flex items-center gap-1.5">
                                    <Chip kind={s}/>
                                    <strong className="font-mono text-[13px] font-semibold text-ink">{counts[s]}</strong>
                                </li>
                            ))}
                        </ul>
                    }
                />

                <Toolbar role="search" aria-label="Filter patients" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative min-w-0 flex-[1_1_200px] max-w-[320px] max-sm:max-w-none max-sm:basis-full">
                        <label htmlFor="pt-q" className="sr-only">Search patients</label>
                        <Icon name="search" className="pointer-events-none absolute left-[11px] top-1/2 -translate-y-1/2 text-muted"/>
                        <Input id="pt-q" type="search" value={q} onChange={filterBy(setQ)} autoComplete="off"
                               placeholder="Name, MRN, bed or diagnosis" className="pl-9"/>
                    </div>

                    <ToolbarField label="Ward" htmlFor="f-ward" className="max-sm:min-w-0 max-sm:flex-1 max-sm:basis-[calc(50%-6px)]">
                        <Select id="f-ward" value={ward} onChange={filterBy(setWard)}>
                            <option value="">All wards</option>
                            {wards.map((w) => <option key={w.code} value={w.code}>{w.code} {w.name}</option>)}
                        </Select>
                    </ToolbarField>

                    <ToolbarField label="Status" htmlFor="f-status" className="max-sm:min-w-0 max-sm:flex-1 max-sm:basis-[calc(50%-6px)]">
                        <Select id="f-status" value={status} onChange={filterBy(setStatus)}>
                            <option value="">Any status</option>
                            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                        </Select>
                    </ToolbarField>

                    <ToolbarField label="Attending" htmlFor="f-doctor" className="max-sm:min-w-0 max-sm:flex-1 max-sm:basis-[calc(50%-6px)]">
                        <Select id="f-doctor" value={doctor} onChange={filterBy(setDoctor)}>
                            <option value="">All doctors</option>
                            {Object.entries(doctors).map(([key, d]) => <option key={key} value={key}>{d.short}</option>)}
                        </Select>
                    </ToolbarField>

                    <Button variant="ghost" className="sm:ml-auto" onClick={reset}>
                        <Icon name="reset" className="size-[15px]"/> Reset
                    </Button>
                </Toolbar>

                <DataTable caption="Admitted patients. Column headers with buttons can be sorted." className="patients-table">
                    <thead>
                    <tr>
                        <SortHeader label="Patient" sort={sortOf('name')} onSort={() => toggleSort('name')}/>
                        <SortHeader label="Age" sort={sortOf('age')} onSort={() => toggleSort('age')}/>
                        <SortHeader label="Bed" sort={sortOf('bed')} onSort={() => toggleSort('bed')}/>
                        <SortHeader label="Attending" sort={sortOf('doctor')} onSort={() => toggleSort('doctor')} className="max-lg:hidden"/>
                        <SortHeader label="Admitted" sort={sortOf('admitted')} onSort={() => toggleSort('admitted')} className="max-md:hidden"/>
                        <th scope="col" className="max-xl:hidden">Diagnosis</th>
                        <SortHeader label="NEWS2" sort={sortOf('news')} onSort={() => toggleSort('news')}/>
                        <SortHeader label="Status" sort={sortOf('status')} onSort={() => toggleSort('status')}/>
                    </tr>
                    </thead>
                    <tbody>
                    {pageRows.map((p) => (
                        <tr key={p.mrn} className={cn(p.status === 'critical' && 'is-critical', p.isNew && 'is-new')}>
                            <td data-col="patient">
                                <PatientCell name={p.name} mrn={p.mrn} initials={initialsOf(p.name)} tint={tintOf(p.name)} to="/patient"/>
                            </td>
                            <td data-col="age" className="font-mono">{p.age} {p.sex}</td>
                            <td data-col="bed">
                                <span className="flex flex-col max-md:flex-row max-md:items-baseline max-md:gap-1.5">
                                    <span className="whitespace-nowrap font-mono font-semibold text-ink">{p.bed}</span>
                                    <span className={cn(sub, 'max-md:mt-0')}>{wardName(wardOf(p.bed))}</span>
                                </span>
                            </td>
                            <td data-col="doctor" className="max-lg:hidden">{doctors[p.doctor].short}</td>
                            <td data-col="admitted" className="max-md:hidden">
                                <span className="font-mono">{p.admitted} Sep</span>
                                <span className="mt-px flex items-center gap-1.5 text-xs text-muted">
                                    Day {TODAY_DAY - p.admitted + 1}
                                    {p.isNew && <Chip kind="new"/>}
                                </span>
                            </td>
                            <td data-col="dx" className="max-w-[260px] max-xl:hidden">{p.diagnosis}</td>
                            <td data-col="news"><News score={p.news}/></td>
                            <td data-col="status"><Chip kind={p.status}/></td>
                        </tr>
                    ))}
                    </tbody>
                </DataTable>

                {total === 0 && (
                    <EmptyState>
                        <strong className="font-semibold text-ink">No patients match these filters.</strong> Try another ward or clear the search.
                    </EmptyState>
                )}

                <PanelFoot>
                    <p aria-live="polite" className="text-[13px] text-muted">{countText}</p>
                    <Pager page={current} pages={pages} onChange={goTo}/>
                </PanelFoot>
            </Panel>
        </>
    )
}