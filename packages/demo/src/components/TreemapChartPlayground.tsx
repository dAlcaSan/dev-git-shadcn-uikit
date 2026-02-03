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
  Treemap,
  ResponsiveContainer,
} from 'recharts'
import { getChartColors } from '@/lib/chart-colors'

// Sample hierarchical data
const sampleData = [
  {
    name: 'Frontend',
    children: [
      { name: 'React', size: 3000 },
      { name: 'Vue', size: 2000 },
      { name: 'Angular', size: 1500 },
      { name: 'Svelte', size: 800 },
    ],
  },
  {
    name: 'Backend',
    children: [
      { name: 'Node.js', size: 2500 },
      { name: 'Python', size: 2200 },
      { name: 'Go', size: 1200 },
      { name: 'Rust', size: 600 },
    ],
  },
  {
    name: 'Database',
    children: [
      { name: 'PostgreSQL', size: 1800 },
      { name: 'MongoDB', size: 1400 },
      { name: 'Redis', size: 900 },
    ],
  },
  {
    name: 'DevOps',
    children: [
      { name: 'Docker', size: 1600 },
      { name: 'Kubernetes', size: 1400 },
      { name: 'AWS', size: 1200 },
    ],
  },
]

const aspectRatios = [
  { value: '4/3', label: '4:3 (Default)' },
  { value: '1', label: '1:1 (Square)' },
  { value: '16/9', label: '16:9 (Wide)' },
]

type AspectRatio = '4/3' | '1' | '16/9'

// Custom content renderer
type TreemapContentProps = {
  x: number
  y: number
  width: number
  height: number
  name: string
  depth: number
  index: number
  parent?: { index: number }
}
type CustomizedContentProps = TreemapContentProps & {
  colors: string[]
  showLabels: boolean
  strokeWidth: number
}

const CustomizedContent = (props: CustomizedContentProps) => {
  const { x, y, width, height, name, depth, colors, showLabels, strokeWidth } = props

  const colorIndex = depth === 1 ? props.index : props.parent?.index || 0
  const fill = colors[colorIndex % colors.length]
  
  // Darken color for nested items
  const fillOpacity = depth === 2 ? 0.7 : 1

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill,
          fillOpacity,
          stroke: '#fff',
          strokeWidth: strokeWidth,
          strokeOpacity: 1,
        }}
      />
      {showLabels && width > 50 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={depth === 1 ? 14 : 11}
          fontWeight={depth === 1 ? 'bold' : 'normal'}
        >
          {name}
        </text>
      )}
    </g>
  )
}

