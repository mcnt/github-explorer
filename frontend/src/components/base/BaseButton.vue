<template>
  <button
    :class="classes"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    :aria-disabled="isDisabled || undefined"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="base-button__loader" />

    <span v-else class="base-button__content">
      <i v-if="icon && !iconRight" :class="['base-button__icon', icon]" />
      <span v-if="$slots.default" class="base-button__text">
        <slot />
      </span>
      <i v-if="icon && iconRight" :class="['base-button__icon', icon]" />
    </span>
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const variants = ['primary', 'secondary', 'outline', 'text', 'danger'] as const;
const sizes = ['small', 'medium', 'large'] as const;

type Variant = typeof variants[number];
type Size = typeof sizes[number];

const props = withDefaults(defineProps<{
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconRight?: boolean;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
}>(), {
  variant: 'primary',
  size: 'medium',
  icon: '',
  iconRight: false,
  block: false,
  disabled: false,
  loading: false
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const isDisabled = computed(() => props.disabled || props.loading);

const classes = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--block': props.block,
    'base-button--loading': props.loading
  }
]);
</script>
<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: none;
  border-radius: 999px;

  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

/* ===== Variants ===== */

.base-button--primary {
  background: var(--primary);
  color: #fff;
}

.base-button--secondary {
  background: #e5e7eb;
  color: #111;
}

.base-button--outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.base-button--text {
  background: transparent;
  color: var(--primary);
  padding: 0;
}

.base-button--danger {
  background: #dc2626;
  color: #fff;
}

/* ===== Hover ===== */

.base-button:hover:not(:disabled) {
  filter: brightness(0.95);
}

/* ===== Sizes ===== */

.base-button--small {
  height: 32px;
  padding: 0 14px;
  font-size: 0.875rem;
}

.base-button--medium {
  height: 40px;
  padding: 0 20px;
  font-size: 1rem;
}

.base-button--large {
  height: 48px;
  padding: 0 28px;
  font-size: 1.125rem;
}

/* ===== States ===== */

.base-button--block {
  width: 100%;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== Loading ===== */

.base-button--loading {
  pointer-events: none;
}

.base-button__loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

</style>
