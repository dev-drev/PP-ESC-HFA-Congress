export type SessionMode = 'controller' | 'display'

export interface PresentationState {
  slide: number
  timestamp: number
  [key: string]: unknown
}

export interface SessionData {
  id: string
  session_code: string
  state: PresentationState
  updated_at: string
}

export interface RealtimePayload {
  new: {
    id: string
    session_code: string
    state: PresentationState
    updated_at: string
  }
}