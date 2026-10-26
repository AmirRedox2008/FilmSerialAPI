<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { isAdmin } from '../auth'

const router = useRouter()

if (!isAdmin.value) {
  router.push('/')
}

const genres = ref([])
const titles = ref([])
const msg = ref('')
const err = ref('')
const saving = ref(false)

const emptyForm = {
  type: 'movie',
  title: '',
  originalTitle: '',
  year: '',
  duration: '',
  country: '',
  poster: '',
  description: '',
  featured: false,
  genreIds: [],
  castText: ''
}

const form = ref({ ...emptyForm })
const newGenre = ref({ name: '', slug: '' })

async function loadAll() {
  const [g, t] = await Promise.all([
    api.get('/genres'),
    api.get('/titles', { params: { limit: 50 } })
  ])
  genres.value = g.data.data
  titles.value = t.data.data
}

async function addGenre() {
  err.value = ''
  msg.value = ''
  try {
    await api.post('/genres', newGenre.value)
    newGenre.value = { name: '', slug: '' }
    msg.value = 'ژانر جدید اضافه شد'
    await loadAll()
  } catch (e) {
    err.value = (e.response && e.response.data.message) || 'خطا در افزودن ژانر'
  }
}

async function addTitle() {
  err.value = ''
  msg.value = ''
  saving.value = true

  try {
    const cast = form.value.castText
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const parts = line.split('-')
        return { name: (parts[0] || '').trim(), character: (parts[1] || '').trim() }
      })

    await api.post('/titles', {
      type: form.value.type,
      title: form.value.title,
      originalTitle: form.value.originalTitle,
      year: form.value.year,
      duration: form.value.duration || null,
      country: form.value.country,
      poster: form.value.poster,
      description: form.value.description,
      featured: form.value.featured,
      genreIds: form.value.genreIds,
      cast
    })

    msg.value = 'عنوان جدید با موفقیت اضافه شد'
    form.value = { ...emptyForm }
    await loadAll()
  } catch (e) {
    err.value = (e.response && e.response.data.message) || 'خطا در ذخیره عنوان'
  } finally {
    saving.value = false
  }
}

async function removeTitle(id) {
  if (!confirm('این عنوان حذف بشه؟')) return
  try {
    await api.delete('/titles/' + id)
    await loadAll()
  } catch (e) {
    err.value = 'خطا در حذف'
  }
}

onMounted(loadAll)
</script>

<template>
  <div class="container admin">
    <h1>پنل مدیریت</h1>

    <p v-if="msg" class="success-msg">{{ msg }}</p>
    <p v-if="err" class="error-msg">{{ err }}</p>

    <div class="admin-grid">
      <div class="panel">
        <h2>افزودن عنوان جدید</h2>

        <form @submit.prevent="addTitle">
          <div class="two-col">
            <div class="field">
              <label>نوع</label>
              <select v-model="form.type">
                <option value="movie">فیلم</option>
                <option value="series">سریال</option>
              </select>
            </div>
            <div class="field">
              <label>سال</label>
              <input v-model="form.year" type="number" min="1900" max="2030" required />
            </div>
          </div>

          <div class="field">
            <label>نام فارسی</label>
            <input v-model="form.title" type="text" required />
          </div>

          <div class="field">
            <label>نام لاتین</label>
            <input v-model="form.originalTitle" type="text" required dir="ltr" />
          </div>

          <div class="two-col">
            <div class="field">
              <label>مدت (دقیقه)</label>
              <input v-model="form.duration" type="number" min="1" />
            </div>
            <div class="field">
              <label>کشور</label>
              <input v-model="form.country" type="text" />
            </div>
          </div>

          <div class="field">
            <label>آدرس پوستر</label>
            <input v-model="form.poster" type="url" required dir="ltr" />
          </div>

          <div class="field">
            <label>داستان</label>
            <textarea v-model="form.description" rows="4" required></textarea>
          </div>

          <div class="field">
            <label>ژانرها</label>
            <div class="genre-checks">
              <label v-for="g in genres" :key="g.id">
                <input v-model="form.genreIds" type="checkbox" :value="g.id" />
                {{ g.name }}
              </label>
            </div>
          </div>

          <div class="field">
            <label>بازیگران (هر خط یک نفر: نام - نقش)</label>
            <textarea v-model="form.castText" rows="4" dir="ltr"></textarea>
          </div>

          <label class="check-line">
            <input v-model="form.featured" type="checkbox" />
            نمایش در صفحه اصلی (ویژه)
          </label>

          <button class="btn btn-primary full" :disabled="saving">
            {{ saving ? 'در حال ذخیره...' : 'افزودن عنوان' }}
          </button>
        </form>

        <div class="genre-add">
          <h3>افزودن ژانر</h3>
          <div class="genre-add-row">
            <input v-model="newGenre.name" type="text" placeholder="نام ژانر" />
            <input v-model="newGenre.slug" type="text" placeholder="slug" dir="ltr" />
            <button class="btn btn-outline btn-sm" @click="addGenre">افزودن</button>
          </div>
        </div>
      </div>

      <div class="panel">
        <h2>عنوان‌ها ({{ titles.length }})</h2>

        <div class="table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>پوستر</th>
                <th>نام</th>
                <th>نوع</th>
                <th>سال</th>
                <th>امتیاز</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in titles" :key="t.id">
                <td><img :src="t.poster" class="thumb" :alt="t.title" /></td>
                <td>{{ t.title }}</td>
                <td>{{ t.type === 'movie' ? 'فیلم' : 'سریال' }}</td>
                <td>{{ t.year }}</td>
                <td>{{ t.rating.toFixed(1) }}</td>
                <td>
                  <button class="btn-del" @click="removeTitle(t.id)">حذف</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  padding-top: 34px;
}

.admin-grid {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 24px;
  align-items: start;
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
}

.panel h2 {
  font-size: 17px;
  margin-bottom: 20px;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.genre-checks {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  font-size: 13px;
}

.genre-checks label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.check-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  margin-bottom: 18px;
  cursor: pointer;
}

.genre-add {
  margin-top: 28px;
  border-top: 1px solid var(--border);
  padding-top: 18px;
}

.genre-add h3 {
  font-size: 14px;
  margin-bottom: 12px;
}

.genre-add-row {
  display: flex;
  gap: 8px;
}

.genre-add-row input {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--text);
  font-size: 13px;
  outline: none;
  flex: 1;
}

.table-wrap {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.admin-table th,
.admin-table td {
  text-align: right;
  padding: 9px 10px;
  border-bottom: 1px solid var(--border);
}

.admin-table th {
  color: var(--muted);
  font-weight: 500;
  font-size: 12.5px;
}

.thumb {
  width: 38px;
  border-radius: 5px;
  display: block;
}

.btn-del {
  background: rgba(229, 9, 20, 0.12);
  border: 1px solid rgba(229, 9, 20, 0.4);
  color: #ff6b72;
  border-radius: 7px;
  padding: 4px 14px;
  font-size: 12.5px;
}

.btn-del:hover {
  background: rgba(229, 9, 20, 0.25);
}

@media (max-width: 1000px) {
  .admin-grid {
    grid-template-columns: 1fr;
  }
}
</style>
