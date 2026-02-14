<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, AlertCircle } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/tickets'
import { useToast } from '@/composables/useToast'
import type { TicketStatus } from '@/types/ticket'
import { STATUS_LABELS } from '@/types/ticket'
import { formatDateTime } from '@/utils/format'
import StatusBadge from '@/components/tickets/StatusBadge.vue'
import PriorityBadge from '@/components/tickets/PriorityBadge.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import CustomSelect from '@/components/CustomSelect.vue'

const route = useRoute()
const router = useRouter()
const store = useTicketsStore()
const toast = useToast()

const isSaving = ref(false)
const selectedStatus = ref<TicketStatus>('new')

const ticketId = computed(() => Number(route.params.id))
const ticket = computed(() => store.getTicketById(ticketId.value))

const statusOptions: { value: TicketStatus; label: string }[] = [
  { value: 'new', label: STATUS_LABELS.new },
  { value: 'in_progress', label: STATUS_LABELS.in_progress },
  { value: 'closed', label: STATUS_LABELS.closed },
]

onMounted(async () => {
  if (store.tickets.length === 0) {
    await store.fetchTickets()
  }
  if (ticket.value) {
    selectedStatus.value = ticket.value.status
  }
})

async function handleSave() {
  if (!ticket.value || selectedStatus.value === ticket.value.status) return

  isSaving.value = true
  await store.updateTicketStatus(ticketId.value, selectedStatus.value)
  isSaving.value = false
  toast.show(`Status zmieniono na „${STATUS_LABELS[selectedStatus.value]}"`, 'success')
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="ticket-details">
    <nav class="ticket-details__breadcrumb" aria-label="Nawigacja">
      <button class="ticket-details__back" @click="goBack">
        <ArrowLeft :size="20" aria-hidden="true" />
        Powrót do listy
      </button>
    </nav>

    <LoadingSpinner v-if="store.isLoading" label="Ładowanie szczegółów ticketu..." />

    <div v-else-if="ticket" class="ticket-details__content">
      <div class="ticket-details__main">
        <header class="ticket-details__header">
          <div class="ticket-details__meta">
            <span class="ticket-details__id">#{{ ticket.id }}</span>
            <StatusBadge :status="ticket.status" />
            <PriorityBadge :priority="ticket.priority" />
          </div>
          <h1 class="ticket-details__title">{{ ticket.subject }}</h1>
          <div class="ticket-details__info">
            <span>Od <strong>{{ ticket.customerName }}</strong></span>
            <span class="ticket-details__date">
              <span class="ticket-details__separator" aria-hidden="true">&middot;</span>
              <time :datetime="ticket.createdAt">{{ formatDateTime(ticket.createdAt) }}</time>
            </span>
          </div>
        </header>

        <section class="ticket-details__description" aria-label="Opis ticketu">
          <h2 class="ticket-details__section-title">Opis</h2>
          <p>{{ ticket.description }}</p>
        </section>
      </div>

      <aside class="ticket-details__sidebar" aria-label="Akcje ticketu">
        <div class="ticket-details__status-form">
          <h2 class="ticket-details__section-title">Zmień status</h2>
          <CustomSelect
            id="status-select"
            v-model="selectedStatus"
            label="Status"
            :options="statusOptions"
          />
          <button
            class="ticket-details__save-btn"
            :disabled="isSaving || selectedStatus === ticket.status"
            @click="handleSave"
          >
            <template v-if="isSaving">
              <span class="ticket-details__save-spinner" aria-hidden="true" />
              Zapisywanie...
            </template>
            <template v-else>
              Zapisz
            </template>
          </button>
        </div>

        <div class="ticket-details__info-grid">
          <h2 class="ticket-details__section-title">Szczegóły</h2>
          <dl>
            <div class="ticket-details__info-row">
              <dt>Klient</dt>
              <dd>{{ ticket.customerName }}</dd>
            </div>
            <div class="ticket-details__info-row">
              <dt>Priorytet</dt>
              <dd><PriorityBadge :priority="ticket.priority" /></dd>
            </div>
            <div class="ticket-details__info-row">
              <dt>Status</dt>
              <dd><StatusBadge :status="ticket.status" /></dd>
            </div>
            <div class="ticket-details__info-row">
              <dt>Utworzono</dt>
              <dd>
                <time :datetime="ticket.createdAt">{{ formatDateTime(ticket.createdAt) }}</time>
              </dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>

    <div v-else class="ticket-details__not-found">
      <AlertCircle :size="48" :stroke-width="1.5" aria-hidden="true" />
      <h1>Nie znaleziono ticketu</h1>
      <p>Ticket, którego szukasz, nie istnieje lub został usunięty.</p>
      <button class="ticket-details__back-btn" @click="goBack">
        Powrót do listy
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ticket-details {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;

  &__breadcrumb {
    display: flex;
  }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-text-secondary;
    background: none;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    transition: all $transition-fast;

    &:hover {
      color: $color-primary;
      border-color: $color-primary-light;
      background-color: rgba($color-primary, 0.04);
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: $spacing-xl;
    align-items: start;

    @include respond-to(lg) {
      grid-template-columns: 1fr;
      gap: $spacing-md;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__header {
    @include card;
    padding: $spacing-xl;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
    flex-wrap: wrap;
  }

  &__id {
    font-size: $font-size-sm;
    font-weight: 700;
    color: $color-primary;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: 700;
    color: $color-text;
    letter-spacing: -0.025em;
    margin-bottom: $spacing-sm;

    @include respond-to(sm) {
      font-size: $font-size-lg;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-size: $font-size-sm;
    color: $color-text-muted;
    flex-wrap: wrap;

    strong {
      color: $color-text-secondary;
    }

    time {
      white-space: nowrap;
    }
  }

  &__date {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    white-space: nowrap;
  }

  &__description {
    @include card;
    padding: $spacing-xl;

    p {
      font-size: $font-size-base;
      line-height: 1.7;
      color: $color-text-secondary;
    }
  }

  &__section-title {
    font-size: $font-size-sm;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: $color-text-muted;
    margin-bottom: $spacing-md;
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__status-form {
    @include card;
    padding: $spacing-lg;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__save-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
    width: 100%;
    padding: $spacing-ms $spacing-md;
    font-size: $font-size-sm;
    font-weight: 600;
    color: #fff;
    background: $color-primary;
    border: none;
    border-radius: $radius-md;
    transition: background-color $transition-fast, opacity $transition-fast;
    margin-top: $spacing-xs;

    &:hover:not(:disabled) {
      background: $color-primary-hover;
    }

    &:focus-visible {
      @include focus-ring;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__save-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  &__info-grid {
    @include card;
    padding: $spacing-lg;

    dl {
      margin: 0;
    }
  }

  &__info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm 0;

    &:not(:last-child) {
      border-bottom: 1px solid $color-border-light;
    }

    dt {
      font-size: $font-size-sm;
      color: $color-text-muted;
    }

    dd {
      margin: 0;
      font-size: $font-size-sm;
      font-weight: 500;
      color: $color-text;
      text-align: right;
    }
  }

  &__not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-2xl;
    text-align: center;
    color: $color-text-muted;

    h1 {
      font-size: $font-size-lg;
      color: $color-text;
    }

    p {
      font-size: $font-size-sm;
    }
  }

  &__back-btn {
    padding: $spacing-sm $spacing-lg;
    font-size: $font-size-sm;
    font-weight: 600;
    color: #fff;
    background: $color-primary;
    border: none;
    border-radius: $radius-md;
    transition: background-color $transition-fast;
    margin-top: $spacing-sm;

    &:hover {
      background: $color-primary-hover;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
