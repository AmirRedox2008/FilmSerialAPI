<template>
  <div class="container notfound">
    <h1>404</h1>
    <p>صفحه‌ای که دنبالش بودی پیدا نشد.</p>
    <router-link to="/" class="btn btn-primary">بازگشت به خانه</router-link>
  </div>
</template>

<style scoped>
.notfound {
  text-align: center;
  padding: 110px 20px;
}

.notfound h1 {
  font-size: 80px;
  color: var(--accent);
  margin-bottom: 8px;
}

.notfound p {
  color: var(--muted);
  margin-bottom: 26px;
}
</style>
