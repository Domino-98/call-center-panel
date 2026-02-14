<script setup lang="ts">
import { computed } from 'vue'
import type { TicketPriority } from '@/types/ticket'
import { PRIORITY_LABELS } from '@/types/ticket'

const props = defineProps<{
  priority: TicketPriority
}>()

const label = computed(() => PRIORITY_LABELS[props.priority])
</script>

<template>
  <span :class="['priority-badge', `priority-badge--${priority}`]">
    {{ label }}
  </span>
</template>

<style lang="scss" scoped>
.priority-badge {
  display: inline-flex;
  align-items: center;
  padding: $spacing-xs $spacing-sm;
  font-size: $font-size-xs;
  font-weight: 600;
  line-height: 1;
  border-radius: $radius-sm;
  white-space: nowrap;

  &--high {
    color: $color-priority-high;
    background-color: $color-priority-high-bg;
  }

  &--medium {
    color: $color-priority-medium;
    background-color: $color-priority-medium-bg;
  }

  &--low {
    color: $color-priority-low;
    background-color: $color-priority-low-bg;
  }
}
</style>
