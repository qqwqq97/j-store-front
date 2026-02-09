<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '~/composable/useApi';
import { useCart } from '~/stores/cart';

const cartStore = useCart();
const router = useRouter();

const { apiFetch } = useApi();
const route = useRoute();
const product = ref({});
const quantity = ref(1)
const loading = ref(true)

const fetchProductDetail = async() => {
  try {
    const res = await apiFetch(`/api/products/detail/${route.params.id}`, {
      method: "GET"
    });
    product.value = res.data
    console.log(product.value)
  } catch (error) {
    if(error.message) {
      alert(error.message)
    } else {
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  } finally {
    loading.value = false;
  }
}

const formatPrice = (price: number) => {
  return Number(price).toLocaleString()
}

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    return quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    return quantity.value--
  }
}

const addToCart = () => {
  const item = {
    id: product.value.id,
    name: product.value.name,
    description: product.value.description,
    price: product.value.price,
    image_url: product.value.image_url_full,
    quantity: quantity.value
  }
  
  cartStore.addCart(item)
  
  alert('カートに追加しました！')
}

// const buyNow = () => {
//   router.push('/checkout')
// }


onMounted(() => {
  fetchProductDetail();
})

</script>
<template>
  <div class="product-detail-container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="product-detail">
      <div class="product-image">
        <img :src="product.image_url_full" :alt="product.name">
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">¥{{ formatPrice(product.price) }}</p>
        <p class="product-stock" v-if="product.stock > 0">在庫： {{ product.stock }}</p>
        <p class="product-stock" v-else style="color:red;">在庫なし</p>
        <div class="quantity-selector">
          <input type="type" v-model.number="quantity">
          <div class="up-down-group">
            <button @click="increaseQuantity" :disabled="quantity >= product.stock" style="border-bottom:none;">↑</button>
            <button @click="decreaseQuantity" :disabled="quantity <= 1">↓</button>
          </div>
        </div>
        <div class="calc-group">
          <button class="add-to-cart" @click="addToCart" :disabled="product.stock === 0">カートに追加</button>
          <button class="buy-now" @click="buyNow" :disabled="product.stock === 0">今すぐ購入</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .product-detail-container {
    max-width: 1100px;
    margin: 60px auto;
    padding: 0 20px;
  }
  .loading {
    text-align: center;
    font-size: 16px;
    color: #777;
    margin-top: 50px;
  }
  .product-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: start;
  }
  .product-image img{
    width: 80%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
  .product-info {
    display: flex;
    flex-direction: column;
  }
  .product-name {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .product-description {
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
    font-size: 15px;
  }
  .product-price {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .product-stock {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .quantity-selector {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }
  .quantity-selector input {
    width: 50px;
    height: 26px;
    text-align: center;
    border: 1px solid #ccc;
    border-right: none;
    margin: 0 0 0 8px;
    font-size: 16px;
    padding: 4px 0;
  }
  .quantity-selector .up-down-group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .quantity-selector .up-down-group button {
    width: 32px;
    height: 18px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    font-size: 12px;
  }
  .calc-group {
    display: flex;
    gap: 15px;
  }
  .add-to-cart,
  .buy-now {
    padding: 14px 24px;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
  }
  .add-to-cart {
    background-color: #000;
    color: #fff;
  }
  .add-to-cart:hover {
    background-color: #333;
  }
  .buy-now {
    background-color: #8a8a87;
    color: #fff;
  }
  .buy-now:hover {
    background-color: #d1cdcd;
  }
  @media screen and (max-width: 768px) {
    .product-detail {
      grid-template-columns: 1fr;
    }
  }
</style>