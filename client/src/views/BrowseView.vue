<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'
import TitleCard from '../components/TitleCard.vue'
import Pagination from '../components/Pagination.vue'

const route = useRoute()

const titles = ref([])
const genres = ref([])
const total = ref(0)
const pages = ref(1)
const loading = ref(true)

const genre = ref(route.query.genre || '')
const sort = ref('newest')
const page = ref(Number(route.query.page) || 1)

const heading = computed(() => {
  if (route.meta.search) {
    return route.query.q ? 'نتایج جستجو برای «' + route.query.q + '»' : 'جستجو'
  }
  return route.meta.heading || 'همه عنوان‌ها'
})

async function load() {
  loading.value = true
  try {
    const params = { page: page.value, limit: 12, sort: sort.value }

    if (route.meta.type) params.type = route.meta.type
    if (route.meta.search && route.query.q) params.q = route.query.q
    if (genre.value) params.genre = genre.value

    const res = await api.get('/titles', { params })
    titles.value = res.data.data
    total.value = res.data.total
    pages.value = res.data.pages
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

watch(() => route.fullPath, () => {
  genre.value = route.query.genre || ''
  page.value = Number(route.query.page) || 1
  load()
})

watch([genre, sort], () => {
  page.value = 1
  load()
})

function goPage(p) {
  page.value = p
  load()
}

onMounted(async () => {
  try {
    const res = await api.get('/genres')
    genres.value = res.data.data
  } catch (e) {
    console.error(e)
  }
  load()
})
</script>

<template>
  <div class="container browse">
    <h1>{{ heading }}</h1>

    <div class="filters">
      <div class="field">
        <label>ژانر</label>
        <select v-model="genre">
          <option value="">همه ژانرها</option>
          <option v-for="g in genres" :key="g.id" :value="g.slug">{{ g.name }}</option>
        </select>
      </div>

      <div class="field">
        <label>مرتب‌سازی</label>
        <select v-model="sort">
          <option value="newest">جدیدترین</option>
          <option value="rating">بالاترین امتیاز</option>
          <option value="popular">محبوب‌ترین</option>
          <option value="year">سال انتشار</option>
        </select>
      </div>
    </div>

    <p class="count">{{ total }} عنوان پیدا شد</p>

    <div v-if="loading" class="page-loading">در حال بارگذاری...</div>

    <template v-else>
      <div v-if="titles.length" class="grid">
        <TitleCard v-for="t in titles" :key="t.id" :title="t" />
      </div>
      <p v-else class="empty-state">چیزی پیدا نشد. فیلترها رو تغییر بده.</p>
    </template>

    <Pagination :page="page" :pages="pages" @go="goPage" />
  </div>
</template>

<style scoped>
.browse {
  padding-top: 34px;
  min-height: 60vh;
}

.filters {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.filters .field {
  min-width: 190px;
  margin-bottom: 6px;
}

.count {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 20px;
}
</style>
