import { computed, ref } from 'vue'
import api from './api'

const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

function saveUser(data) {
  user.value = data.user
  localStorage.setItem('user', JSON.stringify(data.user))
  localStorage.setItem('token', data.token)
}

async function login(email, password) {
  const res = await api.post('/auth/login', { email, password })
  saveUser(res.data)
}

async function register(name, email, password) {
  const res = await api.post('/auth/register', { name, email, password })
  saveUser(res.data)
}

function logout() {
  user.value = null
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

const isAdmin = computed(() => user.value && user.value.role === 'admin')

export { user, isAdmin, login, register, logout }
