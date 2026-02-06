import { Tree, TreeNode } from '@acronis-platform/shadcn-uikit/react'
import { Folder, Image, Music, Video } from 'lucide-react'

const mixedData: TreeNode[] = [
  {
    id: 'media',
    label: 'Media Files',
    icon: <Folder className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: 'videos',
        label: 'Videos',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: 'video1',
            label: 'tutorial.mp4',
            icon: <Video className="h-4 w-4 text-red-500" />,
          },
          {
            id: 'video2',
            label: 'demo.mp4',
            icon: <Video className="h-4 w-4 text-red-500" />,
          },
        ],
      },
      {
        id: 'audio',
        label: 'Audio',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: 'audio1',
            label: 'podcast.mp3',
            icon: <Music className="h-4 w-4 text-purple-500" />,
          },
        ],
      },
      {
        id: 'images',
        label: 'Images',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: 'img1',
            label: 'logo.png',
            icon: <Image className="h-4 w-4 text-green-500" />,
          },
          {
            id: 'img2',
            label: 'banner.jpg',
            icon: <Image className="h-4 w-4 text-green-500" />,
          },
        ],
      },
    ],
  },
]

export function TreeMixedContent() {
  return (
    <Tree
      data={mixedData}
      showIcon
      showCheckbox
      defaultExpanded={['media', 'videos', 'images']}
    />
  )
}
