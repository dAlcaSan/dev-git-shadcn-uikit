import { Button } from '@acronis-platform/shadcn-uikit/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from '@acronis-platform/shadcn-uikit/react'

export function TooltipMultiple() {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="default">Save</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save your changes</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Cancel</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Discard changes</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete permanently</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
