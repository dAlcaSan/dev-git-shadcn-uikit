import { Input } from '@acronis-platform/shadcn-uikit/react'
import { Mail, Lock, Search } from 'lucide-react'

export function InputWithIcons() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input className="pl-10" type="email" placeholder="Email" />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input className="pl-10" type="password" placeholder="Password" />
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input className="pl-10" type="search" placeholder="Search..." />
      </div>
    </div>
  )
}
