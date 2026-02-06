import { Tag } from '@acronis-platform/shadcn-uikit/react'
import { Shield, Lock, Unlock, AlertCircle } from 'lucide-react'

export function TagSecurity() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tag variant="success" icon={<Shield className="h-4 w-4" />}>
        Verified
      </Tag>
      <Tag variant="info" icon={<Lock className="h-4 w-4" />}>
        Encrypted
      </Tag>
      <Tag variant="warning" icon={<Unlock className="h-4 w-4" />}>
        Unlocked
      </Tag>
      <Tag variant="danger" icon={<AlertCircle className="h-4 w-4" />}>
        Vulnerable
      </Tag>
    </div>
  )
}
