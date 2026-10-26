<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'
import TitleCard from '../components/TitleCard.vue'

const titles = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await api.get('/favorites')
    titles.value = res.data.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container watchlist">
    <h1>لیست من</h1>

    <div v-if="loading" class="page-loading">در حال بارگذاری...</div>

    <template v-else>
      <div v-if="titles.length" class="grid">
        <TitleCard v-for="t in titles" :key="t.id" :title="t" />
      </div>
      <p v-else class="empty-state">
        لیستت خالیه. از صفحات فیلم و سریال به لیستت اضافه کن.
      </p>
    </template>
  </div>
</template>

<style scoped>
.watchlist {
  padding-top: 34px;
  min-height: 60vh;
}
</style>
