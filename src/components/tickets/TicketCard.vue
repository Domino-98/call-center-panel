<script setup lang="ts">
import type { Ticket } from '@/types/ticket'
import StatusBadge from '@/components/tickets/StatusBadge.vue'
import PriorityBadge from '@/components/tickets/PriorityBadge.vue'

defineProps<{
  ticket: Ticket
}>()
</script>

<template>
  <article
    class="ticket-card"
    tabindex="0"
    role="link"
    :aria-label="`Ticket #${ticket.id}: ${ticket.subject}`"
    @click="$router.push({ name: 'ticket-details', params: { id: ticket.id } })"
    @keydown.enter="$router.push({ name: 'ticket-details', params: { id: ticket.id } })"
  >
    <div class="ticket-card__header">
      <span class="ticket-card__id">#{{ ticket.id }}</span>
      <PriorityBadge :priority="ticket.priority" />
    </div>
    <h3 class="ticket-card__subject">{{ ticket.subject }}</h3>
    <p class="ticket-card__customer">{{ ticket.customerName }}</p>
    <div class="ticket-card__footer">
      <StatusBadge :status="ticket.status" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.ticket-card {
  @include card;
  padding: $spacing-md;
  cursor: pointer;
  transition: box-shadow $transition-fast, border-color $transition-fast;

  &:hover {
    box-shadow: $shadow-md;
    border-color: $color-primary-light;
  }

  &:focus-visible {
    @include focus-ring;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-sm;
  }

  &__id {
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-primary;
  }

  &__subject {
    font-size: $font-size-base;
    font-weight: 600;
    color: $color-text;
    margin-bottom: $spacing-xs;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__customer {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $spacing-md;
  }

  &__footer {
    display: flex;
    align-items: center;
  }
}
</style>
