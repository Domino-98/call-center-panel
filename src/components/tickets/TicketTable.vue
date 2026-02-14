<script setup lang="ts">
import { computed } from 'vue'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-vue-next'
import type { Ticket, TicketPriority, TicketStatus } from '@/types/ticket'
import StatusBadge from '@/components/tickets/StatusBadge.vue'
import PriorityBadge from '@/components/tickets/PriorityBadge.vue'

export type SortKey = 'id' | 'customerName' | 'subject' | 'status' | 'priority'
export type SortDir = 'asc' | 'desc'

const props = defineProps<{
  tickets: Ticket[]
  sortKey: SortKey
  sortDir: SortDir
}>()

const emit = defineEmits<{
  sort: [key: SortKey, dir: SortDir]
}>()

const priorityOrder: Record<TicketPriority, number> = { low: 1, medium: 2, high: 3 }
const statusOrder: Record<TicketStatus, number> = { new: 1, in_progress: 2, closed: 3 }

const columns: { key: SortKey; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'customerName', label: 'Klient' },
  { key: 'subject', label: 'Temat' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priorytet' },
]

const sortedTickets = computed(() => {
  const dir = props.sortDir === 'asc' ? 1 : -1
  return [...props.tickets].sort((a, b) => {
    let cmp = 0
    const key = props.sortKey
    switch (key) {
      case 'id':
        cmp = a.id - b.id
        break
      case 'customerName':
      case 'subject':
        cmp = a[key].localeCompare(b[key])
        break
      case 'priority':
        cmp = priorityOrder[a.priority] - priorityOrder[b.priority]
        break
      case 'status':
        cmp = statusOrder[a.status] - statusOrder[b.status]
        break
    }
    return cmp * dir
  })
})

function toggleSort(key: SortKey) {
  if (props.sortKey === key) {
    if (props.sortDir === 'asc') {
      emit('sort', key, 'desc')
    } else {
      emit('sort', 'id', 'asc')
    }
  } else {
    emit('sort', key, 'asc')
  }
}

function ariaSort(key: SortKey): 'none' | 'ascending' | 'descending' {
  if (props.sortKey !== key) return 'none'
  return props.sortDir === 'asc' ? 'ascending' : 'descending'
}
</script>

<template>
  <div class="ticket-table-wrapper">
    <table class="ticket-table" aria-label="Lista ticketów">
      <colgroup>
        <col style="width: 70px" />
        <col style="width: 180px" />
        <col />
        <col style="width: 130px" />
        <col style="width: 120px" />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            :aria-sort="ariaSort(col.key)"
            class="ticket-table__th"
          >
            <button
              class="ticket-table__sort-btn"
              type="button"
              @click="toggleSort(col.key)"
            >
              {{ col.label }}
              <component
                :is="sortKey === col.key
                  ? (sortDir === 'asc' ? ChevronUp : ChevronDown)
                  : ChevronsUpDown"
                :size="12"
                :class="['ticket-table__sort-icon', { 'ticket-table__sort-icon--inactive': sortKey !== col.key }]"
                aria-hidden="true"
              />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="ticket in sortedTickets"
          :key="ticket.id"
          class="ticket-table__row"
          tabindex="0"
          role="link"
          :aria-label="`Ticket #${ticket.id}: ${ticket.subject}`"
          @click="$router.push({ name: 'ticket-details', params: { id: ticket.id } })"
          @keydown.enter="$router.push({ name: 'ticket-details', params: { id: ticket.id } })"
        >
          <td class="ticket-table__id">#{{ ticket.id }}</td>
          <td class="ticket-table__customer">{{ ticket.customerName }}</td>
          <td class="ticket-table__subject">{{ ticket.subject }}</td>
          <td><StatusBadge :status="ticket.status" /></td>
          <td><PriorityBadge :priority="ticket.priority" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.ticket-table-wrapper {
  @include card;
  overflow-x: auto;
}

.ticket-table {
  min-width: 700px;
  table-layout: fixed;

  &__th {
    padding: 0;
    border-bottom: 1px solid $color-border;

    &:first-child .ticket-table__sort-btn { border-top-left-radius: $radius-lg; }
    &:last-child .ticket-table__sort-btn { border-top-right-radius: $radius-lg; }
  }

  &__sort-btn {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    width: 100%;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-xs;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: $color-text-muted;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background-color: $color-bg-hover;
    }

    &:focus-visible {
      @include focus-ring;
      outline-offset: -2px;
    }
  }

  &__sort-icon {
    flex-shrink: 0;

    &--inactive {
      opacity: 0.3;
    }
  }

  &__row {
    cursor: pointer;
    transition: background-color $transition-fast;

    &:hover {
      background-color: $color-bg-hover;
    }

    &:focus-visible {
      @include focus-ring;
      outline-offset: -2px;
    }

    &:not(:last-child) td {
      border-bottom: 1px solid $color-border-light;
    }

    td {
      padding: $spacing-md;
      font-size: $font-size-sm;
      vertical-align: middle;
    }

    &:last-child td:first-child { border-bottom-left-radius: $radius-lg; }
    &:last-child td:last-child { border-bottom-right-radius: $radius-lg; }
  }

  &__id {
    font-weight: 600;
    color: $color-primary;
    white-space: nowrap;
  }

  &__customer {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__subject {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
