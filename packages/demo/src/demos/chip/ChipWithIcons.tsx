import { Chip } from '@acronis-platform/shadcn-uikit/react'
import { User, Mail, Tag, Star, Heart, CheckCircle } from 'lucide-react'

export function ChipWithIcons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip icon={<User className="h-4 w-4" />}>User</Chip>
      <Chip icon={<Mail className="h-4 w-4" />}>Email</Chip>
      <Chip icon={<Tag className="h-4 w-4" />}>Tag</Chip>
      <Chip icon={<Star className="h-4 w-4" />}>Favorite</Chip>
      <Chip icon={<Heart className="h-4 w-4" />}>Like</Chip>
      <Chip icon={<CheckCircle className="h-4 w-4" />}>Verified</Chip>
    </div>
  )
}
