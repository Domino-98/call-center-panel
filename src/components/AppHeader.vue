<script setup lang="ts">
import { Phone } from 'lucide-vue-next'
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <RouterLink to="/" class="app-header__brand" aria-label="Przejdź do listy ticketów">
        <Phone class="app-header__icon" :size="24" aria-hidden="true" />
        <span class="app-header__title">Panel Operatora Call Center</span>
      </RouterLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: $color-bg-card;
  border-bottom: 1px solid $color-border;
  position: sticky;
  top: 0;
  z-index: 100;

  &__inner {
    max-width: $breakpoint-xl;
    margin: 0 auto;
    padding: $spacing-md $spacing-xl;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include respond-to(md) {
      padding: $spacing-md;
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    color: $color-text;
    text-decoration: none;
    transition: opacity $transition-fast;

    &:hover {
      opacity: 0.8;
    }

    &:focus-visible {
      @include focus-ring;
      border-radius: $radius-sm;
    }
  }

  &__icon {
    color: $color-primary;
    flex-shrink: 0;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: 700;
    letter-spacing: -0.025em;

    @include respond-to(sm) {
      font-size: $font-size-base;
    }
  }
}
</style>
