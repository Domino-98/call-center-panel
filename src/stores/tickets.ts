import { defineStore } from 'pinia'
import type { Ticket, TicketStatus } from '@/types/ticket'
import { getTickets, updateTicketStatus } from '@/services/ticketService'

const STORAGE_KEY = 'call-center-panel:tickets'

function loadTickets(): Ticket[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return []
  try {
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : parsed.tickets ?? []
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

function saveTickets(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
}

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    tickets: loadTickets() as Ticket[],
    isLoading: false,
    activeFilter: 'all' as TicketStatus | 'all',
  }),

  getters: {
    filteredTickets(state): Ticket[] {
      if (state.activeFilter === 'all') return state.tickets
      return state.tickets.filter((t) => t.status === state.activeFilter)
    },
    getTicketById(state) {
      return (id: number) => state.tickets.find((t) => t.id === id)
    },
  },

  actions: {
    async fetchTickets() {
      if (this.tickets.length > 0) return

      this.isLoading = true
      this.tickets = await getTickets()
      this.isLoading = false
      saveTickets(this.tickets)
    },

    async updateTicketStatus(id: number, status: TicketStatus) {
      await updateTicketStatus(this.tickets, id, status)
      saveTickets(this.tickets)
    },

    setFilter(filter: TicketStatus | 'all') {
      this.activeFilter = filter
    },
  },
})
