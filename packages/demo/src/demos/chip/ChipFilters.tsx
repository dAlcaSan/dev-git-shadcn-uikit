import { Chip } from '@acronis-platform/shadcn-uikit/react'
import { Tag, Star } from 'lucide-react'

export function ChipFilters() {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Active Filters:</p>
      <div className="flex flex-wrap gap-2">
        <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
          Category: Electronics
        </Chip>
        <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
          Price: $100-$500
        </Chip>
        <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
          Brand: Samsung
        </Chip>
        <Chip icon={<Star className="h-4 w-4" />} onRemove={() => {}}>
          Rating: 4+
        </Chip>
      </div>
    </div>
  )
}
