import { Button, ButtonGroup, ButtonGroupSeparator } from '@acronis-platform/shadcn-uikit/react'
import { Undo, Redo, Copy, Scissors, Clipboard } from 'lucide-react'

export function ButtonGroupWithSeparators() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Redo className="h-4 w-4" />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Scissors className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Clipboard className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  )
}
