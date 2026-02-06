import { Tag } from '@acronis-platform/shadcn-uikit/react'
import { TrendingUp, AlertCircle, AlertTriangle, TrendingDown } from 'lucide-react'

export function TagPriority() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tag variant="danger" icon={<TrendingUp className="h-4 w-4" />}>
        Urgent
      </Tag>
      <Tag variant="critical" icon={<AlertCircle className="h-4 w-4" />}>
        High
      </Tag>
      <Tag variant="warning" icon={<AlertTriangle className="h-4 w-4" />}>
        Medium
      </Tag>
      <Tag variant="info" icon={<TrendingDown className="h-4 w-4" />}>
        Low
      </Tag>
    </div>
  )
}
