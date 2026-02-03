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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@acronis-platform/shadcn-uikit/react'
import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'
import { getChartColors } from '@/lib/chart-colors'

const radialDataSources = {
  browsers: {
    name: 'Browser Share',
    data: [
      { label: 'Chrome', value: 65, users: 2200 },
      { label: 'Safari', value: 50, users: 1200 },
      { label: 'Firefox', value: 35, users: 800 },
      { label: 'Edge', value: 25, users: 600 },
    ],
    nameKeys: ['label'],
    valueKeys: ['value', 'users'],
  },
  devices: {
    name: 'Device Usage',
    data: [
      { device: 'Desktop', share: 58, sessions: 1800 },
      { device: 'Mobile', share: 32, sessions: 1500 },
      { device: 'Tablet', share: 10, sessions: 400 },
    ],
    nameKeys: ['device'],
    valueKeys: ['share', 'sessions'],
  },
  channels: {
    name: 'Acquisition Channels',
    data: [
      { channel: 'Organic', percent: 42, leads: 320 },
      { channel: 'Paid', percent: 28, leads: 260 },
      { channel: 'Email', percent: 18, leads: 140 },
      { channel: 'Referral', percent: 12, leads: 90 },
    ],
    nameKeys: ['channel'],
    valueKeys: ['percent', 'leads'],
  },
}

