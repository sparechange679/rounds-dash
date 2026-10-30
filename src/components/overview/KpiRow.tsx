import {Kpi, Delta} from '@/components/ui/Kpi.tsx'
import {Meter} from '@/components/ui/Meter.tsx'
import {Sparkline} from '@/components/charts/Sparkline.tsx'
import {flow} from '@/data/flow.ts'
import {totalBeds, totalOccupied} from '@/data/wards.ts'

const occupancy = (totalOccupied / totalBeds) * 100
const BEDS_READY = 36
const discharged = 9
const dischargesPlanned = 38
const edWait = 42
const edTarget = 30
const edScale = 60 // minutes shown as a full meter

export function KpiRow() {
    return (
        <section aria-label="Today at a glance" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            <Kpi label="Admissions today" icon="patients" value="31"
                 spark={<Sparkline values={flow.slice(-7).map((d) => d.admissions)}/>}
                 footer={<><Delta icon="trendUp">4</Delta> vs. Wednesday at 09:42</>}/>

            <Kpi label="Discharges today" icon="logout" tone="teal" value={discharged}
                 unit={`/ ${dischargesPlanned} planned`}
                 footer="Discharge lounge: 4 waiting for transport">
                <Meter value={(discharged / dischargesPlanned) * 100}
                       label={`${discharged} of ${dischargesPlanned} planned discharges complete`}/>
            </Kpi>

            <Kpi label="ED median wait" icon="clock" tone="coral" alert value={edWait} unit="min"
                 footer={<><Delta tone="bad">+{edWait - edTarget} min</Delta> over the {edTarget} min target</>}>
                <Meter value={(edWait / edScale) * 100} target={(edTarget / edScale) * 100} tone="coral"
                       label={`${edWait} minutes against a ${edTarget} minute target`}/>
            </Kpi>

            <Kpi label="Bed occupancy" icon="bed" tone="amber" value={occupancy.toFixed(1)} unit="%"
                 footer={`${totalOccupied} of ${totalBeds} beds · ${BEDS_READY} ready now`}>
                <Meter value={occupancy} target={85}
                       label={`${occupancy.toFixed(1)} percent occupied against an 85 percent limit`}/>
            </Kpi>
        </section>
    )
}