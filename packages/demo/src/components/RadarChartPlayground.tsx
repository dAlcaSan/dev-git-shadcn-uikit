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
  Input,
} from '@acronis-platform/shadcn-uikit/react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'
import { getChartColors } from '@/lib/chart-colors'

// Sample data - skills comparison
const sampleData = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 85, fullMark: 150 },
]

export function RadarChartPlayground() {
  const colors = getChartColors(2)

  // Chart settings state
  const [showTooltip, setShowTooltip] = React.useState(true)
  const [showLegend, setShowLegend] = React.useState(true)
  
  // Polar grid settings
  const [showPolarGrid, setShowPolarGrid] = React.useState(true)
  const [gridType, setGridType] = React.useState<'polygon' | 'circle'>('polygon')
  
  // Axis settings
  const [showAngleAxis, setShowAngleAxis] = React.useState(true)
  const [showRadiusAxis, setShowRadiusAxis] = React.useState(false)
  
  // Radar settings
  const [showSeriesA, setShowSeriesA] = React.useState(true)
  const [showSeriesB, setShowSeriesB] = React.useState(true)
  const [fillOpacity, setFillOpacity] = React.useState(0.3)
  const [strokeWidth, setStrokeWidth] = React.useState(2)
  const [showDots, setShowDots] = React.useState(true)

  const config = {
    A: { label: 'Student A', color: colors[0] },
    B: { label: 'Student B', color: colors[1] },
  }

  // Generate code preview
  const generateCode = () => {
    const lines = []
    lines.push(`<ChartContainer config={config} className="h-[400px]">`)
    lines.push(`  <RadarChart data={data}>`)
    
    if (showPolarGrid) {
      lines.push(`    <PolarGrid gridType="${gridType}" />`)
    }
    if (showAngleAxis) {
      lines.push(`    <PolarAngleAxis dataKey="subject" />`)
    }
    if (showRadiusAxis) {
      lines.push(`    <PolarRadiusAxis angle={30} domain={[0, 150]} />`)
    }
    if (showTooltip) {
      lines.push(`    <ChartTooltip content={<ChartTooltipContent />} />`)
    }
    if (showLegend) {
      lines.push(`    <ChartLegend content={<ChartLegendContent />} />`)
    }
    
    if (showSeriesA) {
      lines.push(`    <Radar`)
      lines.push(`      name="Student A"`)
      lines.push(`      dataKey="A"`)
      lines.push(`      stroke={colors[0]}`)
      lines.push(`      fill={colors[0]}`)
      lines.push(`      fillOpacity={${fillOpacity}}`)
      lines.push(`      strokeWidth={${strokeWidth}}`)
      if (showDots) lines.push(`      dot={{ r: 4 }}`)
      lines.push(`    />`)
    }
    if (showSeriesB) {
      lines.push(`    <Radar`)
      lines.push(`      name="Student B"`)
      lines.push(`      dataKey="B"`)
      lines.push(`      stroke={colors[1]}`)
      lines.push(`      fill={colors[1]}`)
      lines.push(`      fillOpacity={${fillOpacity}}`)
      lines.push(`      strokeWidth={${strokeWidth}}`)
      if (showDots) lines.push(`      dot={{ r: 4 }}`)
      lines.push(`    />`)
    }
    
    lines.push(`  </RadarChart>`)
    lines.push(`</ChartContainer>`)
    return lines.join('\n')
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">RadarChart Playground</h2>
        <p className="text-muted-foreground">
          Spider/web charts for comparing multi-dimensional data
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
              <RadarChart data={sampleData}>
                {showPolarGrid && <PolarGrid gridType={gridType} />}
                {showAngleAxis && <PolarAngleAxis dataKey="subject" />}
                {showRadiusAxis && <PolarRadiusAxis angle={30} domain={[0, 150]} />}
                {showTooltip && (
                  <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />
                )}
                {showLegend && (
                  <ChartLegend content={<ChartLegendContent />} />
                )}
                {showSeriesA && (
                  <Radar
                    name="Student A"
                    dataKey="A"
                    stroke={colors[0]}
                    fill={colors[0]}
                    fillOpacity={fillOpacity}
                    strokeWidth={strokeWidth}
                    dot={showDots ? { r: 4 } : false}
                  />
                )}
                {showSeriesB && (
                  <Radar
                    name="Student B"
                    dataKey="B"
                    stroke={colors[1]}
                    fill={colors[1]}
                    fillOpacity={fillOpacity}
                    strokeWidth={strokeWidth}
                    dot={showDots ? { r: 4 } : false}
                  />
                )}
              </RadarChart>
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
            <Tabs defaultValue="radar" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="radar">Radar</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
                <TabsTrigger value="grid">Grid</TabsTrigger>
              </TabsList>

              <TabsContent value="radar" className="space-y-4 pt-4">
                {/* Fill Opacity */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Fill Opacity</Label>
                      <p className="text-xs text-muted-foreground">0 = outline only</p>
                    </div>
                    <Input
                      type="number"
                      value={fillOpacity}
                      onChange={(e) => setFillOpacity(Number(e.target.value) || 0)}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                <Separator />

                {/* Stroke Width */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Stroke Width</Label>
                    <p className="text-xs text-muted-foreground">Border thickness</p>
                  </div>
                  <Input
                    type="number"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value) || 1)}
                    min={1}
                    max={6}
                    className="w-20 h-8"
                  />
                </div>

                <Separator />

                {/* Show Dots */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Dots</Label>
                    <p className="text-xs text-muted-foreground">Data point markers</p>
                  </div>
                  <Switch checked={showDots} onCheckedChange={setShowDots} />
                </div>

                <Separator />

                {/* Tooltip */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Show Tooltip</Label>
                  <Switch checked={showTooltip} onCheckedChange={setShowTooltip} />
                </div>

                <Separator />

                {/* Legend */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Show Legend</Label>
                  <Switch checked={showLegend} onCheckedChange={setShowLegend} />
                </div>
              </TabsContent>

              <TabsContent value="series" className="space-y-4 pt-4">
                {/* Series A */}
                <div className="space-y-2 rounded-lg border p-3" style={{ borderLeftColor: colors[0], borderLeftWidth: 4 }}>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Student A</Label>
                    <Switch checked={showSeriesA} onCheckedChange={setShowSeriesA} />
                  </div>
                </div>

                {/* Series B */}
                <div className="space-y-2 rounded-lg border p-3" style={{ borderLeftColor: colors[1], borderLeftWidth: 4 }}>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Student B</Label>
                    <Switch checked={showSeriesB} onCheckedChange={setShowSeriesB} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Dimensions</p>
                  {sampleData.map((item) => (
                    <div key={item.subject} className="flex items-center justify-between text-sm">
                      <span>{item.subject}</span>
                      <span className="text-muted-foreground">max: {item.fullMark}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="grid" className="space-y-4 pt-4">
                {/* Polar Grid */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Polar Grid</Label>
                    <p className="text-xs text-muted-foreground">{'<PolarGrid />'}</p>
                  </div>
                  <Switch checked={showPolarGrid} onCheckedChange={setShowPolarGrid} />
                </div>

                {showPolarGrid && (
                  <div className="space-y-2 pl-4">
                    <Label className="text-sm">Grid Type</Label>
                    <div className="flex gap-2">
                      <button
                        className={`px-3 py-1 text-sm rounded ${gridType === 'polygon' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                        onClick={() => setGridType('polygon')}
                      >
                        Polygon
                      </button>
                      <button
                        className={`px-3 py-1 text-sm rounded ${gridType === 'circle' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                        onClick={() => setGridType('circle')}
                      >
                        Circle
                      </button>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Angle Axis */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Angle Axis</Label>
                    <p className="text-xs text-muted-foreground">Category labels around edge</p>
                  </div>
                  <Switch checked={showAngleAxis} onCheckedChange={setShowAngleAxis} />
                </div>

                <Separator />

                {/* Radius Axis */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Radius Axis</Label>
                    <p className="text-xs text-muted-foreground">Value scale line</p>
                  </div>
                  <Switch checked={showRadiusAxis} onCheckedChange={setShowRadiusAxis} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Code Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Code</CardTitle>
          <CardDescription>Copy this code to use your current configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
            <code>{generateCode()}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Documentation Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>📊 Data Format</CardTitle>
            <CardDescription>Required data structure for RadarChart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`// Categories with multiple value fields
const data = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 85, fullMark: 150 },
]`}</code>
            </pre>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Category field</strong> - Labels around the edge (subject)</li>
                <li><strong>Value fields</strong> - One per series (A, B, etc.)</li>
                <li><strong>5-8 categories</strong> - Ideal number for readability</li>
                <li><strong>Same scale</strong> - All values should be comparable</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⚙️ Configurable Properties</CardTitle>
            <CardDescription>What you can customize</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Radar Component</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">fillOpacity</code> - Area transparency (0-1)</li>
                <li><code className="text-xs">strokeWidth</code> - Border line thickness</li>
                <li><code className="text-xs">dot</code> - Show data points</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Polar Elements</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">PolarGrid</code> - gridType: polygon or circle</li>
                <li><code className="text-xs">PolarAngleAxis</code> - Category labels around edge</li>
                <li><code className="text-xs">PolarRadiusAxis</code> - Value scale (optional)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🚫 Limitations</CardTitle>
            <CardDescription>What RadarChart cannot do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Max 3-4 series</strong> - More causes overlap/confusion</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Poor for precise values</strong> - Hard to read exact numbers</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Area distortion</strong> - Outer categories appear larger</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No negative values</strong> - Doesn&apos;t handle values below 0</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Category order matters</strong> - Affects shape perception</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>✅ Best Practices & Use Cases</CardTitle>
            <CardDescription>When and how to use RadarChart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Ideal For:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Skill/competency comparisons</li>
                <li>Product feature comparisons</li>
                <li>Performance metrics (balanced scorecard)</li>
                <li>Survey results across dimensions</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Avoid When:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Precise comparisons needed → Use BarChart</li>
                <li>Time series data → Use LineChart</li>
                <li>Many categories (10+) → Use BarChart</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Tips:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Use fillOpacity 0.3-0.5 for overlapping series</li>
                <li>Order categories logically (not alphabetically)</li>
                <li>Include reference (e.g., &quot;ideal&quot; or &quot;average&quot;) as dotted series</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
