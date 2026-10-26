<script setup>
defineProps({
  page: { type: Number, required: true },
  pages: { type: Number, required: true }
})

const emit = defineEmits(['go'])
</script>

<template>
  <div v-if="pages > 1" class="pager">
    <button class="btn btn-outline btn-sm" :disabled="page <= 1" @click="emit('go', page - 1)">قبلی</button>
    <span class="info">صفحه {{ page }} از {{ pages }}</span>
    <button class="btn btn-outline btn-sm" :disabled="page >= pages" @click="emit('go', page + 1)">بعدی</button>
  </div>
</template>

<style scoped>
.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 36px 0 10px;
}

.info {
  color: var(--muted);
  font-size: 13px;
}
</style>
