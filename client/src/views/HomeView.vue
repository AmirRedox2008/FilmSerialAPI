<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'
import TitleCard from '../components/TitleCard.vue'

const hero = ref(null)
const latestMovies = ref([])
const latestSeries = ref([])
const popular = ref([])
const genres = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [heroRes, moviesRes, seriesRes, popularRes, genresRes] = await Promise.all([
      api.get('/titles', { params: { featured: 'true', limit: 1 } }),
      api.get('/titles', { params: { type: 'movie', limit: 12 } }),
      api.get('/titles', { params: { type: 'series', limit: 12 } }),
      api.get('/titles', { params: { sort: 'popular', limit: 12 } }),
      api.get('/genres')
    ])

    hero.value = heroRes.data.data[0] || null
    latestMovies.value = moviesRes.data.data
    latestSeries.value = seriesRes.data.data
    popular.value = popularRes.data.data
    genres.value = genresRes.data.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div v-if="loading" class="page-loading">در حال بارگذاری...</div>

    <template v-else>
      <section v-if="hero" class="hero" :style="{ backgroundImage: 'url(' + hero.poster + ')' }">
        <div class="hero-overlay">
          <div class="container hero-content">
            <span class="hero-tag">{{ hero.type === 'movie' ? 'فیلم ویژه' : 'سریال ویژه' }}</span>
            <h1>{{ hero.title }}</h1>
            <p class="hero-original">{{ hero.originalTitle }} ({{ hero.year }})</p>
            <p class="hero-desc">{{ hero.description }}</p>
            <div class="hero-actions">
              <router-link :to="'/titles/' + hero.slug" class="btn btn-primary">مشاهده جزئیات</router-link>
              <router-link to="/movies" class="btn btn-outline">فهرست فیلم‌ها</router-link>
            </div>
          </div>
        </div>
      </section>

      <section class="container section">
        <h2 class="chips-title">ژانرها</h2>
        <div class="chips">
          <router-link v-for="g in genres" :key="g.id" :to="'/movies?genre=' + g.slug" class="chip">
            {{ g.name }}
          </router-link>
        </div>
      </section>

      <section class="container section">
        <div class="section-head">
          <h2>تازه‌ترین فیلم‌ها</h2>
          <router-link to="/movies" class="more">مشاهده همه</router-link>
        </div>
        <div class="row">
          <TitleCard v-for="t in latestMovies" :key="t.id" :title="t" class="row-item" />
        </div>
      </section>

      <section class="container section">
        <div class="section-head">
          <h2>تازه‌ترین سریال‌ها</h2>
          <router-link to="/series" class="more">مشاهده همه</router-link>
        </div>
        <div class="row">
          <TitleCard v-for="t in latestSeries" :key="t.id" :title="t" class="row-item" />
        </div>
      </section>

      <section class="container section">
        <div class="section-head">
          <h2>محبوب‌ترین‌ها</h2>
        </div>
        <div class="row">
          <TitleCard v-for="t in popular" :key="t.id" :title="t" class="row-item" />
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.hero {
  background-size: cover;
  background-position: center 20%;
  position: relative;
}

.hero-overlay {
  background: linear-gradient(to top, var(--bg) 8%, rgba(13, 15, 20, 0.75) 55%, rgba(13, 15, 20, 0.55));
  padding: 90px 0 50px;
}

.hero-content {
  max-width: 640px;
}

.hero-tag {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  padding: 2px 12px;
  border-radius: 6px;
  margin-bottom: 14px;
}

.hero h1 {
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 4px;
}

.hero-original {
  color: var(--muted);
  font-size: 15px;
  margin-bottom: 14px;
}

.hero-desc {
  color: #c6cad6;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 24px;
}

.hero-actions {
  display: flex;
  gap: 12px;
}

.chips-title {
  margin-bottom: 14px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.row {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 158px;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 12px;
}

@media (max-width: 600px) {
  .hero h1 {
    font-size: 27px;
  }

  .row {
    grid-auto-columns: 132px;
    gap: 10px;
  }
}
</style>
