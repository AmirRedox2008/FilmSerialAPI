<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app">
    <Navbar />
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <div class="container">
        <p>فیلم‌لند © 1405 - ساخته شده با Node.js و Vue.js</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}

.footer {
  border-top: 1px solid var(--border);
  padding: 22px 0;
  color: var(--muted);
  font-size: 13px;
  text-align: center;
}
</style>
