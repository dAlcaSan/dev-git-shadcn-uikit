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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@acronis-platform/shadcn-uikit/react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
  ReferenceLine,
} from 'recharts'
import { getChartColors } from '@/lib/chart-colors'

// Sample data - height vs weight correlation
const sampleData1 = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 110, y: 280, z: 400 },
  { x: 150, y: 250, z: 280 },
  { x: 170, y: 300, z: 500 },
  { x: 140, y: 410, z: 200 },
]

const sampleData2 = [
  { x: 80, y: 150, z: 200 },
  { x: 100, y: 180, z: 260 },
  { x: 130, y: 220, z: 400 },
  { x: 160, y: 280, z: 280 },
  { x: 190, y: 350, z: 500 },
]

const shapeOptions = [
  { value: 'circle', label: 'Circle' },
  { value: 'cross', label: 'Cross' },
  { value: 'diamond', label: 'Diamond' },
  { value: 'square', label: 'Square' },
  { value: 'star', label: 'Star' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'wye', label: 'Wye' },
]

type ShapeType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye'

export function ScatterChartPlayground() {
  const colors = getChartColors(2)

  // Chart settings state
  const [showGrid, setShowGrid] = React.useState(true)
  const [gridDashed, setGridDashed] = React.useState(true)
  const [showXAxis, setShowXAxis] = React.useState(true)
  const [showYAxis, setShowYAxis] = React.useState(true)
  const [showTooltip, setShowTooltip] = React.useState(true)
  const [showLegend, setShowLegend] = React.useState(true)
  
  // Scatter-specific settings
  const [shape, setShape] = React.useState<ShapeType>('circle')
  const [pointSize, setPointSize] = React.useState(60)
  const [showSecondSeries, setShowSecondSeries] = React.useState(false)
  const [showReferenceLineX, setShowReferenceLineX] = React.useState(false)
  const [showReferenceLineY, setShowReferenceLineY] = React.useState(false)
  const [referenceX, setReferenceX] = React.useState(120)
  const [referenceY, setReferenceY] = React.useState(250)
  
  // Axis settings
  const [xAxisUnit, setXAxisUnit] = React.useState('cm')
  const [yAxisUnit, setYAxisUnit] = React.useState('kg')

  const config = {
    series1: { label: 'Group A', color: colors[0] },
    series2: { label: 'Group B', color: colors[1] },
  }

  // Generate code preview
  const generateCode = () => {
    const lines = []
    lines.push(`<ChartContainer config={config} className="h-[400px]">`)
    lines.push(`  <ScatterChart>`)
    
    if (showGrid) {
      lines.push(`    <CartesianGrid${gridDashed ? ' strokeDasharray="3 3"' : ''} />`)
    }
    if (showXAxis) {
      lines.push(`    <XAxis type="number" dataKey="x" name="height" unit="${xAxisUnit}" />`)
    }
    if (showYAxis) {
      lines.push(`    <YAxis type="number" dataKey="y" name="weight" unit="${yAxisUnit}" />`)
    }
    lines.push(`    <ZAxis type="number" range={[${pointSize}, ${pointSize}]} />`)
    
    if (showTooltip) {
      lines.push(`    <ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: '3 3' }} />`)
    }
    if (showLegend) {
      lines.push(`    <ChartLegend content={<ChartLegendContent />} />`)
    }
    if (showReferenceLineX) {
      lines.push(`    <ReferenceLine x={${referenceX}} stroke="red" strokeDasharray="3 3" />`)
    }
    if (showReferenceLineY) {
      lines.push(`    <ReferenceLine y={${referenceY}} stroke="red" strokeDasharray="3 3" />`)
    }
    
    lines.push(`    <Scatter name="Group A" data={data1} fill={colors[0]} shape="${shape}" />`)
    if (showSecondSeries) {
      lines.push(`    <Scatter name="Group B" data={data2} fill={colors[1]} shape="${shape}" />`)
    }
    
    lines.push(`  </ScatterChart>`)
    lines.push(`</ChartContainer>`)
    return lines.join('\n')
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">ScatterChart Playground</h2>
        <p className="text-muted-foreground">
          Explore ScatterChart settings - correlation between two variables
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
              <ScatterChart>
                {showGrid && (
                  <CartesianGrid 
                    strokeDasharray={gridDashed ? "3 3" : undefined}
                    className="stroke-muted"
                  />
                )}
                {showXAxis && (
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="height" 
                    unit={xAxisUnit}
                    domain={[0, 'dataMax + 20']}
                  />
                )}
                {showYAxis && (
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="weight" 
                    unit={yAxisUnit}
                    domain={[0, 'dataMax + 50']}
                  />
                )}
                <ZAxis type="number" range={[pointSize, pointSize]} />
                {showTooltip && (
                  <ChartTooltip 
                    content={(props) => <ChartTooltipContent {...props} />}
                    cursor={{ strokeDasharray: '3 3' }}
                  />
                )}
                {showLegend && (
                  <ChartLegend content={<ChartLegendContent />} />
                )}
                {showReferenceLineX && (
                  <ReferenceLine x={referenceX} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                )}
                {showReferenceLineY && (
                  <ReferenceLine y={referenceY} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                )}
                <Scatter 
                  name="Group A" 
                  data={sampleData1} 
                  fill={colors[0]}
                  shape={shape}
                />
                {showSecondSeries && (
                  <Scatter 
                    name="Group B" 
                    data={sampleData2} 
                    fill={colors[1]}
                    shape={shape}
                  />
                )}
              </ScatterChart>
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
            <Tabs defaultValue="scatter" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="scatter">Points</TabsTrigger>
                <TabsTrigger value="axes">Axes</TabsTrigger>
                <TabsTrigger value="ref">Reference</TabsTrigger>
              </TabsList>

              <TabsContent value="scatter" className="space-y-4 pt-4">
                {/* Point Shape */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Point Shape</Label>
                  <Select value={shape} onValueChange={(v) => setShape(v as ShapeType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {shapeOptions.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Point Size */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Point Size</Label>
                      <p className="text-xs text-muted-foreground">ZAxis range</p>
                    </div>
                    <Input
                      type="number"
                      value={pointSize}
                      onChange={(e) => setPointSize(Number(e.target.value) || 20)}
                      min={20}
                      max={200}
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                <Separator />

                {/* Second Series */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Second Data Series</Label>
                    <p className="text-xs text-muted-foreground">Compare two groups</p>
                  </div>
                  <Switch checked={showSecondSeries} onCheckedChange={setShowSecondSeries} />
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

              <TabsContent value="axes" className="space-y-4 pt-4">
                {/* Grid */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Grid</Label>
                    <p className="text-xs text-muted-foreground">{'<CartesianGrid />'}</p>
                  </div>
                  <Switch checked={showGrid} onCheckedChange={setShowGrid} />
                </div>

                {showGrid && (
                  <div className="flex items-center justify-between pl-4">
                    <span className="text-sm">Dashed Grid</span>
                    <Switch checked={gridDashed} onCheckedChange={setGridDashed} />
                  </div>
                )}

                <Separator />

                {/* X Axis */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show X Axis</Label>
                    <p className="text-xs text-muted-foreground">type=&quot;number&quot;</p>
                  </div>
                  <Switch checked={showXAxis} onCheckedChange={setShowXAxis} />
                </div>

                {showXAxis && (
                  <div className="flex items-center justify-between pl-4">
                    <span className="text-sm">X Unit</span>
                    <Input
                      type="text"
                      value={xAxisUnit}
                      onChange={(e) => setXAxisUnit(e.target.value)}
                      className="w-20 h-8"
                    />
                  </div>
                )}

                <Separator />

                {/* Y Axis */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Y Axis</Label>
                    <p className="text-xs text-muted-foreground">type=&quot;number&quot;</p>
                  </div>
                  <Switch checked={showYAxis} onCheckedChange={setShowYAxis} />
                </div>

                {showYAxis && (
                  <div className="flex items-center justify-between pl-4">
                    <span className="text-sm">Y Unit</span>
                    <Input
                      type="text"
                      value={yAxisUnit}
                      onChange={(e) => setYAxisUnit(e.target.value)}
                      className="w-20 h-8"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ref" className="space-y-4 pt-4">
                {/* Reference Line X */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Vertical Reference</Label>
                    <p className="text-xs text-muted-foreground">{'<ReferenceLine x={...} />'}</p>
                  </div>
                  <Switch checked={showReferenceLineX} onCheckedChange={setShowReferenceLineX} />
                </div>

                {showReferenceLineX && (
                  <div className="flex items-center justify-between pl-4">
                    <span className="text-sm">X Value</span>
                    <Input
                      type="number"
                      value={referenceX}
                      onChange={(e) => setReferenceX(Number(e.target.value))}
                      className="w-20 h-8"
                    />
                  </div>
                )}

                <Separator />

                {/* Reference Line Y */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Horizontal Reference</Label>
                    <p className="text-xs text-muted-foreground">{'<ReferenceLine y={...} />'}</p>
                  </div>
                  <Switch checked={showReferenceLineY} onCheckedChange={setShowReferenceLineY} />
                </div>

                {showReferenceLineY && (
                  <div className="flex items-center justify-between pl-4">
                    <span className="text-sm">Y Value</span>
                    <Input
                      type="number"
                      value={referenceY}
                      onChange={(e) => setReferenceY(Number(e.target.value))}
                      className="w-20 h-8"
                    />
                  </div>
                )}

                <Separator />

                <p className="text-xs text-muted-foreground">
                  Reference lines are great for showing thresholds, averages, or target values.
                </p>
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
            <CardDescription>Required data structure for ScatterChart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`// Array of { x, y } or { x, y, z } objects
const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 110, y: 280, z: 400 },
]

// Multiple series
const seriesA = [{ x: 10, y: 30 }, ...]
const seriesB = [{ x: 20, y: 50 }, ...]`}</code>
            </pre>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>x, y fields</strong> - Both numeric (not categorical)</li>
                <li><strong>z field (optional)</strong> - Controls point size via ZAxis</li>
                <li><strong>Separate arrays</strong> - Each Scatter has its own data</li>
                <li><strong>No shared X</strong> - Unlike LineChart, points are independent</li>
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
              <p className="font-medium mb-1">Scatter Component</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">shape</code> - circle, square, triangle, diamond, star, wye</li>
                <li><code className="text-xs">fill</code> - Point color</li>
                <li><code className="text-xs">line</code> - Connect points with line</li>
                <li><code className="text-xs">lineType</code> - fitting, joint (connection style)</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Axes (all type=&quot;number&quot;)</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">XAxis/YAxis</code> - domain, tickCount, unit</li>
                <li><code className="text-xs">ZAxis</code> - range for point sizes [minSize, maxSize]</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Reference Elements</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">ReferenceLine</code> - Threshold/target lines</li>
                <li><code className="text-xs">ReferenceArea</code> - Highlight regions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🚫 Limitations</CardTitle>
            <CardDescription>What ScatterChart cannot do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Max ~500 points</strong> - Performance and overlap issues</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No density visualization</strong> - Overlapping points hide data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No built-in regression</strong> - Trend lines need calculation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No jitter</strong> - Overlapping points stack exactly</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Limited bubble labels</strong> - Text on points is tricky</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>✅ Best Practices & Use Cases</CardTitle>
            <CardDescription>When and how to use ScatterChart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Ideal For:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Correlation between two variables</li>
                <li>Outlier detection</li>
                <li>Cluster visualization</li>
                <li>Bubble charts (with ZAxis)</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Avoid When:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Time series → Use LineChart</li>
                <li>Categorical X-axis → Use BarChart</li>
                <li>1000+ points → Use specialized viz library</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Tips:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Use different shapes for multiple series</li>
                <li>Add ReferenceLine for thresholds</li>
                <li>Use ZAxis sparingly - bubbles overlap</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
