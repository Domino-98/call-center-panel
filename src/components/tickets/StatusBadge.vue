<script setup lang="ts">
import { computed } from 'vue'
import type { TicketStatus } from '@/types/ticket'
import { STATUS_LABELS } from '@/types/ticket'

const props = defineProps<{
  status: TicketStatus
}>()

const label = computed(() => STATUS_LABELS[props.status])
</script>

<template>
  <span :class="['status-badge', `status-badge--${status}`]">
    {{ label }}
  </span>
</template>

<style lang="scss" scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: $spacing-xs $spacing-sm;
  font-size: $font-size-xs;
  font-weight: 600;
  line-height: 1;
  border-radius: 9999px;
  white-space: nowrap;

  &--new {
    color: $color-status-new;
    background-color: $color-status-new-bg;
    border: 1px solid $color-status-new-border;
  }

  &--in_progress {
    color: $color-status-in-progress;
    background-color: $color-status-in-progress-bg;
    border: 1px solid $color-status-in-progress-border;
  }

  &--closed {
    color: $color-status-closed;
    background-color: $color-status-closed-bg;
    border: 1px solid $color-status-closed-border;
  }
}
</style>
