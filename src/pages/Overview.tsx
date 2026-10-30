import {PageHeader} from '@/components/ui/PageHeader.tsx'
import {ButtonLink} from '@/components/ui/Button.tsx'
import {Panel, PanelBody, PanelHead} from '@/components/ui/Panel.tsx'
import {EmptyState} from '@/components/ui/EmptyState.tsx'
import {Icon} from '@/components/icons/Icon.tsx'
import {KpiRow} from '@/components/overview/KpiRow.tsx'
import {AlertsPanel} from '@/components/overview/AlertsPanel.tsx'
import {EdPanel} from '@/components/overview/EdPanel.tsx'
import {OpdPreview} from '@/components/overview/OpdPreview.tsx'
import {StaffOnDuty} from '@/components/overview/StaffOnDuty.tsx'

export default function Overview() {
    return (
        <>
            <PageHeader
                crumb="Overview"
                title="Hospital overview"
                subtitle="Thursday 24 September · Day shift 07:00–19:00 · Bed meeting at 10:00, Operations Centre"
                actions={
                    <>
                        <ButtonLink to="/beds" variant="outline" className="max-sm:flex-1">
                            <Icon name="bed"/> Bed board
                        </ButtonLink>
                        <ButtonLink to="/patients#admit" className="max-sm:flex-1">
                            <Icon name="plus"/> Admit patient
                        </ButtonLink>
                    </>
                }
            />

            <div className="grid gap-4">
                <KpiRow/>

                <div className="grid gap-4 xl:grid-cols-12">
                    {/* TEMP: replaced by <WardChartPanel/> in message 2 */}
                    <Panel className="xl:col-span-8">
                        <PanelHead title="Bed occupancy by ward"/>
                        <PanelBody><EmptyState icon="activity">Ward chart comes next.</EmptyState></PanelBody>
                    </Panel>
                    <AlertsPanel className="xl:col-span-4"/>
                </div>

                <div className="grid gap-4 xl:grid-cols-12">
                    {/* TEMP: replaced by <FlowChartPanel/> in message 2 */}
                    <Panel className="xl:col-span-8">
                        <PanelHead title="Patient flow"/>
                        <PanelBody><EmptyState icon="activity">Flow chart comes next.</EmptyState></PanelBody>
                    </Panel>
                    <EdPanel className="xl:col-span-4"/>
                </div>

                <div className="grid gap-4 xl:grid-cols-12">
                    <OpdPreview className="xl:col-span-7"/>
                    <StaffOnDuty className="xl:col-span-5"/>
                </div>
            </div>
        </>
    )
}