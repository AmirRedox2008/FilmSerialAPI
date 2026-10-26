<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../auth'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push(route.query.redirect || '/')
  } catch (e) {
    error.value = (e.response && e.response.data.message) || 'خطا در ورود'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container auth-page">
    <form class="auth-card" @submit.prevent="submit">
      <h1>ورود به فیلم‌لند</h1>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <div class="field">
        <label>ایمیل</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="field">
        <label>رمز عبور</label>
        <input v-model="password" type="password" required />
      </div>

      <button class="btn btn-primary full" :disabled="loading">
        {{ loading ? 'در حال ورود...' : 'ورود' }}
      </button>

      <p class="hint">حساب نداری؟ <router-link to="/register" class="link">ثبت‌نام کن</router-link></p>
    </form>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 34px 30px;
}

.auth-card h1 {
  font-size: 21px;
  margin-bottom: 22px;
  text-align: center;
}

.hint {
  text-align: center;
  font-size: 13px;
  color: var(--muted);
  margin-top: 18px;
}

.hint .link {
  color: var(--accent);
}
</style>
