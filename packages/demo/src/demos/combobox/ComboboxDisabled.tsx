import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@acronis-platform/shadcn-uikit/react'

export function ComboboxDisabled() {
  return (
    <Button variant="outline" role="combobox" disabled className="w-[280px] justify-between">
      Select framework...
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  )
}
