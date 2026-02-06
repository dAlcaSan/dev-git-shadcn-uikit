import * as React from 'react'
import { Button, ButtonGroup } from '@acronis-platform/shadcn-uikit/react'
import { Bold, Italic, Underline } from 'lucide-react'

export function ButtonGroupTextFormatting() {
  const [textFormat, setTextFormat] = React.useState<string[]>([])

  const toggleFormat = (format: string) => {
    setTextFormat((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    )
  }

  return (
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
  )
}
