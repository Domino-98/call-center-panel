import type { Ticket, TicketStatus } from '@/types/ticket'
import { mockTickets } from '@/data/tickets'

const DELAY_FETCH = 600
const DELAY_UPDATE = 400

// Simulates API GET /tickets
export async function getTickets(): Promise<Ticket[]> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_FETCH))
  return mockTickets
}

// Simulates API PUT /tickets/:id/status
export async function updateTicketStatus(
  tickets: Ticket[],
  id: number,
  status: TicketStatus,
): Promise<Ticket | undefined> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_UPDATE))
  const ticket = tickets.find((t) => t.id === id)
  if (ticket) ticket.status = status
  return ticket
}
