<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 }
})

const emit = defineEmits(['update:modelValue'])
const hover = ref(0)

function pick(n) {
  emit('update:modelValue', n)
}
</script>

<template>
  <div class="stars" dir="ltr" @mouseleave="hover = 0">
    <span
      v-for="n in 10"
      :key="n"
      class="star"
      :class="{ on: n <= (hover || modelValue) }"
      @mouseenter="hover = n"
      @click="pick(n)"
    >★</span>
  </div>
</template>

<style scoped>
.stars {
  display: inline-flex;
  gap: 2px;
}

.star {
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
  color: #3a3f55;
  transition: color 0.15s, transform 0.15s;
}

.star:hover {
  transform: scale(1.15);
}

.star.on {
  color: var(--amber);
}
</style>
