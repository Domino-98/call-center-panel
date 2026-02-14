<script setup lang="ts">
import { CircleCheck, XCircle, Info, X } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast'
import type { ToastType } from '@/composables/useToast'

const { toasts, dismiss } = useToast()

const icons: Record<ToastType, typeof CircleCheck> = {
  success: CircleCheck,
  error: XCircle,
  info: Info,
}
</script>

<template>
  <Teleport to="body">
    <div class="toast-container" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast--${toast.type}`]"
          role="status"
        >
          <component
            :is="icons[toast.type]"
            :size="18"
            class="toast__icon"
            aria-hidden="true"
          />
          <span class="toast__message">{{ toast.message }}</span>
          <button
            class="toast__dismiss"
            aria-label="Zamknij powiadomienie"
            @click="dismiss(toast.id)"
          >
            <X :size="14" aria-hidden="true" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  bottom: $spacing-xl;
  right: $spacing-xl;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  pointer-events: none;

  @include respond-to(sm) {
    left: $spacing-md;
    right: $spacing-md;
    bottom: $spacing-md;
  }
}

.toast {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-md $spacing-lg;
  min-width: 280px;
  max-width: 420px;
  background: $color-bg-card;
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
  pointer-events: auto;

  @include respond-to(sm) {
    min-width: 0;
    max-width: none;
  }

  &--success {
    border-left: 3px solid $color-status-closed;

    .toast__icon { color: $color-status-closed; }
  }

  &--error {
    border-left: 3px solid $color-priority-high;

    .toast__icon { color: $color-priority-high; }
  }

  &--info {
    border-left: 3px solid $color-status-new;

    .toast__icon { color: $color-status-new; }
  }

  &__icon {
    flex-shrink: 0;
  }

  &__message {
    flex: 1;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-text;
  }

  &__dismiss {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    background: none;
    border: none;
    border-radius: $radius-sm;
    color: $color-text-muted;
    transition: color $transition-fast, background-color $transition-fast;

    &:hover {
      color: $color-text;
      background-color: $color-bg-hover;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }
}

.toast-enter-active {
  transition: all 300ms ease;
}

.toast-leave-active {
  transition: all 200ms ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}

.toast-move {
  transition: transform 200ms ease;
}
</style>
