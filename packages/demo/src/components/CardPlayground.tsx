import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  Button,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@acronis-platform/shadcn-uikit/react'
import { Heart, Share2, MessageCircle, TrendingUp } from 'lucide-react'

type CardVariant = 'default' | 'stats' | 'profile' | 'pricing' | 'media' | 'notification'
type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type BorderStyle = 'default' | 'primary' | 'destructive' | 'none'

const shadowClasses: Record<ShadowSize, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
}

const borderClasses: Record<BorderStyle, string> = {
  default: '',
  primary: 'border-primary',
  destructive: 'border-destructive',
  none: 'border-0',
}

export function CardPlayground() {
  // Card variant
  const [variant, setVariant] = React.useState<CardVariant>('default')

  // Structure settings
  const [showHeader, setShowHeader] = React.useState(true)
  const [showTitle, setShowTitle] = React.useState(true)
  const [showDescription, setShowDescription] = React.useState(true)
  const [showContent, setShowContent] = React.useState(true)
  const [showFooter, setShowFooter] = React.useState(true)
  const [showImage, setShowImage] = React.useState(false)

  // Style settings
  const [shadow, setShadow] = React.useState<ShadowSize>('none')
  const [borderStyle, setBorderStyle] = React.useState<BorderStyle>('default')
  const [hoverable, setHoverable] = React.useState(false)
  const [cardWidth, setCardWidth] = React.useState('350')

  // Content settings (for stats card)
  const [showTrend, setShowTrend] = React.useState(true)
  const [showBadge, setShowBadge] = React.useState(false)
  const [showAvatar, setShowAvatar] = React.useState(true)
  const [showActions, setShowActions] = React.useState(true)

  // Build class string
  const cardClasses = [
    `w-[${cardWidth}px]`,
    shadowClasses[shadow],
    borderClasses[borderStyle],
    hoverable ? 'cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1' : '',
    showImage ? 'overflow-hidden' : '',
  ].filter(Boolean).join(' ')

  // Generate code
  const generateCode = () => {
    const lines: string[] = []
    const classAttr = cardClasses.trim() ? ` className="${cardClasses.trim()}"` : ''
    
    lines.push(`<Card${classAttr}>`)
    
    if (showImage && (variant === 'media' || variant === 'default')) {
      lines.push(`  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600" />`)
    }
    
    if (showHeader) {
      lines.push(`  <CardHeader>`)
      if (showAvatar && variant === 'profile') {
        lines.push(`    <Avatar className="h-16 w-16">`)
        lines.push(`      <AvatarImage src="..." />`)
        lines.push(`      <AvatarFallback>JD</AvatarFallback>`)
        lines.push(`    </Avatar>`)
      }
      if (showTitle) lines.push(`    <CardTitle>${getTitleText()}</CardTitle>`)
      if (showDescription) lines.push(`    <CardDescription>${getDescriptionText()}</CardDescription>`)
      if (showBadge) lines.push(`    <Badge>New</Badge>`)
      lines.push(`  </CardHeader>`)
    }
    
    if (showContent) {
      lines.push(`  <CardContent>`)
      lines.push(`    {/* Your content here */}`)
      lines.push(`  </CardContent>`)
    }
    
    if (showFooter) {
      lines.push(`  <CardFooter>`)
      if (showActions) {
        lines.push(`    <Button>Action</Button>`)
      }
      lines.push(`  </CardFooter>`)
    }
    
    lines.push(`</Card>`)
    return lines.join('\n')
  }

  const getTitleText = () => {
    switch (variant) {
      case 'stats': return 'Total Revenue'
      case 'profile': return 'John Doe'
      case 'pricing': return 'Pro Plan'
      case 'media': return 'Beautiful Landscape'
      case 'notification': return 'New Message'
      default: return 'Card Title'
    }
  }

  const getDescriptionText = () => {
    switch (variant) {
      case 'stats': return '+20.1% from last month'
      case 'profile': return 'Software Engineer'
      case 'pricing': return '$29/month'
      case 'media': return 'A stunning view of nature'
      case 'notification': return '2 minutes ago'
      default: return 'Card description goes here'
    }
  }

  // Render card based on variant
  const renderCard = () => {
    const baseClasses = [
      shadowClasses[shadow],
      borderClasses[borderStyle],
      hoverable ? 'cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1' : '',
      showImage && (variant === 'media' || variant === 'default') ? 'overflow-hidden' : '',
    ].filter(Boolean).join(' ')

    switch (variant) {
      case 'stats':
        return (
          <Card className={baseClasses} style={{ width: `${cardWidth}px` }}>
            {showHeader && (
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  {showTitle && <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>}
                  {showDescription && (
                    <CardDescription className="text-xs">
                      {showTrend && (
                        <span className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-3 w-3" /> +20.1% from last month
                        </span>
                      )}
                      {!showTrend && 'Monthly overview'}
                    </CardDescription>
                  )}
                </div>
                {showBadge && <Badge variant="secondary">Live</Badge>}
              </CardHeader>
            )}
            {showContent && (
              <CardContent>
                <div className="text-3xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
              </CardContent>
            )}
            {showFooter && (
              <CardFooter className="text-xs text-muted-foreground">
                Updated just now
              </CardFooter>
            )}
          </Card>
        )

      case 'profile':
        return (
          <Card className={baseClasses} style={{ width: `${cardWidth}px` }}>
            {showHeader && (
              <CardHeader className="text-center">
                {showAvatar && (
                  <Avatar className="h-20 w-20 mx-auto mb-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
                {showTitle && <CardTitle>John Doe</CardTitle>}
                {showDescription && <CardDescription>Software Engineer at Acme Inc.</CardDescription>}
                {showBadge && <Badge className="mt-2">Pro Member</Badge>}
              </CardHeader>
            )}
            {showContent && (
              <CardContent className="text-center">
                <div className="flex justify-center gap-6 text-sm">
                  <div>
                    <div className="font-bold">142</div>
                    <p className="text-muted-foreground">Shows what&apos;s happening right now</p>
                  </div>
                  <div>
                    <div className="font-bold">1.2K</div>
                    <div className="text-muted-foreground">Followers</div>
                  </div>
                  <div>
                    <div className="font-bold">567</div>
                    <div className="text-muted-foreground">Following</div>
                  </div>
                </div>
              </CardContent>
            )}
            {showFooter && showActions && (
              <CardFooter className="justify-center gap-2">
                <Button>Follow</Button>
                <Button variant="outline">Message</Button>
              </CardFooter>
            )}
          </Card>
        )

      case 'pricing':
        return (
          <Card className={baseClasses} style={{ width: `${cardWidth}px` }}>
            {showHeader && (
              <CardHeader>
                <div className="flex items-center justify-between">
                  {showTitle && <CardTitle>Pro Plan</CardTitle>}
                  {showBadge && <Badge>Popular</Badge>}
                </div>
                {showDescription && <CardDescription>For professional teams</CardDescription>}
              </CardHeader>
            )}
            {showContent && (
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">✓ Unlimited projects</li>
                  <li className="flex items-center gap-2">✓ Priority support</li>
                  <li className="flex items-center gap-2">✓ Advanced analytics</li>
                  <li className="flex items-center gap-2">✓ Custom integrations</li>
                </ul>
              </CardContent>
            )}
            {showFooter && showActions && (
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            )}
          </Card>
        )

      case 'media':
        return (
          <Card className={baseClasses} style={{ width: `${cardWidth}px` }}>
            {showImage && (
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600" />
            )}
            {showHeader && (
              <CardHeader>
                <div className="flex items-center justify-between">
                  {showTitle && <CardTitle>Beautiful Landscape</CardTitle>}
                  {showBadge && <Badge variant="secondary">Featured</Badge>}
                </div>
                {showDescription && <CardDescription>A stunning view of nature</CardDescription>}
              </CardHeader>
            )}
            {showContent && (
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover the beauty of natural landscapes with our curated collection of photographs.
                </p>
              </CardContent>
            )}
            {showFooter && showActions && (
              <CardFooter className="justify-between">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm"><Heart className="h-4 w-4 mr-1" /> 24</Button>
                  <Button variant="ghost" size="sm"><MessageCircle className="h-4 w-4 mr-1" /> 8</Button>
                </div>
                <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button>
              </CardFooter>
            )}
          </Card>
        )

      case 'notification':
        return (
          <Card className={baseClasses} style={{ width: `${cardWidth}px` }}>
            {showHeader && (
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                {showAvatar && (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1">
                  {showTitle && <CardTitle className="text-sm">New Message</CardTitle>}
                  {showDescription && (
                    <CardDescription className="text-xs">John Doe sent you a message</CardDescription>
                  )}
                </div>
                {showBadge && <Badge variant="destructive" className="h-5 w-5 p-0 justify-center">3</Badge>}
              </CardHeader>
            )}
            {showContent && (
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  &quot;Hey, I wanted to follow up on our conversation yesterday...&quot;
                </p>
              </CardContent>
            )}
            {showFooter && showActions && (
              <CardFooter className="justify-between">
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Dismiss</Button>
                  <Button size="sm">Reply</Button>
                </div>
              </CardFooter>
            )}
          </Card>
        )

      default:
        return (
          <Card className={baseClasses} style={{ width: `${cardWidth}px` }}>
            {showImage && (
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600" />
            )}
            {showHeader && (
              <CardHeader>
                <div className="flex items-center justify-between">
                  {showTitle && <CardTitle>Card Title</CardTitle>}
                  {showBadge && <Badge>New</Badge>}
                </div>
                {showDescription && <CardDescription>Card description goes here</CardDescription>}
              </CardHeader>
            )}
            {showContent && (
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the main content area of the card. You can add any content here including text, images, forms, and more.
                </p>
              </CardContent>
            )}
            {showFooter && showActions && (
              <CardFooter className="justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </CardFooter>
            )}
          </Card>
        )
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">Card Playground</h2>
        <p className="text-muted-foreground">
          Versatile container for grouping related content and actions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Card Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Card updates as you change settings</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[400px] bg-muted/30 rounded-lg">
            {renderCard()}
          </CardContent>
        </Card>

        {/* Settings Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Customize your card</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="variant" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="variant">Type</TabsTrigger>
                <TabsTrigger value="structure">Structure</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>

              <TabsContent value="variant" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Card Type</Label>
                  <Select value={variant} onValueChange={(v) => setVariant(v as CardVariant)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="stats">Stats/KPI</SelectItem>
                      <SelectItem value="profile">Profile</SelectItem>
                      <SelectItem value="pricing">Pricing</SelectItem>
                      <SelectItem value="media">Media/Image</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choose a card template to start with
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Width (px)</Label>
                  <Input
                    type="number"
                    value={cardWidth}
                    onChange={(e) => setCardWidth(e.target.value)}
                    min={200}
                    max={600}
                  />
                </div>
              </TabsContent>

              <TabsContent value="structure" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Header</Label>
                  <Switch checked={showHeader} onCheckedChange={setShowHeader} />
                </div>

                {showHeader && (
                  <>
                    <div className="flex items-center justify-between pl-4">
                      <Label className="text-sm">Title</Label>
                      <Switch checked={showTitle} onCheckedChange={setShowTitle} />
                    </div>

                    <div className="flex items-center justify-between pl-4">
                      <Label className="text-sm">Description</Label>
                      <Switch checked={showDescription} onCheckedChange={setShowDescription} />
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Content</Label>
                  <Switch checked={showContent} onCheckedChange={setShowContent} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Footer</Label>
                  <Switch checked={showFooter} onCheckedChange={setShowFooter} />
                </div>

                {showFooter && (
                  <div className="flex items-center justify-between pl-4">
                    <Label className="text-sm">Actions</Label>
                    <Switch checked={showActions} onCheckedChange={setShowActions} />
                  </div>
                )}

                <Separator />

                {(variant === 'media' || variant === 'default') && (
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Image Header</Label>
                    <Switch checked={showImage} onCheckedChange={setShowImage} />
                  </div>
                )}

                {(variant === 'profile' || variant === 'notification') && (
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Avatar</Label>
                    <Switch checked={showAvatar} onCheckedChange={setShowAvatar} />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Badge</Label>
                  <Switch checked={showBadge} onCheckedChange={setShowBadge} />
                </div>

                {variant === 'stats' && (
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Trend Indicator</Label>
                    <Switch checked={showTrend} onCheckedChange={setShowTrend} />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="style" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Shadow</Label>
                  <Select value={shadow} onValueChange={(v) => setShadow(v as ShadowSize)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Border Style</Label>
                  <Select value={borderStyle} onValueChange={(v) => setBorderStyle(v as BorderStyle)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="destructive">Destructive</SelectItem>
                      <SelectItem value="none">No Border</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Hover Effect</Label>
                    <p className="text-xs text-muted-foreground">Covers the last 7 days</p>
                  </div>
                  <Switch checked={hoverable} onCheckedChange={setHoverable} />
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
            <CardTitle>📊 Data / Structure</CardTitle>
            <CardDescription>Card composition pattern</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`import { Card, CardHeader, CardTitle, 
  CardDescription, CardContent, CardFooter 
} from '@acronis-platform/shadcn-uikit/react'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>Main content</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>`}</code>
            </pre>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Components:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Card</strong> - Container with border and background</li>
                <li><strong>CardHeader</strong> - Title + description section</li>
                <li><strong>CardContent</strong> - Main content area</li>
                <li><strong>CardFooter</strong> - Actions/buttons section</li>
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
              <p className="font-medium mb-1">Card Styling</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><code className="text-xs">shadow-sm/md/lg/xl</code> - Elevation levels</li>
                <li><code className="text-xs">border-primary</code> - Accent border color</li>
                <li><code className="text-xs">overflow-hidden</code> - For image headers</li>
                <li><code className="text-xs">hover:shadow-lg</code> - Interactive lift</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Layout Variants</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li><strong>Stats</strong> - KPI with icon + trend</li>
                <li><strong>Profile</strong> - Avatar centered layout</li>
                <li><strong>Pricing</strong> - Price + features list</li>
                <li><strong>Media</strong> - Image header</li>
                <li><strong>Notification</strong> - Avatar + message + actions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🚫 Limitations</CardTitle>
            <CardDescription>What Card cannot do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No built-in variants</strong> - Style via className</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No collapse/expand</strong> - Use Accordion or Collapsible</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No drag & drop</strong> - Need dnd-kit integration</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No built-in loading</strong> - Add Skeleton manually</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span><strong>No selection state</strong> - Implement via className/data-state</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>✅ Best Practices & Use Cases</CardTitle>
            <CardDescription>When and how to use Card</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Ideal For:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Dashboard widgets (stats, KPIs)</li>
                <li>Content previews (blog posts, products)</li>
                <li>Form containers</li>
                <li>User profiles and settings</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Avoid When:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Simple text content → Use prose styling</li>
                <li>Modal content → Use Dialog</li>
                <li>Navigation → Use specific nav components</li>
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-1">Tips:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>Use consistent card widths in grids</li>
                <li>Keep action buttons in CardFooter</li>
                <li>Use Badge for status indicators in header</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
