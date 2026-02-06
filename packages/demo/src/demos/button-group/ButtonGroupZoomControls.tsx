import * as React from 'react'
import { Button, ButtonGroup, ButtonGroupText } from '@acronis-platform/shadcn-uikit/react'
import { ZoomOut, ZoomIn } from 'lucide-react'

export function ButtonGroupZoomControls() {
  const [zoom, setZoom] = React.useState(100)

  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(25, zoom - 25))}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      <ButtonGroupText className="min-w-[80px] justify-center">{zoom}%</ButtonGroupText>
      <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(200, zoom + 25))}>
        <ZoomIn className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  )
}
