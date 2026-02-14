<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import ToastContainer from '@/components/ToastContainer.vue'
</script>

<template>
  <AppHeader />
  <main class="main-content">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <ToastContainer />
</template>

<style lang="scss" scoped>
.main-content {
  flex: 1;
  width: 100%;
  max-width: $breakpoint-xl;
  margin: 0 auto;
  padding: $spacing-lg $spacing-xl;

  @include respond-to(md) {
    padding: $spacing-md;
  }
}
</style>

<style lang="scss">
.page-enter-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.page-leave-active {
  transition: opacity 150ms ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
}
</style>
