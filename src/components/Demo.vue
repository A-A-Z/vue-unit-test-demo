<script setup lang="ts">
import { computed, ref } from 'vue'

const MIN = 0
const MAX = 20

const count = ref<number>(0)

const canDecrement = computed(() => count.value > MIN)
const canIncrement = computed(() => count.value < MAX)

function increment(): void {
  if (!canIncrement.value) return
  count.value += 1
}

function decrement(): void {
  if (!canDecrement.value) return
  count.value -= 1
}
</script>

<template>
  <section
    aria-labelledby="counter-title"
    class="counter"
  >
    <!-- Visible label + live region so assistive tech hears updates -->
    <h2
      id="counter-title"
      aria-live="polite"
      aria-atomic="true"
    >
      Counter: {{ count }}
    </h2>

    <div
      class="controls"
      role="group"
      aria-label="Counter controls"
    >
      <button
        type="button"
        @click="decrement"
        :disabled="!canDecrement"
        aria-label="Decrease counter by 1"
      >
        -1
      </button>
      
      <button
        type="button"
        @click="increment"
        :disabled="!canIncrement"
        aria-label="Increase counter by 1"
      >
        +1
      </button>
    </div>

    <!-- Helpful context for screen readers and sighted users -->
    <p class="hint" id="counter-hint">
      Range: {{ MIN }} to {{ MAX }}.
    </p>
  </section>
</template>

<style scoped>
.counter {
  display: grid;
  gap: 12px;
  max-width: 320px;
}

.controls {
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid currentColor;
  background: transparent;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}

.hint {
  margin: 0;
  font-size: 0.9rem;
}
</style>
