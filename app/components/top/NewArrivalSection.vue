<script setup>
import { onMounted, ref} from 'vue';
import { useApi } from '~/composable/useApi';

const { apiFetch } = useApi();

const newItems = ref([]);

const getNew = async() => {
  try{
    const res = await apiFetch('/api/products/new?limit=4', {
      method: "GET"
    });
    newItems.value = res.data
  } catch (error) {
    if(error.message) {
      alert(error.message);
    } else {
      // 네트워크 오류 등
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  }
}

onMounted(() => {
  getNew();
})

// const newItems = [
//   {
//     name: 'Wool Knit Sweater',
//     price: 7800,
//     image: '/images/shohin/sweater.jpg'
//   },
//   {
//     name: 'Leather Mini Bag',
//     price: 12000,
//     image: '/images/shohin/leatherbag.webp'
//   },
//   {
//     name: 'iPhone Case',
//     price: 2500,
//     image: '/images/shohin/iphonecase.jpg',
//   },
//   {
//     name: 'Wireless Earbuds',
//     price: 8900,
//     image: '/images/shohin/earbuds.avif',
//   },

// ]
</script>
<template>
  <section class="new-arrivals">
    <div class="section-header">
      <h2 class="section-title">New Arrivals</h2>
      <NuxtLink to="/products/new" class="view-all-btn">View All →</NuxtLink>
    </div>
    <div class="category-grid">
      <div 
        v-for="item in newItems"
        :key="item.id"
        class="category-item"
      >
      <img :src="item.image_url" :alt="item.name" />
      <h3 class="category-name">{{ item.name }}</h3>
      <p class="category-desc">¥{{ Number(item.price).toLocaleString() }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.new-arrivals {
  padding: 80px 0;
  text-align: center;
  background-color: #fafafa;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(90%, 1200px);
  margin: 0 auto 48px;
}
.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  position: relative;
}
.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background-color: #000;
  margin: 12px auto 0;
}
.view-all-btn {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 24px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-decoration: none;
}
.view-all-btn:hover {
  background-color: #333;
}
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  justify-items: center;
  width: min(90%, 1200px);
  margin: 0 auto;
}
.category-item {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  max-width: 280px;
}

.category-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.12);
}
.category-item img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.category-name {
  font-size: 1rem;
  font-weight: 500;
  margin-top: 12px;
}
.category-desc {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 16px;
}
</style>