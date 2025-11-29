<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { useApi } from '~/composable/useApi';

const loading = ref(true);

const { apiFetch } = useApi();

const newArrivals = ref<any[]>([]);

const fetchNewArrivals = async() => {
  try {
    const res = await apiFetch('/api/products/new', {
      method: "GET"
    });
    newArrivals.value = res.data
  } catch (error) {
    if(error.message) {
      alert(error.message);
    } else {
      // 네트워크 오류 등
      alert('서버와 통신 중 오류가 발생했습니다.');
    } 
  } finally {
      loading.value = false;
  }
}

const formatPrice = (price: number) => {
  return Number(price).toLocaleString()
}
onMounted(() => {
  fetchNewArrivals();
});

</script>
<template>
  <div class="new-container">
    <h1 class="page-title">New Arrivals</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="new-grid">
      <NuxtLink
        class="new-item"
        v-for="item in newArrivals"
        :key="item.id"
        :to="`/products/${item.id}`" 
      >
        <img :src="item.image_url" :alt="item.name" class="item-image" />
        <div class="item-info">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-price">¥{{ formatPrice(item.price) }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<style>
.new-container {
  padding: 2.5rem 2rem;
}
.page-title {
  text-align: center;
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
  letter-spacing: 2px;
}
.loading {
  text-align: center;
  color: #6b7280;
}
.new-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
}
.new-item {
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s;
}
.new-item:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.item-image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}
.item-info {
  padding: 1rem;
  text-align: center;
}
.item-name {
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-price {
  color: #4b5563;
  margin-top: 0.5rem;
  font-size: 0.95rem;
}
</style>