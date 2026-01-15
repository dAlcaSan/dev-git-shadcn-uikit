import { useState } from 'react'
import {
  Avatar,
  AvatarFallback,
  // Badge,
  Button,
  Input,
  ScrollArea,
  Switch,
} from '@acronis-platform/shadcn-uikit/react'
import {
  Search,
  Plus,
  Settings,
  Clock,
  ChevronDown,
  Send,
  FileText,
  Brain,
  Globe,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Share2,
  RotateCw,
  MoreHorizontal,
} from 'lucide-react'

export function CyberChatPage() {
  const [tempChatEnabled, setTempChatEnabled] = useState(true)
  const [message, setMessage] = useState('')

  const recentChats = [
    { title: 'Sales follow-up', time: '2m ago', active: false, hasAlert: false },
    {
      title: 'Customer feedback triage',
      time: '5m ago',
      active: true,
      hasAlert: true,
    },
    {
      title: 'Marketing campaign strategy',
      time: '1h ago',
      active: false,
      hasAlert: false,
    },
    { title: 'Feature demo', time: '2h ago', active: false, hasAlert: false },
  ]

  const feedbackData = [
    {
      category: 'Delivery',
      count: 5,
      type: 'Tracking requests, minor delays',
      time: '1 h',
    },
    {
      category: 'Billing',
      count: 4,
      type: 'Invoice copies, pricing questions',
      time: '48 min',
    },
    {
      category: 'Technical',
      count: 2,
      type: 'Password reset, slow page load',
      time: '30 min',
    },
    {
      category: 'General',
      count: 3,
      type: 'Product availability, return policy',
      time: '10 min',
    },
  ]

  return (
    <div className="flex h-screen bg-background theme-cyber-chat">
      {/* Sidebar - 256px */}
      <div className="w-64 border-r border-border/50 bg-card/30 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="text-xl font-light text-primary">Acronis</div>
              <div className="text-xl font-light text-foreground">
                CyberChat
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 h-9 bg-background" />
          </div>
        </div>

        {/* Projects Section */}
        <div className="border-b border-border/50">
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="text-sm font-semibold">Projects</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="border-b border-border/50">
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="text-sm font-semibold">Skills</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Recent Chats */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="text-sm font-semibold">Recent chats</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1">
              {recentChats.map((chat, i) => (
                <button
                  key={i}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors relative ${
                    chat.active
                      ? 'bg-accent/70 text-accent-foreground'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-normal truncate pr-2">
                      {chat.title}
                    </span>
                    {chat.hasAlert && (
                      <Clock className="h-4 w-4 flex-shrink-0 text-destructive" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">JB</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Jorge Borloni</p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area - 1184px (1440 - 256) */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-border/50 px-6 flex items-center justify-between bg-background">
          <h1 className="text-base font-semibold">Customer feedback triage</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                checked={tempChatEnabled}
                onCheckedChange={setTempChatEnabled}
                className="scale-90"
              />
              <span className="text-sm">Temporary chat</span>
            </div>
            <Button variant="outline" size="sm">
              Share & Export
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* User Message */}
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  Yes, I want you to prepare a quick summary of the remaining 14
                  non-urgent tickets:
                </p>
              </div>
            </div>

            {/* AI Response with Table */}
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="text-xs">AI</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <p className="text-sm">
                  Here&apos;s a quick summary of the remaining 14 non-urgent
                  tickets:
                </p>

                {/* Table */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-semibold">
                          Category
                        </th>
                        <th className="text-left p-3 font-semibold">Count</th>
                        <th className="text-left p-3 font-semibold">Type</th>
                        <th className="text-right p-3 font-semibold">
                          Estimated time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbackData.map((row, i) => (
                        <tr key={i} className="border-t border-border/50">
                          <td className="p-3">{row.category}</td>
                          <td className="p-3">{row.count}</td>
                          <td className="p-3 text-muted-foreground">
                            {row.type}
                          </td>
                          <td className="p-3 text-right text-muted-foreground">
                            {row.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Button variant="link" className="h-auto p-0 text-primary">
                  Copy table
                </Button>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">
                      Estimated handling time:
                    </span>{' '}
                    ~2.5 hours total
                  </p>
                  <p>
                    <span className="font-semibold">Suggested assignment:</span>{' '}
                    1 junior agent + 1 billing specialist
                  </p>
                  <p className="text-muted-foreground">
                    Let me know if you want draft replies prepared in bulk or
                    tickets assigned automatically.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-6 border-t border-border/50 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="relative border border-border rounded-2xl bg-background p-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything"
                className="w-full min-h-[64px] resize-none bg-transparent text-sm focus:outline-none"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <FileText className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Brain className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Globe className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Model: Auto
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="icon" className="h-9 w-9">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
