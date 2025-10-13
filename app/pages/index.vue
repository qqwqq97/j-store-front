<script setup lang="ts">
import MainSlider from '~/components/top/MainSlider.vue'
import CategorySection from '~/components/top/CategorySection.vue'
import NewArrivalSection from '~/components/top/NewArrivalSection.vue'
import BestSellerSection from '~/components/top/BestSellerSection.vue'
  definePageMeta({
    layout: 'default'
  })
</script>
<template>
  <div>
    <MainSlider />
    <CategorySection />
    <NewArrivalSection />
    <BestSellerSection />
  </div>
</template>