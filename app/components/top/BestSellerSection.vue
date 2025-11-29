<script setup>
const bestItems = [
  { name: 'Classic Hoodie', price: 8900, image: '/images/shohin/Classic Hoodie.webp'},
  { name: 'Bluetooth Speaker', price: 12900, image: '/images/shohin/Bluetooth Speaker.jpeg'},
  { name: 'Leather Wallet', price: 30000, image: '/images/shohin/Leather Wallet.jpeg'},
  { name: 'Smart Watch', price: 19800, image: '/images/shohin/Smart Watch.jpg'}
]
</script>
<template>
  <section class="best-sellers">
    <div class="section-header">
      <h2 class="section-title">Best Sellers</h2>
      <NuxtLink to="/bastsellers" class="view-all-btn">View All →</NuxtLink>
    </div>
    <div class="category-grid">
      <div
        class="category-item"
        v-for="(item, index) in bestItems"
        :key="index"
      >
      <div class="image-container">
        <img :src="item.image" :alt="item.name">
      </div>
      <div class="item-info">
        <h3 class="category-name">{{ item.name }}</h3>
        <p class="category-desc">¥{{ item.price.toLocaleString() }}</p>
      </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .best-sellers {
  padding: 90px 0;
  background: linear-gradient(180deg, #f8f8f8 0%, #fff 100%);
}
  .section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(90%, 1200px);
  margin: 0 auto 48px;
}
  .section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  position: relative;
}
.section-title::after {
  content: '';
  display: block;
  width: 70px;
  height: 3px;
  background-color: #222;
  margin-top: 12px;
}
.view-all-btn {
  background: transparent;
  color: #222;
  border: 2px solid #222;
  padding: 10px 26px;
  border-radius: 24px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.view-all-btn:hover {
  background-color: #222;
  color: #fff;
}
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  width: min(90%, 1200px);
  margin: 0 auto;
}
.category-item {
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.12);
}
.image-container {
  width: 100%;
  height: 260px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.category-item:hover img {
  transform: scale(1.05);
}
.item-info {
  padding: 18px;
  text-align: center;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.category-desc {
  color: #666;
  font-size: 0.95rem;
}
</style>