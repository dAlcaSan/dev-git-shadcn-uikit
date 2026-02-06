import { Button, ButtonGroup } from '@acronis-platform/shadcn-uikit/react'
import { SkipBack, Play, Pause, SkipForward } from 'lucide-react'

export function ButtonGroupMediaControls() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <SkipBack className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Play className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Pause className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <SkipForward className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  )
}
