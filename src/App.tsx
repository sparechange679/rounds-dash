import {Route, Routes} from 'react-router-dom'
import KitPreview from "@/pages/KitPreview.tsx";
import Overview from "@/pages/Overview.tsx";
import Login from "@/pages/Login.tsx";
import {PageHeader} from "@/components/ui/PageHeader.tsx";
import {AppShell} from "@/components/layout/AppShell.tsx";

const stub = (crumb: string, title: string, subtitle: string) => (
    <PageHeader crumb={crumb} title={title} subtitle={subtitle}/>
)

export default function App() {
    return (
        <Routes>
            <Route element={<AppShell/>}>
                <Route index element={<Overview/>}/>
                <Route path="patients"
                       element={stub('Inpatients', 'Inpatients', '286 patients admitted across 13 wards · 5 critical · 3 ready for discharge')}/>
                <Route path="patient" element={stub('Patient record', 'Marisol Ventura', 'Ward 3A · Bed 07')}/>
                <Route path="appointments"
                       element={stub('OPD appointments', 'OPD appointments', 'Outpatient clinics, block B level 1 · 30-minute slots')}/>
                <Route path="beds"
                       element={stub('Beds & wards', 'Beds & wards', 'Live bed state for 340 beds in 13 wards')}/>
                <Route path="staff"
                       element={stub('Staff roster', 'Staff roster', 'Doctors and nurses · week of 21–27 September')}/>
                <Route path="kit" element={<KitPreview/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}