import * as React from 'react'
import { Button, ButtonGroup } from '@acronis-platform/shadcn-uikit/react'
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
} from 'lucide-react'

export function ButtonGroupComplexToolbar() {
  const [alignment, setAlignment] = React.useState<string>('left')
  const [textFormat, setTextFormat] = React.useState<string[]>([])

  const toggleFormat = (format: string) => {
    setTextFormat((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    )
  }

  return (
    <div className="flex flex-wrap gap-4">
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Redo className="h-4 w-4" />
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button
          variant={textFormat.includes('bold') ? 'default' : 'outline'}
          size="icon"
          onClick={() => toggleFormat('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant={textFormat.includes('italic') ? 'default' : 'outline'}
          size="icon"
          onClick={() => toggleFormat('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant={textFormat.includes('underline') ? 'default' : 'outline'}
          size="icon"
          onClick={() => toggleFormat('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
      </ButtonGroup>

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

      <ButtonGroup>
        <Button variant="outline">
          <List className="mr-2 h-4 w-4" />
          Bullet
        </Button>
        <Button variant="outline">
          <ListOrdered className="mr-2 h-4 w-4" />
          Numbered
        </Button>
      </ButtonGroup>
    </div>
  )
}
