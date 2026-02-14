export type TicketPriority = 'low' | 'medium' | 'high'
export type TicketStatus = 'new' | 'in_progress' | 'closed'

export interface Ticket {
  id: number
  customerName: string
  subject: string
  description: string
  priority: TicketPriority
  status: TicketStatus
  createdAt: string
}

export const STATUS_LABELS: Record<TicketStatus, string> = {
  new: 'Nowe',
  in_progress: 'W trakcie',
  closed: 'Zamknięte',
}

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
}
