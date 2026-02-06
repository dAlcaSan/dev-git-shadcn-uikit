import { Tag } from '@acronis-platform/shadcn-uikit/react'
import {
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Circle,
} from 'lucide-react'

export function TagWithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tag variant="success" icon={<CheckCircle className="h-4 w-4" />}>
        Active
      </Tag>
      <Tag variant="info" icon={<Info className="h-4 w-4" />}>
        Info
      </Tag>
      <Tag variant="warning" icon={<AlertTriangle className="h-4 w-4" />}>
        Warning
      </Tag>
      <Tag variant="critical" icon={<AlertCircle className="h-4 w-4" />}>
        Critical
      </Tag>
      <Tag variant="danger" icon={<XCircle className="h-4 w-4" />}>
        Error
      </Tag>
      <Tag variant="neutral" icon={<Circle className="h-4 w-4" />}>
        Neutral
      </Tag>
    </div>
  )
}
