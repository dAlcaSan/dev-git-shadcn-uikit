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
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { getChartColors } from '@/lib/chart-colors'

// Sample data
const sampleData = [
  { month: 'Jan', sales: 4000, revenue: 2400, profit: 1800 },
  { month: 'Feb', sales: 3000, revenue: 1398, profit: 1200 },
  { month: 'Mar', sales: 2000, revenue: 9800, profit: 2800 },
  { month: 'Apr', sales: 2780, revenue: 3908, profit: 1900 },
  { month: 'May', sales: 1890, revenue: 4800, profit: 2100 },
  { month: 'Jun', sales: 2390, revenue: 3800, profit: 2400 },
  { month: 'Jul', sales: 3490, revenue: 4300, profit: 2600 },
]

const curveTypes = [
  { value: 'linear', label: 'linear' },
  { value: 'monotone', label: 'monotone' },
  { value: 'natural', label: 'natural' },
  { value: 'step', label: 'step' },
]

type CurveType = 'linear' | 'monotone' | 'natural' | 'step'
type ChartType = 'line' | 'bar' | 'area' | 'none'

export function ComposedChartPlayground() {
  const colors = getChartColors(3)

  // Chart settings state
  const [showGrid, setShowGrid] = React.useState(true)
  const [gridDashed, setGridDashed] = React.useState(true)
  const [showXAxis, setShowXAxis] = React.useState(true)
  const [showYAxis, setShowYAxis] = React.useState(true)
  const [showTooltip, setShowTooltip] = React.useState(true)
  const [showLegend, setShowLegend] = React.useState(true)
  
  // Series type settings
  const [salesType, setSalesType] = React.useState<ChartType>('bar')
  const [revenueType, setRevenueType] = React.useState<ChartType>('line')
  const [profitType, setProfitType] = React.useState<ChartType>('area')
  
  // Line settings
  const [curveType, setCurveType] = React.useState<CurveType>('monotone')
  const [strokeWidth, setStrokeWidth] = React.useState(2)
  const [showDots, setShowDots] = React.useState(true)
  
  // Bar settings
  const [barRadius, setBarRadius] = React.useState(4)
  
  // Area settings
  const [fillOpacity, setFillOpacity] = React.useState(0.3)

  const config = {
    sales: { label: 'Sales', color: colors[0] },
    revenue: { label: 'Revenue', color: colors[1] },
    profit: { label: 'Profit', color: colors[2] },
  }

  const renderSeries = (dataKey: string, type: ChartType, color: string) => {
    switch (type) {
      case 'line':
        return (
          <Line
            key={dataKey}
            type={curveType}
            dataKey={dataKey}
            stroke={color}
            strokeWidth={strokeWidth}
            dot={showDots}
          />
        )
      case 'bar':
        return (
          <Bar
            key={dataKey}
            dataKey={dataKey}
            fill={color}
            radius={[barRadius, barRadius, 0, 0]}
          />
        )
      case 'area':
        return (
          <Area
            key={dataKey}
            type={curveType}
            dataKey={dataKey}
            stroke={color}
            fill={color}
            fillOpacity={fillOpacity}
          />
        )
      default:
        return null
    }
  }

  // Generate code preview
  const generateCode = () => {
    const lines = []
    lines.push(`<ChartContainer config={config} className="h-[400px]">`)
    lines.push(`  <ComposedChart data={data}>`)
    
    if (showGrid) {
      lines.push(`    <CartesianGrid${gridDashed ? ' strokeDasharray="3 3"' : ''} />`)
    }
    if (showXAxis) {
      lines.push(`    <XAxis dataKey="month" />`)
    }
    if (showYAxis) {
      lines.push(`    <YAxis />`)
    }
    if (showTooltip) {
      lines.push(`    <ChartTooltip content={<ChartTooltipContent />} />`)
    }
    if (showLegend) {
      lines.push(`    <ChartLegend content={<ChartLegendContent />} />`)
    }
    
    // Add series based on type
    if (salesType === 'bar') {
      lines.push(`    <Bar dataKey="sales" fill={colors[0]} radius={[${barRadius}, ${barRadius}, 0, 0]} />`)
    } else if (salesType === 'line') {
      lines.push(`    <Line type="${curveType}" dataKey="sales" stroke={colors[0]} strokeWidth={${strokeWidth}}${showDots ? '' : ' dot={false}'} />`)
    } else if (salesType === 'area') {
      lines.push(`    <Area type="${curveType}" dataKey="sales" stroke={colors[0]} fill={colors[0]} fillOpacity={${fillOpacity}} />`)
    }
    
    if (revenueType === 'bar') {
      lines.push(`    <Bar dataKey="revenue" fill={colors[1]} radius={[${barRadius}, ${barRadius}, 0, 0]} />`)
    } else if (revenueType === 'line') {
      lines.push(`    <Line type="${curveType}" dataKey="revenue" stroke={colors[1]} strokeWidth={${strokeWidth}}${showDots ? '' : ' dot={false}'} />`)
    } else if (revenueType === 'area') {
      lines.push(`    <Area type="${curveType}" dataKey="revenue" stroke={colors[1]} fill={colors[1]} fillOpacity={${fillOpacity}} />`)
    }
    
    if (profitType === 'bar') {
      lines.push(`    <Bar dataKey="profit" fill={colors[2]} radius={[${barRadius}, ${barRadius}, 0, 0]} />`)
    } else if (profitType === 'line') {
      lines.push(`    <Line type="${curveType}" dataKey="profit" stroke={colors[2]} strokeWidth={${strokeWidth}}${showDots ? '' : ' dot={false}'} />`)
    } else if (profitType === 'area') {
      lines.push(`    <Area type="${curveType}" dataKey="profit" stroke={colors[2]} fill={colors[2]} fillOpacity={${fillOpacity}} />`)
    }
    
    lines.push(`  </ComposedChart>`)
    lines.push(`</ChartContainer>`)
    return lines.join('\n')
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">ComposedChart Playground</h2>
        <p className="text-muted-foreground">
          Mix Line, Bar, and Area in one chart - perfect for comparing different metrics
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
              <ComposedChart data={sampleData}>
                {showGrid && (
                  <CartesianGrid 
                    strokeDasharray={gridDashed ? "3 3" : undefined}
                    className="stroke-muted"
                  />
                )}
                {showXAxis && <XAxis dataKey="month" />}
                {showYAxis && <YAxis />}
                {showTooltip && (
                  <ChartTooltip content={<ChartTooltipContent />} />
                )}
                {showLegend && (
                  <ChartLegend content={<ChartLegendContent />} />
                )}
                {renderSeries('sales', salesType, colors[0])}
                {renderSeries('revenue', revenueType, colors[1])}
                {renderSeries('profit', profitType, colors[2])}
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Settings Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Mix different chart types for each series</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="series" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="series">Series</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="axes">Axes</TabsTrigger>
              </TabsList>

              <TabsContent value="series" className="space-y-4 pt-4">
                {/* Sales Series */}
                <div className="space-y-2 rounded-lg border p-3" style={{ borderLeftColor: colors[0], borderLeftWidth: 4 }}>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Sales</Label>
                    <Select value={salesType} onValueChange={(v) => setSalesType(v as ChartType)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="line">Line</SelectItem>
                        <SelectItem value="area">Area</SelectItem>
                        <SelectItem value="none">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Revenue Series */}
                <div className="space-y-2 rounded-lg border p-3" style={{ borderLeftColor: colors[1], borderLeftWidth: 4 }}>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Revenue</Label>
                    <Select value={revenueType} onValueChange={(v) => setRevenueType(v as ChartType)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="line">Line</SelectItem>
                        <SelectItem value="area">Area</SelectItem>
                        <SelectItem value="none">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Profit Series */}
                <div className="space-y-2 rounded-lg border p-3" style={{ borderLeftColor: colors[2], borderLeftWidth: 4 }}>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Profit</Label>
                    <Select value={profitType} onValueChange={(v) => setProfitType(v as ChartType)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="line">Line</SelectItem>
                        <SelectItem value="area">Area</SelectItem>
                        <SelectItem value="none">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  Try different combinations: Bars for volume, Lines for trends, Areas for cumulative values.
                </p>
              </TabsContent>

              <TabsContent value="style" className="space-y-4 pt-4">
                {/* Curve Type (for Line/Area) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Curve Type (Line/Area)</Label>
                  <Select value={curveType} onValueChange={(v) => setCurveType(v as CurveType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {curveTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Stroke Width */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Stroke Width</Label>
                    <p className="text-xs text-muted-foreground">Line thickness</p>
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
                    <p className="text-xs text-muted-foreground">Line data points</p>
                  </div>
                  <Switch checked={showDots} onCheckedChange={setShowDots} />
                </div>

                <Separator />

                {/* Bar Radius */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Bar Radius</Label>
                    <p className="text-xs text-muted-foreground">Rounded corners</p>
                  </div>
                  <Input
                    type="number"
                    value={barRadius}
                    onChange={(e) => setBarRadius(Number(e.target.value) || 0)}
                    min={0}
                    max={20}
                    className="w-20 h-8"
                  />
                </div>

                <Separator />

                {/* Fill Opacity */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Area Opacity</Label>
                    <p className="text-xs text-muted-foreground">0 to 1</p>
                  </div>
                  <Input
                    type="number"
                    value={fillOpacity}
                    onChange={(e) => setFillOpacity(Number(e.target.value) || 0.1)}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-20 h-8"
                  />
                </div>
              </TabsContent>

              <TabsContent value="axes" className="space-y-4 pt-4">
                {/* Grid */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Show Grid</Label>
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
                  <Label className="text-sm font-medium">Show X Axis</Label>
                  <Switch checked={showXAxis} onCheckedChange={setShowXAxis} />
                </div>

                <Separator />

                {/* Y Axis */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Show Y Axis</Label>
                  <Switch checked={showYAxis} onCheckedChange={setShowYAxis} />
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
            <CardDescription>Required data structure for ComposedChart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`// Same as Line/Bar/Area - array of objects
const data = [
  { month: 'Jan', sales: 4000, revenue: 2400, target: 3000 },
  { month: 'Feb', sales: 3000, revenue: 1398, target: 3000 },
  { month: 'Mar', sales: 2000, revenue: 9800, target: 3000 },
]`}</code>
            </pre>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Shared X-axis</strong> - All series use same category field</li>
                <li><strong>Multiple Y fields</strong> - One for each Line/Bar/Area</li>
                <li><strong>Compatible scales</strong> - Values should be comparable</li>
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
              <p className="font-medium mb-1">Mix Chart Types</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">Line</code> - Trends, targets, rates</li>
                <li><code className="text-xs">Bar</code> - Absolute values, comparisons</li>
                <li><code className="text-xs">Area</code> - Volumes, ranges</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Each Component</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Line: type, strokeWidth, dot, strokeDasharray</li>
                <li>Bar: radius, stackId, barSize</li>
                <li>Area: fillOpacity, stackId, type</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Dual Y-Axis</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">yAxisId=&quot;left&quot;</code> + <code className="text-xs">yAxisId=&quot;right&quot;</code></li>
                <li>Different scales for different metrics</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🚫 Limitations</CardTitle>
            <CardDescription>What ComposedChart cannot do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Visual clutter</strong> - Too many series = confusing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Scale conflicts</strong> - Very different ranges need dual axis</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Z-index issues</strong> - Bars may hide lines (order matters)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Legend complexity</strong> - Mixed types need clear labeling</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No scatter mixing</strong> - Scatter needs different data format</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>✅ Best Practices & Use Cases</CardTitle>
            <CardDescription>When and how to use ComposedChart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Common Patterns:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Bar (actual) + Line (target/trend)</li>
                <li>Stacked Bars + Line (total trend)</li>
                <li>Area (volume) + Line (rate)</li>
                <li>Bars (categories) + Line (moving average)</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Avoid When:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Single metric type → Use specific chart</li>
                <li>More than 4-5 total series</li>
                <li>Unrelated metrics on same chart</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Tips:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Render Bars before Lines (z-order)</li>
                <li>Use dashed Line for targets</li>
                <li>Consider dual Y-axis for different scales</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
