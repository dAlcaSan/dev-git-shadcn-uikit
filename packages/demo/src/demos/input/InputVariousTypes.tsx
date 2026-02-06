import { Input } from '@acronis-platform/shadcn-uikit/react'
import { User, Phone, CreditCard, Calendar } from 'lucide-react'

export function InputVariousTypes() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#243143]">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input className="pl-10" type="text" placeholder="John Doe" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#243143]">Phone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input className="pl-10" type="tel" placeholder="+1 (555) 000-0000" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#243143]">Credit Card</label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input className="pl-10" type="text" placeholder="1234 5678 9012 3456" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#243143]">Date</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input className="pl-10" type="date" />
        </div>
      </div>
    </div>
  )
}
