import { createContext } from 'react'

export interface TopicEditorContent {
  content: string
  setContent: (data: string) => void
}

export const topicEditorContent = createContext<TopicEditorContent>({
  content: '',
  setContent: () => {},
})
