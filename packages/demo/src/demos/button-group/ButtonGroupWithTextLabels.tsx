import { Button, ButtonGroup } from '@acronis-platform/shadcn-uikit/react'
import { List, ListOrdered } from 'lucide-react'

export function ButtonGroupWithTextLabels() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <List className="mr-2 h-4 w-4" />
        Bullet List
      </Button>
      <Button variant="outline">
        <ListOrdered className="mr-2 h-4 w-4" />
        Numbered List
      </Button>
    </ButtonGroup>
  )
}
