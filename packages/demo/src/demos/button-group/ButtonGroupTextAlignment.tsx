import * as React from 'react'
import { Button, ButtonGroup } from '@acronis-platform/shadcn-uikit/react'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

export function ButtonGroupTextAlignment() {
  const [alignment, setAlignment] = React.useState<string>('left')

  return (
    <ButtonGroup>
      <Button
        variant={alignment === 'left' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setAlignment('left')}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant={alignment === 'center' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setAlignment('center')}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant={alignment === 'right' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setAlignment('right')}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  )
}