export function TreemapChartPlayground() {
  const colors = getChartColors(4)

  // Chart settings state
  const [showTooltip, setShowTooltip] = React.useState(true)
  const [showLabels, setShowLabels] = React.useState(true)
  const [strokeWidth, setStrokeWidth] = React.useState(2)
  const [aspectRatio, setAspectRatio] = React.useState<AspectRatio>('4/3')
  const [isAnimationActive, setIsAnimationActive] = React.useState(true)

  const config = {
    frontend: { label: 'Frontend', color: colors[0] },
    backend: { label: 'Backend', color: colors[1] },
    database: { label: 'Database', color: colors[2] },
    devops: { label: 'DevOps', color: colors[3] },
  }

  // Generate code preview
  const generateCode = () => {
    const lines = []
    lines.push(`<ResponsiveContainer width="100%" height={400}>`)
    lines.push(`  <Treemap`)
    lines.push(`    data={data}`)
    lines.push(`    dataKey="size"`)
    lines.push(`    aspectRatio={${aspectRatio}}`)
    lines.push(`    stroke="#fff"`)
    lines.push(`    fill={colors[0]}`)
    if (!isAnimationActive) lines.push(`    isAnimationActive={false}`)
    lines.push(`    content={<CustomizedContent`)
    lines.push(`      colors={colors}`)
    lines.push(`      showLabels={${showLabels}}`)
    lines.push(`      strokeWidth={${strokeWidth}}`)
    lines.push(`    />}`)
    lines.push(`  >`)
    if (showTooltip) {
      lines.push(`    <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />`)
    }
    lines.push(`  </Treemap>`)
    lines.push(`</ResponsiveContainer>`)
    return lines.join('\n')
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">TreemapChart Playground</h2>
        <p className="text-muted-foreground">
          Hierarchical data as nested rectangles - great for showing proportions within categories
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
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={sampleData}
                  dataKey="size"
                  aspectRatio={parseFloat(aspectRatio.replace('/', '.').replace('.', '/')) || 4/3}
                  stroke="#fff"
                  fill={colors[0]}
                  isAnimationActive={isAnimationActive}
                  content={(contentProps) => (
                    <CustomizedContent 
                      {...contentProps}
                      colors={colors} 
                      showLabels={showLabels}
                      strokeWidth={strokeWidth}
                    />
                  )}
                >
                  {showTooltip && (
                    <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />
                  )}
                </Treemap>
              </ResponsiveContainer>
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
                {/* Show Labels */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Labels</Label>
                    <p className="text-xs text-muted-foreground">Text inside rectangles</p>
                  </div>
                  <Switch checked={showLabels} onCheckedChange={setShowLabels} />
                </div>

                <Separator />

                {/* Stroke Width */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Border Width</Label>
                    <p className="text-xs text-muted-foreground">Rectangle borders</p>
                  </div>
                  <Input
                    type="number"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value) || 1)}
                    min={0}
                    max={6}
                    className="w-20 h-8"
                  />
                </div>

                <Separator />

                {/* Aspect Ratio */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={(v) => setAspectRatio(v as AspectRatio)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatios.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Controls preferred shape of rectangles
                  </p>
                </div>

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
              </TabsContent>

              <TabsContent value="data" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Categories</p>
                  {sampleData.map((category, index) => (
                    <div 
                      key={category.name} 
                      className="rounded-lg border p-3"
                      style={{ borderLeftColor: colors[index], borderLeftWidth: 4 }}
                    >
                      <p className="text-sm font-medium">{category.name}</p>
                      <div className="mt-2 space-y-1">
                        {category.children.map((child) => (
                          <div key={child.name} className="flex justify-between text-xs text-muted-foreground">
                            <span>{child.name}</span>
                            <span>{child.size.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
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
            <CardDescription>Required data structure for Treemap</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`// Hierarchical nested structure
const data = [
  {
    name: 'Frontend',
    children: [
      { name: 'React', size: 3000 },
      { name: 'Vue', size: 2000 },
    ],
  },
  {
    name: 'Backend',
    children: [
      { name: 'Node.js', size: 2500 },
    ],
  },
]`}</code>
            </pre>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>name field</strong> - Label for each rectangle</li>
                <li><strong>size field</strong> - Numeric value (leaf nodes)</li>
                <li><strong>children array</strong> - Nested categories</li>
                <li><strong>Positive values</strong> - Size must be greater than 0</li>
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
              <p className="font-medium mb-1">Treemap Component</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">dataKey</code> - Field for rectangle size (&quot;size&quot;)</li>
                <li><code className="text-xs">aspectRatio</code> - Rectangle shape preference (4/3)</li>
                <li><code className="text-xs">isAnimationActive</code> - Enable/disable animation</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Custom Content</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">content</code> - Custom render function for rectangles</li>
                <li>Access: x, y, width, height, name, depth, index</li>
                <li>Control: colors, labels, borders per rectangle</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🚫 Limitations</CardTitle>
            <CardDescription>What Treemap cannot do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Deep nesting (3+ levels)</strong> - Becomes hard to read</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Many small items</strong> - Labels don&apos;t fit, rectangles too small</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No drill-down</strong> - Click to zoom needs custom implementation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>Limited interactivity</strong> - Basic tooltip only</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No comparison over time</strong> - Single snapshot only</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>✅ Best Practices & Use Cases</CardTitle>
            <CardDescription>When and how to use Treemap</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Ideal For:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Disk/storage usage visualization</li>
                <li>Portfolio allocation breakdown</li>
                <li>Organizational structure by headcount</li>
                <li>Budget breakdown by department</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Avoid When:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Comparing exact values → Use BarChart</li>
                <li>Showing hierarchy only → Use Tree/Org chart</li>
                <li>Time series → Use LineChart</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Tips:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Use color to indicate categories, not values</li>
                <li>Limit to 2 levels of nesting</li>
                <li>Group small items into &quot;Other&quot;</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
