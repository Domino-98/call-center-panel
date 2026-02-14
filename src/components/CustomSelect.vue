<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { ChevronDown, Check } from 'lucide-vue-next'

export interface SelectOption {
  value: string
  label: string
}

const props = defineProps<{
  modelValue: string
  options: SelectOption[]
  label: string
  id: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const activeIndex = ref(-1)
const triggerRef = ref<HTMLElement | null>(null)
const listboxRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() =>
  props.options.find((o) => o.value === props.modelValue)
)

const listboxId = computed(() => `${props.id}-listbox`)
const activeDescendantId = computed(() =>
  activeIndex.value >= 0 ? `${props.id}-option-${activeIndex.value}` : undefined
)

function open() {
  isOpen.value = true
  activeIndex.value = Math.max(0, props.options.findIndex((o) => o.value === props.modelValue))
}

function close() {
  isOpen.value = false
  activeIndex.value = -1
  triggerRef.value?.focus()
}

function selectOption(index: number) {
  const option = props.options[index]
  if (option) {
    emit('update:modelValue', option.value)
    close()
  }
}

function handleTriggerKeydown(e: KeyboardEvent) {
  if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
    e.preventDefault()
    open()
  }
}

function handleListboxKeydown(e: KeyboardEvent) {
  const len = props.options.length
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % len
      scrollActiveIntoView()
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = (activeIndex.value - 1 + len) % len
      scrollActiveIntoView()
      break
    case 'Home':
      e.preventDefault()
      activeIndex.value = 0
      scrollActiveIntoView()
      break
    case 'End':
      e.preventDefault()
      activeIndex.value = len - 1
      scrollActiveIntoView()
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      selectOption(activeIndex.value)
      break
    case 'Escape':
      e.preventDefault()
      close()
      break
    case 'Tab':
      close()
      break
  }
}

function scrollActiveIntoView() {
  listboxRef.value
    ?.querySelector(`[data-index="${activeIndex.value}"]`)
    ?.scrollIntoView({ block: 'nearest' })
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as Node
  if (
    isOpen.value &&
    !triggerRef.value?.contains(target) &&
    !listboxRef.value?.contains(target)
  ) {
    close()
  }
}

watch(isOpen, (val) => {
  if (val) requestAnimationFrame(() => listboxRef.value?.focus())
})

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
  <div class="custom-select">
    <label :id="`${id}-label`" :for="`${id}-trigger`" class="custom-select__label">
      {{ label }}
    </label>
    <button
      :id="`${id}-trigger`"
      ref="triggerRef"
      type="button"
      class="custom-select__trigger"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-labelledby="`${id}-label`"
      :aria-controls="listboxId"
      :aria-activedescendant="activeDescendantId"
      @click="isOpen ? close() : open()"
      @keydown="handleTriggerKeydown"
    >
      <span class="custom-select__value">
        {{ selectedOption?.label ?? 'Wybierz...' }}
      </span>
      <ChevronDown
        :size="16"
        :class="['custom-select__chevron', { 'custom-select__chevron--open': isOpen }]"
        aria-hidden="true"
      />
    </button>

    <Transition name="select-dropdown">
      <ul
        v-show="isOpen"
        :id="listboxId"
        ref="listboxRef"
        role="listbox"
        :aria-labelledby="`${id}-label`"
        class="custom-select__listbox"
        tabindex="-1"
        @keydown="handleListboxKeydown"
      >
        <li
          v-for="(option, index) in options"
          :id="`${id}-option-${index}`"
          :key="option.value"
          :data-index="index"
          role="option"
          :aria-selected="option.value === modelValue"
          :class="[
            'custom-select__option',
            {
              'custom-select__option--active': index === activeIndex,
              'custom-select__option--selected': option.value === modelValue,
            },
          ]"
          @click="selectOption(index)"
          @mouseenter="activeIndex = index"
        >
          <span>{{ option.label }}</span>
          <Check
            v-if="option.value === modelValue"
            :size="16"
            class="custom-select__check"
            aria-hidden="true"
          />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;

  &__label {
    display: block;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-text-secondary;
    margin-bottom: $spacing-xs;
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.625rem $spacing-md;
    font-size: $font-size-sm;
    font-family: inherit;
    color: $color-text;
    background: $color-bg-card;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    cursor: pointer;
    transition: border-color $transition-fast, box-shadow $transition-fast;
    text-align: left;

    &:hover {
      border-color: $color-primary-light;
    }

    &:focus-visible {
      @include focus-ring;
    }

    &[aria-expanded='true'] {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba($color-primary, 0.12);
    }
  }

  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__chevron {
    flex-shrink: 0;
    color: $color-text-muted;
    transition: transform $transition-fast;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__listbox {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    margin: 0;
    padding: $spacing-xs 0;
    list-style: none;
    background: $color-bg-card;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-lg;
    z-index: 50;
    max-height: 200px;
    overflow-y: auto;

    &:focus {
      outline: none;
    }
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem $spacing-md;
    font-size: $font-size-sm;
    color: $color-text;
    cursor: pointer;
    transition: background-color $transition-fast;

    &--active {
      background-color: $color-bg-hover;
    }

    &--selected {
      font-weight: 600;
      color: $color-primary;
    }
  }

  &__check {
    flex-shrink: 0;
    color: $color-primary;
  }
}

.select-dropdown-enter-active,
.select-dropdown-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
  transform-origin: top;
}

.select-dropdown-enter-from,
.select-dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-4px);
}
</style>
