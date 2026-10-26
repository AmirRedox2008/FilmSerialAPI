<script setup>
const typeLabel = { movie: 'فیلم', series: 'سریال' }

defineProps({
  title: { type: Object, required: true }
})
</script>

<template>
  <router-link :to="'/titles/' + title.slug" class="card">
    <div class="poster">
      <img :src="title.poster" :alt="title.title" loading="lazy" @error="$event.target.style.opacity = 0" />
      <span class="badge-score">{{ title.rating.toFixed(1) }}</span>
    </div>
    <h3>{{ title.title }}</h3>
    <p class="meta">{{ typeLabel[title.type] }} • {{ title.year }}</p>
  </router-link>
</template>

<style scoped>
.card {
  display: block;
}

.poster {
  position: relative;
  aspect-ratio: 2 / 3;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(135deg, #1d2233, #262c44);
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover .poster img {
  transform: scale(1.06);
}

.card h3 {
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  font-size: 12px;
  color: var(--muted);
}
</style>
