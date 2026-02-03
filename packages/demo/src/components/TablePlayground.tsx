import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Checkbox,
  Badge,
  Button,
} from '@acronis-platform/shadcn-uikit/react'
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', amount: 2500 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', amount: 1800 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', amount: 950 },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'Active', amount: 3200 },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Pending', amount: 1450 },
  { id: 6, name: 'Diana Ross', email: 'diana@example.com', role: 'Admin', status: 'Active', amount: 4100 },
  { id: 7, name: 'Edward King', email: 'edward@example.com', role: 'User', status: 'Inactive', amount: 720 },
  { id: 8, name: 'Fiona Green', email: 'fiona@example.com', role: 'Editor', status: 'Active', amount: 2100 },
]

type SortDirection = 'asc' | 'desc' | null
type SortColumn = 'name' | 'email' | 'role' | 'status' | 'amount' | null
type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export function TablePlayground() {
  // Display settings
  const [showCaption, setShowCaption] = React.useState(false)
  const [showFooter, setShowFooter] = React.useState(false)
  const [showSelection, setShowSelection] = React.useState(true)
  const [showBadges, setShowBadges] = React.useState(true)
  const [striped, setStriped] = React.useState(false)
  const [compact, setCompact] = React.useState(false)
  const [showBorder, setShowBorder] = React.useState(true)

  // Feature settings
  const [sortable, setSortable] = React.useState(true)
  const [paginated, setPaginated] = React.useState(true)
  const [pageSize, setPageSize] = React.useState(5)

  // Columns visibility
  const [showId, setShowId] = React.useState(false)
  const [showName, setShowName] = React.useState(true)
  const [showEmail, setShowEmail] = React.useState(true)
  const [showRole, setShowRole] = React.useState(true)
  const [showStatus, setShowStatus] = React.useState(true)
  const [showAmount, setShowAmount] = React.useState(true)

  // State
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])
  const [sortColumn, setSortColumn] = React.useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)
  const [currentPage, setCurrentPage] = React.useState(1)

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return sampleData
    return [...sampleData].sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal)
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }
      return 0
    })
  }, [sortColumn, sortDirection])

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!paginated) return sortedData
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, paginated, currentPage, pageSize])

  const totalPages = Math.ceil(sampleData.length / pageSize)

  // Handlers
  const handleSort = (column: SortColumn) => {
    if (!sortable) return
    if (sortColumn === column) {
      if (sortDirection === 'asc') setSortDirection('desc')
      else if (sortDirection === 'desc') {
        setSortColumn(null)
        setSortDirection(null)
      }
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const toggleRow = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedData.map(r => r.id))
    }
  }

  const getBadgeVariant = (status: string): BadgeVariant => {
    switch (status) {
      case 'Active': return 'default'
      case 'Pending': return 'secondary'
      case 'Inactive': return 'destructive'
      default: return 'outline'
    }
  }

  const total = sampleData.reduce((sum, row) => sum + row.amount, 0)

  // Code generation
  const generateCode = () => {
    const lines = []
    if (showBorder) lines.push(`<div className="rounded-md border">`)
    lines.push(`  <Table>`)
    if (showCaption) lines.push(`    <TableCaption>A list of users</TableCaption>`)
    lines.push(`    <TableHeader>`)
    lines.push(`      <TableRow>`)
    if (showSelection) lines.push(`        <TableHead className="w-[50px]"><Checkbox /></TableHead>`)
    if (showId) lines.push(`        <TableHead>ID</TableHead>`)
    if (showName) lines.push(`        <TableHead>Name</TableHead>`)
    if (showEmail) lines.push(`        <TableHead>Email</TableHead>`)
    if (showRole) lines.push(`        <TableHead>Role</TableHead>`)
    if (showStatus) lines.push(`        <TableHead>Status</TableHead>`)
    if (showAmount) lines.push(`        <TableHead className="text-right">Amount</TableHead>`)
    lines.push(`      </TableRow>`)
    lines.push(`    </TableHeader>`)
    lines.push(`    <TableBody>`)
    lines.push(`      {data.map((row${striped ? ', index' : ''}) => (`)
    lines.push(`        <TableRow key={row.id}${striped ? " className={index % 2 === 0 ? 'bg-muted/50' : ''}" : ''}>`)
    if (showSelection) lines.push(`          <TableCell><Checkbox /></TableCell>`)
    if (showId) lines.push(`          <TableCell${compact ? ' className="px-2 py-2"' : ''}>{row.id}</TableCell>`)
    if (showName) lines.push(`          <TableCell${compact ? ' className="px-2 py-2"' : ''} className="font-medium">{row.name}</TableCell>`)
    if (showEmail) lines.push(`          <TableCell${compact ? ' className="px-2 py-2"' : ''}>{row.email}</TableCell>`)
    if (showRole) lines.push(`          <TableCell${compact ? ' className="px-2 py-2"' : ''}>{row.role}</TableCell>`)
    if (showStatus) {
      if (showBadges) {
        lines.push(`          <TableCell><Badge variant={...}>{row.status}</Badge></TableCell>`)
      } else {
        lines.push(`          <TableCell${compact ? ' className="px-2 py-2"' : ''}>{row.status}</TableCell>`)
      }
    }
    if (showAmount) lines.push(`          <TableCell className="text-right">{formatCurrency(row.amount)}</TableCell>`)
    lines.push(`        </TableRow>`)
    lines.push(`      ))}`)
    lines.push(`    </TableBody>`)
    if (showFooter) {
      lines.push(`    <TableFooter>`)
      lines.push(`      <TableRow>`)
      lines.push(`        <TableCell colSpan={${[showSelection, showId, showName, showEmail, showRole, showStatus].filter(Boolean).length}}>Total</TableCell>`)
      lines.push(`        <TableCell className="text-right">{formatCurrency(total)}</TableCell>`)
      lines.push(`      </TableRow>`)
      lines.push(`    </TableFooter>`)
    }
    lines.push(`  </Table>`)
    if (showBorder) lines.push(`</div>`)
    return lines.join('\n')
  }

  const cellClass = compact ? 'px-2 py-2' : ''
  const headClass = compact ? 'h-8 px-2' : ''

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">Table Playground</h2>
        <p className="text-muted-foreground">
          Interactive table widget with sorting, pagination, selection, and more
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Table Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Table updates as you change settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={showBorder ? 'rounded-md border' : ''}>
              <Table>
                {showCaption && <TableCaption>A list of users in your system</TableCaption>}
                <TableHeader>
                  <TableRow>
                    {showSelection && (
                      <TableHead className={`w-[50px] ${headClass}`}>
                        <Checkbox 
                          checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                          onCheckedChange={toggleAll}
                        />
                      </TableHead>
                    )}
                    {showId && (
                      <TableHead className={headClass}>
                        {sortable ? (
                          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleSort('name')}>
                            ID <ArrowUpDown className="ml-1 h-3 w-3" />
                          </Button>
                        ) : 'ID'}
                      </TableHead>
                    )}
                    {showName && (
                      <TableHead className={headClass}>
                        {sortable ? (
                          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleSort('name')}>
                            Name <ArrowUpDown className="ml-1 h-3 w-3" />
                          </Button>
                        ) : 'Name'}
                      </TableHead>
                    )}
                    {showEmail && (
                      <TableHead className={headClass}>
                        {sortable ? (
                          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleSort('email')}>
                            Email <ArrowUpDown className="ml-1 h-3 w-3" />
                          </Button>
                        ) : 'Email'}
                      </TableHead>
                    )}
                    {showRole && (
                      <TableHead className={headClass}>
                        {sortable ? (
                          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleSort('role')}>
                            Role <ArrowUpDown className="ml-1 h-3 w-3" />
                          </Button>
                        ) : 'Role'}
                      </TableHead>
                    )}
                    {showStatus && (
                      <TableHead className={headClass}>
                        {sortable ? (
                          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleSort('status')}>
                            Status <ArrowUpDown className="ml-1 h-3 w-3" />
                          </Button>
                        ) : 'Status'}
                      </TableHead>
                    )}
                    {showAmount && (
                      <TableHead className={`text-right ${headClass}`}>
                        {sortable ? (
                          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleSort('amount')}>
                            Amount <ArrowUpDown className="ml-1 h-3 w-3" />
                          </Button>
                        ) : 'Amount'}
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow 
                      key={row.id} 
                      className={striped && index % 2 === 0 ? 'bg-muted/50' : ''}
                      data-state={selectedRows.includes(row.id) ? 'selected' : undefined}
                    >
                      {showSelection && (
                        <TableCell className={cellClass}>
                          <Checkbox 
                            checked={selectedRows.includes(row.id)}
                            onCheckedChange={() => toggleRow(row.id)}
                          />
                        </TableCell>
                      )}
                      {showId && <TableCell className={cellClass}>{row.id}</TableCell>}
                      {showName && <TableCell className={`font-medium ${cellClass}`}>{row.name}</TableCell>}
                      {showEmail && <TableCell className={cellClass}>{row.email}</TableCell>}
                      {showRole && <TableCell className={cellClass}>{row.role}</TableCell>}
                      {showStatus && (
                        <TableCell className={cellClass}>
                          {showBadges ? (
                            <Badge variant={getBadgeVariant(row.status)}>{row.status}</Badge>
                          ) : (
                            row.status
                          )}
                        </TableCell>
                      )}
                      {showAmount && (
                        <TableCell className={`text-right ${cellClass}`}>
                          ${row.amount.toLocaleString()}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
                {showFooter && (
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={[showSelection, showId, showName, showEmail, showRole, showStatus].filter(Boolean).length}>
                        Total
                      </TableCell>
                      <TableCell className="text-right">${total.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </div>

            {/* Pagination */}
            {paginated && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  {selectedRows.length > 0 && `${selectedRows.length} of ${paginatedData.length} selected. `}
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="display">Display</TabsTrigger>
                <TabsTrigger value="columns">Columns</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent value="display" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Border</Label>
                    <p className="text-xs text-muted-foreground">Rounded border</p>
                  </div>
                  <Switch checked={showBorder} onCheckedChange={setShowBorder} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Caption</Label>
                    <p className="text-xs text-muted-foreground">Table description</p>
                  </div>
                  <Switch checked={showCaption} onCheckedChange={setShowCaption} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Footer</Label>
                    <p className="text-xs text-muted-foreground">Show totals row</p>
                  </div>
                  <Switch checked={showFooter} onCheckedChange={setShowFooter} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Striped Rows</Label>
                    <p className="text-xs text-muted-foreground">Alternating colors</p>
                  </div>
                  <Switch checked={striped} onCheckedChange={setStriped} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Compact</Label>
                    <p className="text-xs text-muted-foreground">Reduced padding</p>
                  </div>
                  <Switch checked={compact} onCheckedChange={setCompact} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Status Badges</Label>
                    <p className="text-xs text-muted-foreground">Colored status</p>
                  </div>
                  <Switch checked={showBadges} onCheckedChange={setShowBadges} />
                </div>
              </TabsContent>

              <TabsContent value="columns" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">ID</Label>
                  <Switch checked={showId} onCheckedChange={setShowId} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Name</Label>
                  <Switch checked={showName} onCheckedChange={setShowName} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Email</Label>
                  <Switch checked={showEmail} onCheckedChange={setShowEmail} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Role</Label>
                  <Switch checked={showRole} onCheckedChange={setShowRole} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Status</Label>
                  <Switch checked={showStatus} onCheckedChange={setShowStatus} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Amount</Label>
                  <Switch checked={showAmount} onCheckedChange={setShowAmount} />
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Selection</Label>
                    <p className="text-xs text-muted-foreground">Checkbox column</p>
                  </div>
                  <Switch checked={showSelection} onCheckedChange={setShowSelection} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Sortable</Label>
                    <p className="text-xs text-muted-foreground">Click headers</p>
                  </div>
                  <Switch checked={sortable} onCheckedChange={setSortable} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Pagination</Label>
                    <p className="text-xs text-muted-foreground">Page controls</p>
                  </div>
                  <Switch checked={paginated} onCheckedChange={setPaginated} />
                </div>

                {paginated && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Page Size</Label>
                      <Select 
                        value={String(pageSize)} 
                        onValueChange={(v) => {
                          setPageSize(Number(v))
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 rows</SelectItem>
                          <SelectItem value="5">5 rows</SelectItem>
                          <SelectItem value="10">10 rows</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
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
            <CardDescription>Required data structure for Table</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`// Array of objects with consistent keys
const data = [
  { id: 1, name: 'John', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane', email: 'jane@example.com', role: 'User' },
]

// Components
import { Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell, TableFooter, TableCaption 
} from '@acronis-platform/shadcn-uikit/react'`}</code>
            </pre>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Consistent keys</strong> - All objects same structure</li>
                <li><strong>Unique ID</strong> - For row keys and selection</li>
                <li><strong>Typed data</strong> - TypeScript interface recommended</li>
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
              <p className="font-medium mb-1">Display Options</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">TableCaption</code> - Table description</li>
                <li><code className="text-xs">TableFooter</code> - Totals/summary row</li>
                <li><code className="text-xs">className=&quot;bg-muted/50&quot;</code> - Striped rows</li>
                <li><code className="text-xs">className=&quot;px-2 py-2&quot;</code> - Compact mode</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Features (with @tanstack/react-table)</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">getSortedRowModel</code> - Column sorting</li>
                <li><code className="text-xs">getPaginationRowModel</code> - Pagination</li>
                <li><code className="text-xs">getFilteredRowModel</code> - Filtering</li>
                <li><code className="text-xs">rowSelection</code> - Checkbox selection</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🚫 Limitations</CardTitle>
            <CardDescription>What basic Table cannot do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No virtualization</strong> - Large datasets (1000+) need react-virtual</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No built-in sorting</strong> - Need @tanstack/react-table</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No column resize</strong> - Fixed or flex columns only</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No column reorder</strong> - Static column order</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No frozen columns</strong> - Need custom CSS sticky</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>✅ Best Practices & Use Cases</CardTitle>
            <CardDescription>When and how to use Table</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Ideal For:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Displaying structured data records</li>
                <li>CRUD interfaces (list + actions)</li>
                <li>Data comparison (side by side)</li>
                <li>Reports and summaries</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Use DataTable When:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Need sorting, filtering, pagination</li>
                <li>Row selection required</li>
                <li>Column visibility toggles needed</li>
                <li>100+ rows of data</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Tips:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Use Badge for status columns</li>
                <li>Right-align numeric columns</li>
                <li>Add hover row highlight with data-state</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
