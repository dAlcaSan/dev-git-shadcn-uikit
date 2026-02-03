import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  Label,
  Switch,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@acronis-platform/shadcn-uikit/react'
import {
  FunnelChart,
  Funnel,
  Cell,
  LabelList,
} from 'recharts'
import { getChartColors } from '@/lib/chart-colors'

// Sample funnel data - typical sales/conversion funnel
const sampleData = [
  { name: 'Visitors', value: 5000, fill: '' },
  { name: 'Leads', value: 3500, fill: '' },
  { name: 'Qualified', value: 2000, fill: '' },
  { name: 'Proposals', value: 1200, fill: '' },
  { name: 'Closed', value: 600, fill: '' },
]

const labelPositions = [
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
  { value: 'inside', label: 'Inside' },
  { value: 'outside', label: 'Outside' },
]

export function FunnelChartPlayground() {
  const colors = getChartColors(5)
  
  // Add colors to data
  const dataWithColors = sampleData.map((item, index) => ({
    ...item,
    fill: colors[index],
  }))

  // Chart settings state
  const [showTooltip, setShowTooltip] = React.useState(true)
  const [showLegend, setShowLegend] = React.useState(true)
  const [showLabels, setShowLabels] = React.useState(true)
  const [labelPosition, setLabelPosition] = React.useState<'right' | 'left' | 'inside' | 'outside'>('right')
  const [isAnimationActive, setIsAnimationActive] = React.useState(true)
  const [reversed, setReversed] = React.useState(false)

  const config = {
    visitors: { label: 'Visitors', color: colors[0] },
    leads: { label: 'Leads', color: colors[1] },
    qualified: { label: 'Qualified', color: colors[2] },
    proposals: { label: 'Proposals', color: colors[3] },
    closed: { label: 'Closed', color: colors[4] },
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">FunnelChart Playground</h2>
        <p className="text-muted-foreground">
          Visualize stages in a process - great for sales pipelines, conversion rates, and user journeys
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Chart Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Chart updates as you change settings</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={config} className="h-[400px] w-full">
              <FunnelChart>
                <Funnel
                  dataKey="value"
                  data={dataWithColors}
                  isAnimationActive={isAnimationActive}
                  reversed={reversed}
                >
                  {showLabels && (
                    <LabelList
                      position={labelPosition as 'right' | 'left' | 'inside' | 'outside'}
                      dataKey="name"
                      fill="#000"
                      stroke="none"
                    />
                  )}
                  {dataWithColors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Funnel>
                {showTooltip && (
                  <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />
                )}
                {showLegend && (
                  <ChartLegend content={<ChartLegendContent />} />
                )}
              </FunnelChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Settings Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Toggle to see what each setting does</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="display" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="display">Display</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>

              <TabsContent value="display" className="space-y-4 pt-4">
                {/* Reversed */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Reversed</Label>
                    <p className="text-xs text-muted-foreground">Flip funnel direction</p>
                  </div>
                  <Switch checked={reversed} onCheckedChange={setReversed} />
                </div>

                <Separator />

                {/* Show Labels */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Labels</Label>
                    <p className="text-xs text-muted-foreground">Stage names</p>
                  </div>
                  <Switch checked={showLabels} onCheckedChange={setShowLabels} />
                </div>

                {/* Label Position */}
                {showLabels && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Label Position</Label>
                    <Select value={labelPosition} onValueChange={(v) => setLabelPosition(v as 'right' | 'left' | 'inside' | 'outside')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {labelPositions.map((pos) => (
                          <SelectItem key={pos.value} value={pos.value}>
                            {pos.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Separator />

                {/* Animation */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Animation</Label>
                    <p className="text-xs text-muted-foreground">Animate on load</p>
                  </div>
                  <Switch checked={isAnimationActive} onCheckedChange={setIsAnimationActive} />
                </div>

                <Separator />

                {/* Tooltip */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Tooltip</Label>
                    <p className="text-xs text-muted-foreground">Hover for details</p>
                  </div>
                  <Switch checked={showTooltip} onCheckedChange={setShowTooltip} />
                </div>

                <Separator />

                {/* Legend */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Legend</Label>
                    <p className="text-xs text-muted-foreground">Stage color legend</p>
                  </div>
                  <Switch checked={showLegend} onCheckedChange={setShowLegend} />
                </div>
              </TabsContent>

              <TabsContent value="data" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Funnel Stages</p>
                  {dataWithColors.map((item) => (
                    <div 
                      key={item.name} 
                      className="flex items-center justify-between rounded-lg border p-3"
                      style={{ borderLeftColor: item.fill, borderLeftWidth: 4 }}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Documentation Section */}
        <Card>
          <CardHeader>
            <CardTitle>⚙️ Configurable Properties</CardTitle>
            <CardDescription>What you can customize</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Funnel Component</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">dataKey</code> - Field for stage size (&quot;value&quot;)</li>
                <li><code className="text-xs">reversed</code> - Flip to pyramid (smallest at bottom)</li>
                <li><code className="text-xs">isAnimationActive</code> - Enable/disable animation</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Labels</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">LabelList</code> - Show stage names</li>
                <li><code className="text-xs">position</code> - right, left, inside, outside</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Styling</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">Cell</code> - Individual colors per stage</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🚫 Limitations</CardTitle>
            <CardDescription>What FunnelChart cannot do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Max 6-7 stages</strong> - More becomes hard to read</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No branching</strong> - Linear stages only</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No time dimension</strong> - Single snapshot</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Poor for comparison</strong> - Hard to compare two funnels</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No conversion rate display</strong> - Need custom labels</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>✅ Best Practices & Use Cases</CardTitle>
            <CardDescription>When and how to use FunnelChart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Ideal For:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Sales pipeline visualization</li>
                <li>User onboarding drop-off</li>
                <li>Conversion tracking</li>
                <li>Process stage analysis</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Avoid When:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Comparing values → Use BarChart</li>
                <li>Time series → Use LineChart</li>
                <li>Non-sequential process → Use Sankey</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Tips:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Add conversion % between stages manually</li>
                <li>Use consistent colors (traffic light: green→red)</li>
                <li>Show absolute numbers + percentages</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
