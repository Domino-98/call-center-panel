<script setup lang="ts">
import type { TicketStatus } from '@/types/ticket'

type FilterValue = TicketStatus | 'all'

defineProps<{
  activeFilter: FilterValue
}>()

const emit = defineEmits<{
  'update:activeFilter': [value: FilterValue]
}>()

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'new', label: 'Nowe' },
  { value: 'in_progress', label: 'W trakcie' },
  { value: 'closed', label: 'Zamknięte' },
]
</script>

<template>
  <div class="filters" role="group" aria-label="Filtruj tickety wg statusu">
    <button
      v-for="filter in filters"
      :key="filter.value"
      :class="['filters__btn', { 'filters__btn--active': activeFilter === filter.value }]"
      :aria-pressed="activeFilter === filter.value"
      @click="emit('update:activeFilter', filter.value)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  gap: $spacing-xs;

  @include respond-to(sm) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__btn {
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-text-secondary;
    background: $color-bg-card;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    transition: all $transition-fast;
    cursor: pointer;

    &:hover {
      color: $color-primary;
      border-color: $color-primary-light;
      background-color: rgba($color-primary, 0.04);
    }

    &:focus-visible {
      @include focus-ring;
    }

    &--active {
      color: #fff;
      background-color: $color-primary;
      border-color: $color-primary;

      &:hover {
        color: #fff;
        background-color: $color-primary-hover;
        border-color: $color-primary-hover;
      }
    }
  }
}
</style>