export function RadialChartPlayground() {
  const palette = getChartColors(8)
  const [dataSource, setDataSource] = React.useState<keyof typeof radialDataSources>('browsers')
  const currentSource = radialDataSources[dataSource]
  const [nameKey, setNameKey] = React.useState(currentSource.nameKeys[0])
  const [valueKey, setValueKey] = React.useState(currentSource.valueKeys[0])
  const [enabledKeys, setEnabledKeys] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    setNameKey(currentSource.nameKeys[0])
    setValueKey(currentSource.valueKeys[0])
    const allOn: Record<string, boolean> = {}
    currentSource.data.forEach((item) => {
      allOn[String(item[currentSource.nameKeys[0]])] = true
    })
    setEnabledKeys(allOn)
  }, [dataSource, currentSource])

  React.useEffect(() => {
    const allOn: Record<string, boolean> = {}
    currentSource.data.forEach((item) => {
      allOn[String(item[nameKey])] = true
    })
    setEnabledKeys(allOn)
  }, [currentSource, nameKey])

  const visibleData = React.useMemo(() => {
    const filtered = currentSource.data.filter((item) => enabledKeys[String(item[nameKey])] !== false)
    return filtered.length > 0 ? filtered : currentSource.data
  }, [currentSource.data, enabledKeys, nameKey])

  const dataWithColors = React.useMemo(
    () =>
      visibleData.map((item, idx) => ({
        ...item,
        fill: palette[idx % palette.length],
      })),
    [visibleData, palette]
  )

  // Chart settings state
  const [showTooltip, setShowTooltip] = React.useState(true)
  const [showLegend, setShowLegend] = React.useState(true)
  const [showPolarGrid, setShowPolarGrid] = React.useState(true)
  const [showBackground, setShowBackground] = React.useState(true)
  
  // Radial-specific settings
  const [innerRadius, setInnerRadius] = React.useState(30)
  const [outerRadius, setOuterRadius] = React.useState(110)
  const [startAngle, setStartAngle] = React.useState(90)
  const [endAngle, setEndAngle] = React.useState(-270)
  const [cornerRadius, setCornerRadius] = React.useState(10)
  const [barSize, setBarSize] = React.useState(10)

  const config = React.useMemo(() => {
    const cfg: Record<string, { label: string; color: string }> = {}
    dataWithColors.forEach((item, idx) => {
      const key = String(item[nameKey])
      cfg[key] = { label: key, color: palette[idx % palette.length] }
    })
    return cfg
  }, [dataWithColors, nameKey, palette])

  // Generate code preview
  const generateCode = () => {
    const lines = []
    lines.push(`<ChartContainer config={config} className="h-[400px]">`)
    lines.push(`  <RadialBarChart`)
    const enabled = Object.entries(enabledKeys).filter(([, v]) => v !== false).map(([k]) => k)
    if (enabled.length !== currentSource.data.length) {
      lines.unshift(`const filteredData = data.filter((d) => ${JSON.stringify(enabled)}.includes(String(d["${nameKey}"])))`)
      lines.push(`    data={filteredData}`)
    } else {
      lines.push(`    data={data}`)
    }
    lines.push(`    cx="50%"`)
    lines.push(`    cy="50%"`)
    lines.push(`    innerRadius={${innerRadius}}`)
    lines.push(`    outerRadius={${outerRadius}}`)
    lines.push(`    startAngle={${startAngle}}`)
    lines.push(`    endAngle={${endAngle}}`)
    if (barSize !== 10) lines.push(`    barSize={${barSize}}`)
    lines.push(`  >`)
    
    if (showPolarGrid) {
      lines.push(`    <PolarGrid gridType="circle" />`)
    }
    lines.push(`    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />`)
    
    if (showTooltip) {
      lines.push(`    <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />`)
    }
    if (showLegend) {
      lines.push(`    <ChartLegend content={<ChartLegendContent />} />`)
    }
    
    const radialProps = [`dataKey="${valueKey}"`]
    if (showBackground) radialProps.push(`background`)
    if (cornerRadius > 0) radialProps.push(`cornerRadius={${cornerRadius}}`)
    
    lines.push(`    <RadialBar ${radialProps.join(' ')} />`)
    
    lines.push(`  </RadialBarChart>`)
    lines.push(`</ChartContainer>`)
    return lines.join('\n')
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">RadialChart Playground</h2>
        <p className="text-muted-foreground">
          Explore RadialBarChart settings - circular progress bars and gauges
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
              <RadialBarChart
                data={[...dataWithColors]}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                barSize={barSize}
              >
                {showPolarGrid && <PolarGrid gridType="circle" />}
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                {showTooltip && (
                  <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />
                )}
                {showLegend && (
                  <ChartLegend content={<ChartLegendContent />} />
                )}
                <RadialBar
                  dataKey={valueKey}
                  background={showBackground}
                  cornerRadius={cornerRadius}
                />
              </RadialBarChart>
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
            <Tabs defaultValue="data" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="shape">Shape</TabsTrigger>
                <TabsTrigger value="bars">Bars</TabsTrigger>
                <TabsTrigger value="display">Display</TabsTrigger>
              </TabsList>

              <TabsContent value="data" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Data Source</Label>
                  <Select value={dataSource} onValueChange={(v) => setDataSource(v as keyof typeof radialDataSources)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(radialDataSources).map(([key, src]) => (
                        <SelectItem key={key} value={key}>
                          {src.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Label field (nameKey)</Label>
                    <Select value={nameKey} onValueChange={setNameKey}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currentSource.nameKeys.map((k) => (
                          <SelectItem key={k} value={k}>
                            {k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Used for bar labels and legend names</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Value field (dataKey)</Label>
                    <Select value={valueKey} onValueChange={setValueKey}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currentSource.valueKeys.map((k) => (
                          <SelectItem key={k} value={k}>
                            {k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Numeric field used for bar length</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Bars</Label>
                    <p className="text-xs text-muted-foreground">Toggle which bars are shown</p>
                  </div>
                  <button
                    className="text-xs text-primary hover:underline"
                    onClick={() => {
                      const allOn: Record<string, boolean> = {}
                      currentSource.data.forEach((item) => {
                        allOn[String(item[nameKey])] = true
                      })
                      setEnabledKeys(allOn)
                    }}
                  >
                    Enable all
                  </button>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {currentSource.data.map((item, idx) => {
                    const label = item[nameKey] ?? item[currentSource.nameKeys[0]] ?? 'item'
                    const key = String(label)
                    const checked = enabledKeys[key] !== false
                    const valueDisplay = item[valueKey] ?? item[currentSource.valueKeys[0]] ?? ''
                    return (
                      <button
                        key={key}
                        className={`flex items-center gap-2 rounded border p-2 text-left transition hover:border-primary ${checked ? 'bg-muted/50' : 'opacity-60'}`}
                        onClick={() =>
                          setEnabledKeys((prev) => ({
                            ...prev,
                            [key]: !(prev[key] !== false),
                          }))
                        }
                      >
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: palette[idx % palette.length] }}
                        />
                        <span className="text-sm font-medium">{key}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{valueDisplay}</span>
                      </button>
                    )
                  })}
                </div>

                <p className="text-xs text-muted-foreground">Data changes update tooltip/legend and bar lengths automatically.</p>
              </TabsContent>

              <TabsContent value="shape" className="space-y-4 pt-4">
                {/* Inner Radius */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Inner Radius</Label>
                      <p className="text-xs text-muted-foreground">Center hole size</p>
                    </div>
                    <Input
                      type="number"
                      value={innerRadius}
                      onChange={(e) => setInnerRadius(Number(e.target.value) || 10)}
                      min={10}
                      max={outerRadius - 20}
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                <Separator />

                {/* Outer Radius */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Outer Radius</Label>
                      <p className="text-xs text-muted-foreground">Overall size</p>
                    </div>
                    <Input
                      type="number"
                      value={outerRadius}
                      onChange={(e) => setOuterRadius(Number(e.target.value) || 50)}
                      min={50}
                      max={150}
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                <Separator />

                {/* Bar Size (global) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Bar Size</Label>
                      <p className="text-xs text-muted-foreground">Thickness applied to all bars</p>
                    </div>
                    <Input
                      type="number"
                      value={barSize}
                      onChange={(e) => setBarSize(Number(e.target.value) || 5)}
                      min={5}
                      max={30}
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                <Separator />

                {/* Corner Radius (global) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Corner Radius</Label>
                      <p className="text-xs text-muted-foreground">Rounded ends for all bars</p>
                    </div>
                    <Input
                      type="number"
                      value={cornerRadius}
                      onChange={(e) => setCornerRadius(Number(e.target.value) || 0)}
                      min={0}
                      max={20}
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                <Separator />

                {/* Start Angle */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Start Angle</Label>
                      <p className="text-xs text-muted-foreground">Where bars begin</p>
                    </div>
                    <Input
                      type="number"
                      value={startAngle}
                      onChange={(e) => setStartAngle(Number(e.target.value))}
                      min={-360}
                      max={360}
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                <Separator />

                {/* End Angle */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">End Angle</Label>
                      <p className="text-xs text-muted-foreground">Where 100% would be</p>
                    </div>
                    <Input
                      type="number"
                      value={endAngle}
                      onChange={(e) => setEndAngle(Number(e.target.value))}
                      min={-360}
                      max={360}
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                <Separator />

                {/* Angle Presets */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Angle Presets</Label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded border px-2 py-1 text-xs hover:border-primary"
                      onClick={() => {
                        setStartAngle(90)
                        setEndAngle(-270)
                      }}
                    >
                      Full Circle (clockwise)
                    </button>
                    <button
                      className="rounded border px-2 py-1 text-xs hover:border-primary"
                      onClick={() => {
                        setStartAngle(180)
                        setEndAngle(0)
                      }}
                    >
                      Half Gauge
                    </button>
                  </div>
                </div>

              </TabsContent>

              <TabsContent value="bars" className="space-y-4 pt-4">
                <p className="text-xs text-muted-foreground">Per-bar overrides (color, labels, stacking) coming next.</p>
              </TabsContent>

              <TabsContent value="display" className="space-y-4 pt-4">
                {/* Show Background */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Background</Label>
                    <p className="text-xs text-muted-foreground">Track behind bars</p>
                  </div>
                  <Switch checked={showBackground} onCheckedChange={setShowBackground} />
                </div>

                <Separator />

                {/* Polar Grid */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Polar Grid</Label>
                    <p className="text-xs text-muted-foreground">Circular grid lines</p>
                  </div>
                  <Switch checked={showPolarGrid} onCheckedChange={setShowPolarGrid} />
                </div>

                <Separator />

                {/* Tooltip */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Tooltip</Label>
                    <p className="text-xs text-muted-foreground">{'<ChartTooltip />'}</p>
                  </div>
                  <Switch checked={showTooltip} onCheckedChange={setShowTooltip} />
                </div>

                <Separator />

                {/* Legend */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Legend</Label>
                    <p className="text-xs text-muted-foreground">{'<ChartLegend />'}</p>
                  </div>
                  <Switch checked={showLegend} onCheckedChange={setShowLegend} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Data Items</p>
                  {dataWithColors.map((item, idx) => (
                    <div key={`${nameKey}-${idx}`} className="flex items-center gap-2 rounded-lg border p-2" style={{ borderLeftColor: item.fill, borderLeftWidth: 4 }}>
                      <span className="text-sm font-medium">{String(item[nameKey])}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{String(item[valueKey])}</span>
                    </div>
                  ))}
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
          <pre className="w-full max-w-full overflow-x-auto rounded-lg bg-muted p-4 text-sm whitespace-pre">
            <code>{generateCode()}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Documentation Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>📊 Data Format</CardTitle>
            <CardDescription>Required data structure for RadialBarChart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`// Array with name, value, and fill color
const data = [
  { name: 'Chrome', value: 65, fill: 'var(--chart-blue)' },
  { name: 'Safari', value: 50, fill: 'var(--chart-green)' },
  { name: 'Firefox', value: 35, fill: 'var(--chart-purple)' },
]`}</code>
            </pre>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>name field</strong> - Label for each ring</li>
                <li><strong>value field</strong> - Numeric (typically 0-100 for %)</li>
                <li><strong>fill field</strong> - Color for each bar (inline in data)</li>
                <li><strong>Ordered data</strong> - Rings render inside-out</li>
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
              <p className="font-medium mb-1">RadialBar Component</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">innerRadius</code> - Center hole size (%)</li>
                <li><code className="text-xs">outerRadius</code> - Overall size (%)</li>
                <li><code className="text-xs">barSize</code> - Ring thickness (px)</li>
                <li><code className="text-xs">cornerRadius</code> - Rounded bar ends</li>
                <li><code className="text-xs">background</code> - Show track behind bar</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Angles</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">startAngle</code> - Where bars begin (90 = top)</li>
                <li><code className="text-xs">endAngle</code> - Where bars end (-270 = full circle)</li>
                <li>Semi-circle: startAngle=180, endAngle=0</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🚫 Limitations</CardTitle>
            <CardDescription>What RadialBarChart cannot do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Max 5-6 rings</strong> - More becomes hard to read</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No multi-segment rings</strong> - Each ring is single value</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No animation on value change</strong> - Only initial animation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No center content</strong> - Need custom overlay for center text</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Limited label placement</strong> - Labels overlap easily</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>✅ Best Practices & Use Cases</CardTitle>
            <CardDescription>When and how to use RadialBarChart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Ideal For:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Progress indicators / completion %</li>
                <li>Goal tracking (vs target)</li>
                <li>Comparing a few metrics (2-5)</li>
                <li>Dashboard gauges</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Avoid When:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Many categories → Use BarChart</li>
                <li>Precise comparisons → Use BarChart</li>
                <li>Time series → Use LineChart</li>
                <li>Part-to-whole → Use PieChart</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Tips:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Use background={true} to show max value</li>
                <li>Sort data by value for visual hierarchy</li>
                <li>Use semi-circle (180° arc) for gauges</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
