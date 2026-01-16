import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  CyberChatState,
  CyberChatActions,
  Message,
} from '../types'
import { mockChats } from '../data/mockChats'
import { mockProjects } from '../data/mockProjects'
import { mockSkills } from '../data/mockSkills'
import { mockMessages } from '../data/mockMessages'
import { mockModels } from '../data/mockModels'

type CyberChatStore = CyberChatState & CyberChatActions

export const useCyberChatStore = create<CyberChatStore>()(
  persist(
    (set, get) => ({
      // Initial state
      searchQuery: '',
      expandedProjects: ['network-infrastructure'],
      expandedSkills: [],
      activeChat: 'customer-feedback-triage',
      chats: mockChats,
      projects: mockProjects,
      skills: mockSkills,
      messages: mockMessages,
      isTyping: false,
      tempChatEnabled: true,
      inputValue: '',
      attachedFiles: [],
      deepResearchEnabled: false,
      webSearchEnabled: false,
      selectedModel: 'auto',
      autoModelEnabled: true,
      models: mockModels,
      modelDropdownOpen: false,
      shareDropdownOpen: false,

      // Sidebar actions
      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleProjectExpanded: (projectId) =>
        set((state) => {
          const expanded = state.expandedProjects.includes(projectId)
          return {
            expandedProjects: expanded
              ? state.expandedProjects.filter((id) => id !== projectId)
              : [...state.expandedProjects, projectId],
          }
        }),

      toggleSkillExpanded: (skillId) =>
        set((state) => {
          const expanded = state.expandedSkills.includes(skillId)
          return {
            expandedSkills: expanded
              ? state.expandedSkills.filter((id) => id !== skillId)
              : [...state.expandedSkills, skillId],
          }
        }),

      setActiveChat: (chatId) => set({ activeChat: chatId }),

      addChat: (chat) =>
        set((state) => ({
          chats: [chat, ...state.chats],
        })),

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),

      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),

      // Message actions
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      setIsTyping: (isTyping) => set({ isTyping }),

      toggleMessageAction: (messageId, actionType) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  actions: msg.actions?.map((action) =>
                    action.type === actionType
                      ? { ...action, active: !action.active }
                      : action
                  ),
                }
              : msg
          ),
        })),

      // Input actions
      setInputValue: (value) => set({ inputValue: value }),

      addAttachedFile: (file) =>
        set((state) => ({
          attachedFiles: [...state.attachedFiles, file],
        })),

      removeAttachedFile: (index) =>
        set((state) => ({
          attachedFiles: state.attachedFiles.filter((_, i) => i !== index),
        })),

      clearAttachedFiles: () => set({ attachedFiles: [] }),

      toggleDeepResearch: () =>
        set((state) => ({
          deepResearchEnabled: !state.deepResearchEnabled,
        })),

      toggleWebSearch: () =>
        set((state) => ({
          webSearchEnabled: !state.webSearchEnabled,
        })),

      setSelectedModel: (modelId) =>
        set({
          selectedModel: modelId,
          autoModelEnabled: modelId === 'auto',
        }),

      toggleAutoModel: () =>
        set((state) => ({
          autoModelEnabled: !state.autoModelEnabled,
          selectedModel: !state.autoModelEnabled ? 'auto' : state.selectedModel,
        })),

      // UI actions
      toggleModelDropdown: () =>
        set((state) => ({
          modelDropdownOpen: !state.modelDropdownOpen,
          shareDropdownOpen: false,
        })),

      toggleShareDropdown: () =>
        set((state) => ({
          shareDropdownOpen: !state.shareDropdownOpen,
          modelDropdownOpen: false,
        })),

      setTempChatEnabled: (enabled) => set({ tempChatEnabled: enabled }),

      // Complex actions
      sendMessage: () => {
        const state = get()
        if (!state.inputValue.trim()) return

        const userMessage: Message = {
          id: `msg-${Date.now()}`,
          type: 'user',
          content: state.inputValue,
          timestamp: new Date(),
        }

        set({
          messages: [...state.messages, userMessage],
          inputValue: '',
          isTyping: true,
        })

        setTimeout(() => {
          const aiMessage: Message = {
            id: `msg-${Date.now()}-ai`,
            type: 'ai',
            content: 'This is a simulated AI response. In a real application, this would be generated by an AI model.',
            timestamp: new Date(),
            actions: [
              { type: 'copy', label: 'Copy' },
              { type: 'like', label: 'Like' },
              { type: 'dislike', label: 'Dislike' },
              { type: 'share', label: 'Share' },
              { type: 'regenerate', label: 'Regenerate' },
            ],
          }

          set((state) => ({
            messages: [...state.messages, aiMessage],
            isTyping: false,
          }))
        }, 2000)
      },

      switchChat: (chatId) => {
        set({
          activeChat: chatId,
          messages: mockMessages,
          isTyping: false,
        })
      },

      regenerateMessage: (messageId) => {
        set({ isTyping: true })

        setTimeout(() => {
          const newMessage: Message = {
            id: `msg-${Date.now()}-regenerated`,
            type: 'ai',
            content: 'This is a regenerated response with different content.',
            timestamp: new Date(),
            actions: [
              { type: 'copy', label: 'Copy' },
              { type: 'like', label: 'Like' },
              { type: 'dislike', label: 'Dislike' },
              { type: 'share', label: 'Share' },
              { type: 'regenerate', label: 'Regenerate' },
            ],
          }

          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === messageId ? newMessage : msg
            ),
            isTyping: false,
          }))
        }, 2000)
      },
    }),
    {
      name: 'cyberchat-storage',
      partialize: (state) => ({
        tempChatEnabled: state.tempChatEnabled,
        expandedProjects: state.expandedProjects,
        expandedSkills: state.expandedSkills,
        selectedModel: state.selectedModel,
        autoModelEnabled: state.autoModelEnabled,
      }),
    }
  )
)
