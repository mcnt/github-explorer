<template>
  <div class="base-input" :class="rootClasses">
    <label
      v-if="label"
      :for="inputId"
      class="base-input__label"
    >
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <div class="base-input__wrapper">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : undefined"
        :class="inputClasses"
        @input="onInput"
      />

      <span v-if="$slots.prefix" class="base-input__icon prefix">
        <slot name="prefix" />
      </span>

      <span v-if="$slots.suffix" class="base-input__icon suffix">
        <slot name="suffix" />
      </span>
    </div>

    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="base-input__error"
    >
      <i class="fas fa-exclamation-circle" />
      <span>{{ error }}</span>
    </p>
  </div>
</template>
<script setup lang="ts">
import { computed, useId, useSlots } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: string | number;
  id?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}>(), {
  modelValue: '',
  type: 'text',
  label: '',
  placeholder: '',
  error: '',
  disabled: false,
  required: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const generatedId = useId();
const inputId = computed(() => props.id ?? `input-${generatedId}`);

const rootClasses = computed(() => ({
  'has-error': Boolean(props.error)
}));

const slots = useSlots();

const inputClasses = computed(() => [
  'base-input__field',
  {
    'has-prefix': !!slots?.prefix,
    'has-suffix': !!slots?.suffix
  }
]);

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<style scoped>
.base-input {
  margin-bottom: var(--space-4);
  width: 100%;
}

.base-input__label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
  color: var(--text);
  font-size: var(--text-sm);
}

.base-input__wrapper {
  position: relative;
}

.base-input__field {
  width: 100%;
  height: 44px;
  padding: 0 14px;
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--text);
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  font-family: var(--font-sans);
}

.base-input__field:focus {
  outline: 0;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
}

.base-input__field:disabled {
  background-color: var(--gray-100);
  opacity: 0.7;
  cursor: not-allowed;
}

.base-input__field.has-prefix { padding-left: 44px; }
.base-input__field.has-suffix { padding-right: 44px; }

.base-input__icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  pointer-events: none;
}

.base-input__icon.prefix { left: var(--space-3); }
.base-input__icon.suffix { right: var(--space-3); }

.base-input__error {
  margin-top: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--danger);
  font-size: var(--text-sm);
}

.has-error .base-input__field {
  border-color: var(--danger);
}

.has-error .base-input__field:focus {
  border-color: var(--danger);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--danger) 20%, transparent);
}
</style>
