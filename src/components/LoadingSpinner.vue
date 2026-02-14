<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="loading" role="status" :aria-label="label || 'Ładowanie'">
    <div class="loading__spinner" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.2" />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </div>
    <span v-if="label" class="loading__text">{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-md;
  padding: $spacing-2xl;
  color: $color-primary;

  &__spinner {
    animation: spin 0.8s linear infinite;
  }

  &__text {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
