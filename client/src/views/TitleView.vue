<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'
import { user } from '../auth'
import Stars from '../components/Stars.vue'

const route = useRoute()

const title = ref(null)
const loading = ref(true)
const notFound = ref(false)

const myScore = ref(0)
const inList = ref(false)
const reviewBody = ref('')
const reviewMsg = ref('')
const reviewOk = ref(false)
const sending = ref(false)
const season = ref(1)

const currentSeason = computed(() => {
  if (!title.value) return null
  return title.value.seasons.find(s => s.number === season.value)
})

const genreBase = computed(() => {
  if (!title.value) return '/movies'
  return title.value.type === 'series' ? '/series' : '/movies'
})

function durationText() {
  if (title.value.type === 'movie') {
    return title.value.duration ? title.value.duration + ' دقیقه' : ''
  }
  return title.value.seasons.length + ' فصل'
}

function faDate(d) {
  return new Date(d).toLocaleDateString('fa-IR')
}

async function load() {
  loading.value = true
  notFound.value = false
  try {
    const res = await api.get('/titles/' + route.params.slug)
    title.value = res.data.data

    if (title.value.seasons.length) {
      season.value = title.value.seasons[0].number
    }

    if (user.value) {
      const favRes = await api.get('/favorites')
      inList.value = favRes.data.data.some(t => t.id === title.value.id)
    }
  } catch {
    notFound.value = true
  } finally {
    loading.value = false
  }
}

async function toggleList() {
  try {
    if (inList.value) {
      await api.delete('/favorites/' + title.value.id)
      inList.value = false
    } else {
      await api.post('/favorites/' + title.value.id)
      inList.value = true
    }
  } catch (e) {
    console.error(e)
  }
}

async function sendScore() {
  if (!myScore.value) return
  try {
    const res = await api.post('/titles/' + title.value.id + '/rate', { score: myScore.value })
    title.value.rating = res.data.rating
    title.value.votes = res.data.votes
  } catch (e) {
    console.error(e)
  }
}

async function sendReview() {
  reviewMsg.value = ''
  reviewOk.value = false

  if (reviewBody.value.trim().length < 5) {
    reviewMsg.value = 'متن نظر خیلی کوتاهه'
    return
  }

  sending.value = true
  try {
    const res = await api.post('/titles/' + title.value.id + '/reviews', { body: reviewBody.value })
    title.value.reviews.unshift(res.data.data)
    reviewBody.value = ''
    reviewMsg.value = 'نظرت ثبت شد'
    reviewOk.value = true
  } catch (e) {
    reviewMsg.value = (e.response && e.response.data.message) || 'خطا در ثبت نظر'
  } finally {
    sending.value = false
  }
}

watch(() => route.params.slug, load)
onMounted(load)
</script>

