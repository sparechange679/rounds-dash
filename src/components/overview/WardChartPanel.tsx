import {Panel, PanelBody, PanelHead, PanelMeta} from '@/components/ui/Panel.tsx'
import {Legend, LegendItem, Swatch} from '@/components/ui/Legend.tsx'
import {wards} from '@/data/wards.ts'
import {WardChart} from "@/components/charts/WardCharts.tsx";

export function WardChartPanel({className}: { className?: string }) {
    return (
        <Panel className={className} aria-labelledby="occ-title">
            <PanelHead id="occ-title" title="Bed occupancy by ward"
                       subtitle="Occupied beds against staffed capacity, highest first. The dashed line marks the 85% safe-occupancy limit."
                       actions={<PanelMeta>{wards.length} wards · 09:42</PanelMeta>}/>
            <PanelBody>
                <WardChart/>
                <Legend className="mt-3">
                    <LegendItem swatch={<Swatch className="bg-chart-1"/>}>Below 85%</LegendItem>
                    <LegendItem swatch={<Swatch className="bg-amber"/>}>85–94%</LegendItem>
                    <LegendItem swatch={<Swatch className="bg-coral"/>}>95% and above</LegendItem>
                    <LegendItem swatch={<Swatch className="bg-surface-3 ring-1 ring-inset ring-line-2"/>}>Empty capacity</LegendItem>
                </Legend>
            </PanelBody>
        </Panel>
    )
}