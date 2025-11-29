<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useCart } from '@/stores/cart';
import Confirm from '@/components/Confirm';
import { useConfirm } from '@/composable/useConfirm';

const cartStore = useCart();
const router = useRouter();

const cart = ref([]);

const { openConfirm } = useConfirm();

const formatPrice = (price) => {
  return Number(price).toLocaleString();
}

const totalPrice = computed(() => cartStore.totalPrice);


async function onDeleteClick(id){
  const ok = await openConfirm('削除してもよろしいですか？')
  if(ok) {
    cartStore.removeItem(id)
    cart.value = cartStore.loadCart()
  }
}

const goToCheckout = () => {
  router.push('/checkout')
}




onMounted(() => {
  const storedCart = localStorage.getItem('cart')
  if (storedCart) {
    cart.value = JSON.parse(storedCart)
  }
})

</script>
<template>
  <div class="cart-page container">
    <h1>カート</h1>
    <div class="empty-cart" v-if="cart.length === 0">
      カートに商品がありません。
    </div>
    <div v-else>
      <div
        v-for="item in cart"
        :key = item.id
        class="cart-item"
      >
        <img :src="item.image_url" :alt="item.name" />
        <div class="item-info">
          <p class="name">{{ item.name }}</p>
          <p>￥{{ formatPrice(item.price) }}</p>
          <p>数量： {{ item.quantity }}</p>
        </div>
        <div class="item-right">
          <p class="item-total">
            ￥{{ formatPrice(item.price * item.quantity) }}
          </p>
          <button @click="onDeleteClick(item.id)">削除</button>
          <Confirm />
        </div>
      </div>
      <div class="cart-footer">
        <p class="total">合計： ￥{{ formatPrice(totalPrice) }}</p>
        <button class="checkout" @click="goToCheckout">
          購入手続きへ
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: "Noto Sans JP", sans-serif;
}
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}
.empty-cart {
  color: #777;
  text-align: center;
}
.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 16px 0;
}
.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 16px;
}
.item-info {
  flex: 1;
}
.item-info .name {
  font-weight: bold;
  margin-bottom: 4px;
}
.item-right {
  text-align: right;
}
.item-right .item-total {
  font-weight: bold;
}
.item-right button {
  background: none;
  border: none;
  color: #111;
  cursor: pointer;
  margin-top: 8px;
  text-decoration: underline;
}
.item-right button:hover {
  text-decoration: none;
}
.cart-footer {
  margin-top: 24px;
  text-align: right;
}
.cart-footer .total {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
}
.checkout {
  background-color: #3498db;
  color: #fff;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.checkout:hover {
  background-color: #2980b9;
}
</style>