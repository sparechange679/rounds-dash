import {useState} from 'react'
import {Chip, type ChipKind, News, Tag} from "@/components/ui/Chip.tsx";
import {Pill, type PillTone} from "@/components/ui/Pill.tsx";
import {useAnnounce} from "@/hooks/useAnnounce.ts";
import {PageHeader} from "@/components/ui/PageHeader.tsx";
import {Delta, Kpi} from "@/components/ui/Kpi.tsx";
import {Meter} from "@/components/ui/Meter.tsx";
import {CountBadge, Panel, PanelBody, PanelHead, PanelMeta} from "@/components/ui/Panel.tsx";
import {Button, ButtonLink} from "@/components/ui/Button.tsx";
import {Icon} from "@/components/icons/Icon.tsx";
import {Segmented} from "@/components/ui/Segmented.tsx";
import {Checkbox, Field, Input, Select, Switch} from "@/components/ui/Form.tsx";
import {DataTable, Pager, SortHeader} from "@/components/ui/DataTable.tsx";
import {EmptyState} from "@/components/ui/EmptyState.tsx";
import {Drawer, FormActions} from "@/components/ui/Drawer.tsx";
import {FormDone} from "@/components/ui/FormDone.tsx";
import {Modal, ModalBody, ModalFooter} from "@/components/ui/Modal.tsx";

const chips: ChipKind[] = ['critical', 'observation', 'stable', 'postop', 'ready', 'new']
const pills: PillTone[] = ['consult', 'arrived', 'booked', 'seen', 'noshow', 'active', 'given', 'held', 'prn']

export default function KitPreview() {
    const announce = useAnnounce()
    const [drawer, setDrawer] = useState(false)
    const [modal, setModal] = useState(false)
    const [range, setRange] = useState<'7' | '14'>('14')
    const [type, setType] = useState('Emergency')
    const [page, setPage] = useState(1)
    const [done, setDone] = useState(false)

    return (
        <>
            <PageHeader crumb="Kit" title="UI kit preview" subtitle="Temporary route. Delete in Step 8."/>
            <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    <Kpi label="Admissions today" icon="patients" value="31" footer={<><Delta icon="trendUp">4</Delta> vs. Wednesday</>}/>
                    <Kpi label="ED median wait" icon="clock" tone="coral" alert value="42" unit="min"
                         footer={<><Delta tone="bad">+12 min</Delta> over target</>}>
                        <Meter value={70} target={50} tone="coral" label="42 minutes against a 30 minute target"/>
                    </Kpi>
                </div>

                <Panel>
                    <PanelHead title={<>Buttons and status <CountBadge tone="coral">5</CountBadge></>}
                               subtitle="Chips pair a shape with colour." actions={<PanelMeta>13 wards · 09:42</PanelMeta>}/>
                    <PanelBody className="grid gap-4">
                        <div className="flex flex-wrap gap-2">
                            <Button><Icon name="plus"/> Admit patient</Button>
                            <Button variant="outline"><Icon name="download"/> Export</Button>
                            <Button variant="ghost"><Icon name="reset"/> Reset</Button>
                            <Button size="sm" variant="outline">Small</Button>
                            <Button size="xs" variant="outline">Acknowledge</Button>
                            <ButtonLink to="/beds" variant="outline">Link button</ButtonLink>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {chips.map((k) => <Chip key={k} kind={k}/>)}
                            <Tag>Full code</Tag><Tag tone="amber">Falls risk</Tag>
                            <News score={3}/><News score={6}/><News score={8}/>
                        </div>
                        <div className="flex flex-wrap gap-2">{pills.map((t) => <Pill key={t} tone={t}/>)}</div>
                        <div className="flex flex-wrap items-center gap-4">
                            <Segmented label="Date range" value={range} onChange={setRange}
                                       options={[{value: '7', label: '7 days'}, {value: '14', label: '14 days'}]}/>
                            <Segmented mode="radio" label="Admission type" value={type} onChange={setType}
                                       options={['Emergency', 'Elective', 'Transfer'].map((v) => ({value: v, label: v}))}/>
                            <Switch id="k-switch" label="Abnormal only"/>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button onClick={() => setDrawer(true)}>Open drawer</Button>
                            <Button variant="outline" onClick={() => setModal(true)}>Open modal</Button>
                            <Button variant="outline" onClick={() => announce('Bed 3A-11 marked clean and ready')}>Announce</Button>
                        </div>
                    </PanelBody>
                </Panel>

                <Panel>
                    <PanelHead title="Table"/>
                    <DataTable caption="Demo table">
                        <thead>
                        <tr>
                            <SortHeader label="Patient" sort="ascending" onSort={() => {}}/>
                            <SortHeader label="NEWS2" sort="none" onSort={() => {}}/>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="is-critical"><td>Tobias Engel</td><td><News score={8}/></td><td><Chip kind="critical"/></td></tr>
                        <tr><td>Marisol Ventura</td><td><News score={3}/></td><td><Chip kind="observation"/></td></tr>
                        </tbody>
                    </DataTable>
                    <div className="flex justify-between border-t border-line px-[18px] py-3"><span className="text-[13px] text-muted">Page {page} of 3</span><Pager page={page} pages={3} onChange={setPage}/></div>
                    <EmptyState>No patients match these filters.</EmptyState>
                </Panel>
            </div>

            <Drawer open={drawer} onClose={() => { setDrawer(false); setDone(false) }} kicker="New admission" title="Admit patient">
                {done ? (
                    <FormDone title="Patient admitted" actions={<Button onClick={() => { setDrawer(false); setDone(false) }}>Done</Button>}>
                        Demo patient admitted.
                    </FormDone>
                ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="grid gap-3.5">
                        <Field label="First name" htmlFor="k-first"><Input id="k-first" required/></Field>
                        <Field label="Ward" htmlFor="k-ward" error="Choose a ward."><Select id="k-ward" invalid><option>Select ward</option></Select></Field>
                        <Checkbox id="k-id" boxed label="Identity checked against two identifiers"/>
                        <FormActions>
                            <Button variant="outline" onClick={() => setDrawer(false)}>Cancel</Button>
                            <Button type="submit"><Icon name="check"/> Admit patient</Button>
                        </FormActions>
                    </form>
                )}
            </Drawer>

            <Modal open={modal} onClose={() => setModal(false)} kicker="Bed management" title="Assign bed">
                <ModalBody><p>Modal body. Press Esc or click the backdrop to close.</p></ModalBody>
                <ModalFooter><Button variant="outline" onClick={() => setModal(false)}>Cancel</Button><Button>Reserve bed</Button></ModalFooter>
            </Modal>
        </>
    )
}