<template>
  <div>
    <div v-if="loading" class="page-loading">در حال بارگذاری...</div>

    <div v-else-if="notFound" class="container">
      <p class="empty-state">این عنوان پیدا نشد.</p>
    </div>

    <template v-else>
      <section class="detail-hero" :style="{ backgroundImage: 'url(' + title.poster + ')' }">
        <div class="detail-overlay">
          <div class="container detail-inner">
            <img class="detail-poster" :src="title.poster" :alt="title.title" @error="$event.target.style.visibility = 'hidden'" />
            <div class="detail-info">
              <h1>{{ title.title }}</h1>
              <p class="original">{{ title.originalTitle }} ({{ title.year }})</p>

              <div class="facts">
                <span class="score">{{ title.rating.toFixed(1) }}</span>
                <span>{{ durationText() }}</span>
                <span v-if="title.country">{{ title.country }}</span>
                <span>{{ title.votes.toLocaleString('fa-IR') }} رأی</span>
              </div>

              <div class="genre-chips">
                <router-link v-for="g in title.genres" :key="g.genreId" :to="genreBase + '?genre=' + g.genre.slug" class="chip">
                  {{ g.genre.name }}
                </router-link>
              </div>

              <div v-if="user" class="rate-box">
                <span class="rate-label">امتیازت چنده؟</span>
                <Stars v-model="myScore" />
                <button class="btn btn-primary btn-sm" @click="sendScore">ثبت امتیاز</button>
              </div>

              <button class="btn list-btn" :class="inList ? 'btn-outline' : 'btn-primary'" @click="toggleList">
                {{ inList ? 'حذف از لیست من' : 'افزودن به لیست من' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="container section">
        <h2 class="sec-title">داستان</h2>
        <p class="story">{{ title.description }}</p>
      </section>

      <section v-if="title.cast.length" class="container section">
        <h2 class="sec-title">بازیگران</h2>
        <div class="cast">
          <div v-for="(p, i) in title.cast" :key="i" class="cast-item">
            <span class="cast-name">{{ p.name }}</span>
            <span class="cast-role">{{ p.character }}</span>
          </div>
        </div>
      </section>

      <section v-if="title.type === 'series' && title.seasons.length" class="container section">
        <h2 class="sec-title">قسمت‌ها</h2>
        <div class="season-btns">
          <button
            v-for="s in title.seasons"
            :key="s.id"
            :class="{ active: s.number === season }"
            @click="season = s.number"
          >فصل {{ s.number }}</button>
        </div>

        <ul v-if="currentSeason" class="episodes">
          <li v-for="ep in currentSeason.episodes" :key="ep.id">
            <span class="ep-num">{{ ep.number }}</span>
            <span class="ep-name">{{ ep.name }}</span>
            <span v-if="ep.duration" class="ep-dur">{{ ep.duration }} دقیقه</span>
          </li>
        </ul>
      </section>

      <section class="container section">
        <h2 class="sec-title">نظرات کاربران ({{ title.reviews.length }})</h2>

        <div v-if="user" class="review-form">
          <textarea v-model="reviewBody" rows="3" placeholder="نظرت درباره این اثر رو بنویس..."></textarea>
          <button class="btn btn-primary" :disabled="sending" @click="sendReview">
            {{ sending ? 'در حال ثبت...' : 'ثبت نظر' }}
          </button>
          <p v-if="reviewMsg" :class="reviewOk ? 'success-msg' : 'error-msg'">{{ reviewMsg }}</p>
        </div>
        <p v-else class="login-hint">
          برای ثبت نظر
          <router-link :to="'/login?redirect=/' + title.slug" class="link">وارد شو</router-link>
        </p>

        <div class="reviews">
          <div v-for="r in title.reviews" :key="r.id" class="review">
            <div class="review-head">
              <strong>{{ r.user.name }}</strong>
              <span class="date">{{ faDate(r.createdAt) }}</span>
            </div>
            <p class="review-body">{{ r.body }}</p>
          </div>
          <p v-if="!title.reviews.length" class="no-review">هنوز نظری ثبت نشده. اولین نفر باش.</p>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.detail-hero {
  background-size: cover;
  background-position: center 18%;
}

.detail-overlay {
  background: linear-gradient(to top, var(--bg) 5%, rgba(13, 15, 20, 0.82) 60%, rgba(13, 15, 20, 0.65));
  padding: 60px 0 40px;
}

.detail-inner {
  display: flex;
  gap: 34px;
  align-items: flex-end;
}

.detail-poster {
  width: 230px;
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  flex-shrink: 0;
}

.detail-info h1 {
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 2px;
}

.original {
  color: var(--muted);
  font-size: 15px;
  margin-bottom: 14px;
}

.facts {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #c6cad6;
  margin-bottom: 14px;
}

.score {
  background: var(--amber);
  color: #10131a;
  font-weight: 800;
  padding: 1px 10px;
  border-radius: 6px;
  direction: ltr;
}

.genre-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.rate-box {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.rate-label {
  font-size: 13px;
  color: var(--muted);
}

.list-btn {
  min-width: 180px;
}

.sec-title {
  margin-bottom: 14px;
}

.story {
  color: #c6cad6;
  font-size: 14.5px;
  max-width: 780px;
}

.cast {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.cast-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
}

.cast-name {
  font-size: 13.5px;
  font-weight: 500;
}

.cast-role {
  font-size: 12px;
  color: var(--muted);
}

.season-btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.season-btns button {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 8px;
  padding: 6px 18px;
  font-size: 13px;
  transition: all 0.2s;
}

.season-btns button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.episodes {
  list-style: none;
}

.episodes li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 14px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.ep-num {
  color: var(--amber);
  font-weight: 700;
  min-width: 26px;
  direction: ltr;
  text-align: center;
}

.ep-name {
  flex: 1;
}

.ep-dur {
  color: var(--muted);
  font-size: 12px;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 26px;
}

.review-form textarea {
  width: 100%;
  max-width: 640px;
}

.review-form .error-msg,
.review-form .success-msg {
  margin-bottom: 0;
}

.login-hint {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 22px;
}

.login-hint .link {
  color: var(--accent);
}

.reviews {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.review {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 18px;
}

.review-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 14px;
}

.date {
  color: var(--muted);
  font-size: 12px;
}

.review-body {
  font-size: 13.5px;
  color: #c6cad6;
}

.no-review {
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 640px) {
  .detail-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-poster {
    width: 170px;
  }

  .detail-info h1 {
    font-size: 24px;
  }
}
</style>
