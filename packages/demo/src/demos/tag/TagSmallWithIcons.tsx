import { Tag } from '@acronis-platform/shadcn-uikit/react'
import {
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Circle,
} from 'lucide-react'

export function TagSmallWithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tag variant="success" size="small" icon={<CheckCircle className="h-3 w-3" />}>
        Active
      </Tag>
      <Tag variant="info" size="small" icon={<Info className="h-3 w-3" />}>
        Info
      </Tag>
      <Tag variant="warning" size="small" icon={<AlertTriangle className="h-3 w-3" />}>
        Warning
      </Tag>
      <Tag variant="critical" size="small" icon={<AlertCircle className="h-3 w-3" />}>
        Critical
      </Tag>
      <Tag variant="danger" size="small" icon={<XCircle className="h-3 w-3" />}>
        Error
      </Tag>
      <Tag variant="neutral" size="small" icon={<Circle className="h-3 w-3" />}>
        Neutral
      </Tag>
    </div>
  )
}
