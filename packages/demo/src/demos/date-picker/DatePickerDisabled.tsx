import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@acronis-platform/shadcn-uikit/react'

export function DatePickerDisabled() {
  return (
    <Button
      variant="outline"
      disabled
      className="w-[280px] justify-start text-left font-normal"
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      <span>Pick a date</span>
    </Button>
  )
}
