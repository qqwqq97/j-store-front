<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { onMounted }from 'vue'; 

</script>
<template>
  <div class="default-layout">
    <Header />
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>
<style>
  .default-layout {

  }
</style>