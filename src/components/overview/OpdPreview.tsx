import {DataTable} from '@/components/ui/DataTable.tsx'
import {Panel, PanelHead} from '@/components/ui/Panel.tsx'
import {ButtonLink} from '@/components/ui/Button.tsx'
import {PatientCell} from '@/components/ui/PatientCell.tsx'
import {Pill} from '@/components/ui/Pill.tsx'
import {Icon} from '@/components/icons/Icon.tsx'
import {opdPreview, opdSummary as s} from '@/data/opd.ts'

export function OpdPreview({className}: { className?: string }) {
    return (
        <Panel className={className} aria-labelledby="opd-title">
            <PanelHead id="opd-title" title="Today’s OPD appointments"
                       subtitle={`${s.booked} booked across ${s.clinics} clinics · ${s.seen} seen · ${s.consult} in consult · ${s.noshow} no-show`}
                       actions={
                           <ButtonLink to="/appointments" size="sm" variant="outline">
                               Open board <Icon name="arrowRight" className="size-[15px]"/>
                           </ButtonLink>
                       }/>
            <DataTable caption="Next outpatient appointments today">
                <thead>
                <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Patient</th>
                    <th scope="col" className="max-md:hidden">Clinician</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {opdPreview.map((r) => (
                    <tr key={r.mrn}>
                        <td className="font-mono">{r.time}</td>
                        <td><PatientCell name={r.name} mrn={r.mrn} initials={r.initials} tint={r.tint}/></td>
                        <td className="max-md:hidden">
                            {r.clinician}
                            <span className="mt-px block text-xs text-muted">{r.clinic}</span>
                        </td>
                        <td><Pill tone={r.status}/></td>
                    </tr>
                ))}
                </tbody>
            </DataTable>
        </Panel>
    )
}