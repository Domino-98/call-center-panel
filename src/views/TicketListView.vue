<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FileText } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/tickets'
import type { TicketStatus } from '@/types/ticket'
import type { SortKey, SortDir } from '@/components/tickets/TicketTable.vue'
import TicketFilters from '@/components/tickets/TicketFilters.vue'
import TicketTable from '@/components/tickets/TicketTable.vue'
import TicketCard from '@/components/tickets/TicketCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { pluralize } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const store = useTicketsStore()

const validStatuses = ['new', 'in_progress', 'closed'] as const
const validSortKeys = ['id', 'customerName', 'subject', 'status', 'priority'] as const

const activeFilter = computed<TicketStatus | 'all'>(() => {
  const q = route.query.status as string
  return validStatuses.includes(q as TicketStatus) ? (q as TicketStatus) : 'all'
})

const sortKey = computed<SortKey>(() => {
  const q = route.query.sort as string
  return validSortKeys.includes(q as SortKey) ? (q as SortKey) : 'id'
})

const sortDir = computed<SortDir>(() => {
  return route.query.dir === 'desc' ? 'desc' : 'asc'
})

watch(activeFilter, (val) => store.setFilter(val), { immediate: true })

function onFilterChange(status: TicketStatus | 'all') {
  const query: Record<string, string> = {}
  if (status !== 'all') query.status = status
  if (sortKey.value !== 'id') query.sort = sortKey.value
  if (sortDir.value !== 'asc') query.dir = sortDir.value
  router.replace({ query })
}

function onSortChange(key: SortKey, dir: SortDir) {
  const query: Record<string, string> = {}
  if (activeFilter.value !== 'all') query.status = activeFilter.value
  if (key !== 'id') query.sort = key
  if (dir !== 'asc') query.dir = dir
  router.replace({ query })
}

onMounted(() => {
  if (store.tickets.length === 0) {
    store.fetchTickets()
  }
})
</script>

<template>
  <div class="ticket-list">
    <div class="ticket-list__header">
      <div>
        <h1 class="ticket-list__title">Tickety</h1>
        <p class="ticket-list__subtitle">Przeglądaj i zarządzaj ticketami klientów</p>
      </div>
      <div class="ticket-list__count" aria-live="polite">
        {{ pluralize(store.filteredTickets.length, 'ticket', 'tickety', 'ticketów') }}
      </div>
    </div>

    <TicketFilters
      :active-filter="activeFilter"
      @update:active-filter="onFilterChange"
    />

    <LoadingSpinner v-if="store.isLoading" label="Ładowanie ticketów..." />

    <template v-else-if="store.filteredTickets.length > 0">
      <h2 class="sr-only">Lista ticketów</h2>
      <!-- v-if + matchMedia would skip rendering the hidden one,
           but for ~10 items it's not worth the complexity. -->
      <div class="ticket-list__desktop">
        <TicketTable
          :tickets="store.filteredTickets"
          :sort-key="sortKey"
          :sort-dir="sortDir"
          @sort="onSortChange"
        />
      </div>

      <div class="ticket-list__mobile">
        <TicketCard
          v-for="ticket in store.filteredTickets"
          :key="ticket.id"
          :ticket="ticket"
        />
      </div>
    </template>

    <div v-else class="ticket-list__empty" role="status">
      <FileText :size="48" :stroke-width="1.5" aria-hidden="true" />
      <p>Nie znaleziono ticketów dla tego filtra.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ticket-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;

  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: $spacing-ms;

    @include respond-to(sm) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $color-text;
    letter-spacing: -0.025em;
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: $color-text-muted;
    margin-top: $spacing-xs;
  }

  &__count {
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-text-secondary;
    white-space: nowrap;
    padding: $spacing-xs $spacing-sm;
    background: $color-bg-hover;
    border-radius: $radius-md;
  }

  &__desktop {
    display: block;

    @include respond-to(md) {
      display: none;
    }
  }

  &__mobile {
    display: none;
    flex-direction: column;
    gap: $spacing-sm;

    @include respond-to(md) {
      display: flex;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-2xl;
    color: $color-text-muted;
    text-align: center;

    p {
      font-size: $font-size-sm;
    }
  }
}
</style>
