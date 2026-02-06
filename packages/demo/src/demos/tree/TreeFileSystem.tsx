import { Tree, TreeNode } from '@acronis-platform/shadcn-uikit/react'
import { Folder, File, FileText, Image, Music } from 'lucide-react'

const fileSystemData: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    icon: <Folder className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: '1-1',
        label: 'Work',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: '1-1-1',
            label: 'Project.docx',
            icon: <FileText className="h-4 w-4 text-gray-500" />,
          },
          {
            id: '1-1-2',
            label: 'Report.pdf',
            icon: <File className="h-4 w-4 text-red-500" />,
          },
        ],
      },
      {
        id: '1-2',
        label: 'Personal',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: '1-2-1',
            label: 'Resume.pdf',
            icon: <File className="h-4 w-4 text-red-500" />,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Pictures',
    icon: <Folder className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: '2-1',
        label: 'Vacation',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: '2-1-1',
            label: 'beach.jpg',
            icon: <Image className="h-4 w-4 text-green-500" />,
          },
          {
            id: '2-1-2',
            label: 'sunset.jpg',
            icon: <Image className="h-4 w-4 text-green-500" />,
          },
        ],
      },
      {
        id: '2-2',
        label: 'Family',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: '2-2-1',
            label: 'portrait.jpg',
            icon: <Image className="h-4 w-4 text-green-500" />,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    label: 'Music',
    icon: <Folder className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: '3-1',
        label: 'Favorites',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: '3-1-1',
            label: 'song1.mp3',
            icon: <Music className="h-4 w-4 text-purple-500" />,
          },
          {
            id: '3-1-2',
            label: 'song2.mp3',
            icon: <Music className="h-4 w-4 text-purple-500" />,
          },
        ],
      },
    ],
  },
]

export function TreeFileSystem() {
  return (
    <Tree
      data={fileSystemData}
      showIcon
      defaultExpanded={['1', '2', '3']}
      onNodeSelect={(id) => console.log('Selected:', id)}
    />
  )
}
