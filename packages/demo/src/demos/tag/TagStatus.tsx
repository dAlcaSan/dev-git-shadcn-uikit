import { Tag } from '@acronis-platform/shadcn-uikit/react'
import { CheckCircle, Clock, AlertTriangle, XCircle, Circle } from 'lucide-react'

export function TagStatus() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tag variant="success" icon={<CheckCircle className="h-4 w-4" />}>
        Completed
      </Tag>
      <Tag variant="info" icon={<Clock className="h-4 w-4" />}>
        In Progress
      </Tag>
      <Tag variant="warning" icon={<AlertTriangle className="h-4 w-4" />}>
        Pending
      </Tag>
      <Tag variant="danger" icon={<XCircle className="h-4 w-4" />}>
        Failed
      </Tag>
      <Tag variant="neutral" icon={<Circle className="h-4 w-4" />}>
        Draft
      </Tag>
    </div>
  )
}
