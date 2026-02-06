import { Tag } from '@acronis-platform/shadcn-uikit/react'
import { Star, Zap } from 'lucide-react'

export function TagFeature() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tag variant="success" icon={<Star className="h-4 w-4" />}>
        Premium
      </Tag>
      <Tag variant="info" icon={<Zap className="h-4 w-4" />}>
        Fast
      </Tag>
      <Tag variant="warning" size="small">
        Beta
      </Tag>
      <Tag variant="neutral" size="small">
        Legacy
      </Tag>
    </div>
  )
}
