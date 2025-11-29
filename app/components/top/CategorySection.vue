<script setup>
import { onMounted, ref} from 'vue';
import { useApi } from '~/composable/useApi';

const { apiFetch } = useApi();
const featuredCategories = ref([]);

const getCategoriesSection = async() => {
  try {
    const res = await apiFetch('/api/categories', {
      method: "GET",
    });
    if(res.data) {
      res.data.forEach(item => {
        if(item.img !== null) {
          featuredCategories.value.push(item)
        }
      });
    }
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
  getCategoriesSection();
})
</script>
<template>
  <section class="category-section">
    <h2 class="section-title">SHOP BY CATEGORY</h2>
    <div class="category-grid">
      <div
        v-for="(item, id) in featuredCategories"
        :key="id"
        class="category-item"
      >
        <NuxtLink :to="item.path">
          <img :src="item.img" alt="item.label">
          <span>{{ item.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<style scoped>
.category-section {
  text-align: center;
  margin: 80px auto;
  padding:0 40px;
}
.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 40px;
  color: #333;
  letter-spacing: 1px;
}
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  justify-items: center;
}
.category-item {
  width: 100%;
  max-width: 280px;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #fff;
}

.category-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-item span {
  display: block;
  padding: 15px 0;
  font-size: 1rem;
  font-weight: 500;
  color: #444;
  background-color: #f8f8f8;
}

.category-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.category-item:hover img {
  transform: scale(1.05);
}

</style>