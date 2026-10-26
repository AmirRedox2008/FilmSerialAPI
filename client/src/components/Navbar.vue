<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { user, isAdmin, logout } from '../auth'

const router = useRouter()
const q = ref('')
const menuOpen = ref(false)

function search() {
  if (!q.value.trim()) return
  router.push({ path: '/search', query: { q: q.value.trim() } })
  q.value = ''
  menuOpen.value = false
}

function doLogout() {
  logout()
  menuOpen.value = false
  router.push('/')
}
</script>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    return { router }
  }
}
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <router-link to="/" class="logo">فیلم‌لند</router-link>

      <nav class="links" :class="{ open: menuOpen }">
        <router-link to="/" @click="menuOpen = false">خانه</router-link>
        <router-link to="/movies" @click="menuOpen = false">فیلم‌ها</router-link>
        <router-link to="/series" @click="menuOpen = false">سریال‌ها</router-link>
        <router-link v-if="user" to="/watchlist" @click="menuOpen = false">لیست من</router-link>
        <router-link v-if="isAdmin" to="/admin" @click="menuOpen = false">مدیریت</router-link>
      </nav>

      <form class="search" @submit.prevent="search">
        <input v-model="q" type="text" placeholder="جستجو..." />
      </form>

      <div class="auth">
        <template v-if="user">
          <span class="username">{{ user.name }}</span>
          <button class="btn btn-outline btn-sm" @click="doLogout">خروج</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-outline btn-sm">ورود</router-link>
          <router-link to="/register" class="btn btn-primary btn-sm">ثبت‌نام</router-link>
        </template>
      </div>

      <button class="burger" @click="menuOpen = !menuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(13, 15, 20, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 22px;
  height: 62px;
}

.logo {
  color: var(--accent);
  font-size: 21px;
  font-weight: 900;
  white-space: nowrap;
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  font-size: 14px;
  color: var(--muted);
  transition: color 0.2s;
}

.links a:hover,
.links a.router-link-active {
  color: var(--text);
}

.search {
  flex: 1;
  max-width: 320px;
  margin-inline-start: auto;
}

.search input {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 14px;
  color: var(--text);
  font-size: 13px;
  outline: none;
}

.search input:focus {
  border-color: var(--muted);
}

.auth {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  font-size: 13px;
  color: var(--muted);
  white-space: nowrap;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  padding: 6px;
}

.burger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
}

@media (max-width: 860px) {
  .search {
    display: none;
  }

  .links {
    position: absolute;
    top: 62px;
    right: 0;
    left: 0;
    flex-direction: column;
    gap: 0;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    display: none;
  }

  .links.open {
    display: flex;
  }

  .links a {
    padding: 12px 22px;
    border-bottom: 1px solid var(--border);
  }

  .burger {
    display: flex;
  }

  .username {
    display: none;
  }
}
</style>
