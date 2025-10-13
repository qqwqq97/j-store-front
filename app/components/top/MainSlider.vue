<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

const slides = [
  { image: '/images/slides/slide1.png', alt: 'slide1'},
  { image: '/images/slides/slide1.png', alt: 'slide2'},
  { image: '/images/slides/slide1.png', alt: 'slide3'},
]
</script>
<template>
  <div class="main-slider">
    <Swiper
      :modules="[Pagination, Navigation, Autoplay]"
      :loop="true"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      pagination
      navigation
      class="slider"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <img :src="slide.image" :alt="slide.alt" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
  .main-slider {
    width: 100%;
    position: relative;
    margin-top: 0;
  }
  .slider {
    width: 100%;
    height: 450px;
  }
  .slider img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
    border-radius: 0;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
  }
  .swiper-pagination-bullet {
    background: #fff;
    opacity: 0.8;
  }
  .swiper-pagination-bullet-active {
    background: steelblue;
  }
</style>