import { useState } from 'react'
import { Chip } from '@acronis-platform/shadcn-uikit/react'
import { Tag, Zap, CheckCircle } from 'lucide-react'

export function ChipWithIconsRemovable() {
  const [selectedChips, setSelectedChips] = useState([
    { id: 1, label: 'Design', icon: <Tag className="h-4 w-4" /> },
    { id: 2, label: 'Development', icon: <Zap className="h-4 w-4" /> },
    { id: 3, label: 'Testing', icon: <CheckCircle className="h-4 w-4" /> },
  ])

  const handleRemoveSelectedChip = (id: number) => {
    setSelectedChips(selectedChips.filter((chip) => chip.id !== id))
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedChips.map((chip) => (
          <Chip
            key={chip.id}
            icon={chip.icon}
            onRemove={() => handleRemoveSelectedChip(chip.id)}
          >
            {chip.label}
          </Chip>
        ))}
      </div>
      {selectedChips.length === 0 && (
        <p className="text-sm text-muted-foreground">All chips removed!</p>
      )}
    </div>
  )
}
