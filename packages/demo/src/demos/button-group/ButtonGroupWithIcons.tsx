import { Button, ButtonGroup } from '@acronis-platform/shadcn-uikit/react'
import { Bold, Italic, Underline } from 'lucide-react'

export function ButtonGroupWithIcons() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Underline className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  )
}
