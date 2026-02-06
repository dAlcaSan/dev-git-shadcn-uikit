import { Tree, TreeNode } from '@acronis-platform/shadcn-uikit/react'
import { Folder, FileText, Code } from 'lucide-react'

const projectData: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: <Folder className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: 'button.tsx',
            label: 'Button.tsx',
            icon: <Code className="h-4 w-4 text-blue-400" />,
          },
          {
            id: 'input.tsx',
            label: 'Input.tsx',
            icon: <Code className="h-4 w-4 text-blue-400" />,
          },
        ],
      },
      {
        id: 'utils',
        label: 'utils',
        icon: <Folder className="h-4 w-4 text-blue-500" />,
        children: [
          {
            id: 'helpers.ts',
            label: 'helpers.ts',
            icon: <Code className="h-4 w-4 text-blue-400" />,
          },
        ],
      },
      {
        id: 'app.tsx',
        label: 'App.tsx',
        icon: <Code className="h-4 w-4 text-blue-400" />,
      },
    ],
  },
  {
    id: 'public',
    label: 'public',
    icon: <Folder className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: 'index.html',
        label: 'index.html',
        icon: <FileText className="h-4 w-4 text-orange-500" />,
      },
    ],
  },
  {
    id: 'package.json',
    label: 'package.json',
    icon: <FileText className="h-4 w-4 text-green-600" />,
  },
]

export function TreeControlled() {
  return (
    <Tree
      data={projectData}
      showIcon
      showCheckbox
      defaultExpanded={['src']}
      onNodeToggle={(id) => console.log('Node toggled:', id)}
      onNodeSelect={(id) => console.log('Node selected:', id)}
      onNodeCheck={(id, checked) => console.log('Node checked:', id, checked)}
    />
  )
}
