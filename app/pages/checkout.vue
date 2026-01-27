<script setup>
import { ref, onMounted } from 'vue'; 
import { useCart } from '@/stores/cart';
import { useApi } from '~/composable/useApi';
import AddressModal from '@/components/AddressModal.vue';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCart();
const { apiFetch } = useApi();

const paymentMethod = ref('')
const stripe = ref(null);
const cardElement = ref(null)
const cardError = ref('')

const cart = ref([]);
const isModalOpen = ref(false);
const postal_code = ref('');
const prefecture = ref('');
const city = ref('');
const street = ref('');
const building = ref('');
const phone_number = ref('');
const is_default = ref('');

onMounted(async() => {
  const config = useRuntimeConfig()
  stripe.value = await loadStripe(config.public.VITE_STRIPE_PUBLIC_KEY)

  if(!stripe.value) {
    console.error('Stripe failed to load')
    return
  }

  const elements = stripe.value.elements()
  cardElement.value = elements.create('card')
  cardElement.value.mount('#card-element')

  cardElement.value.on('change', (event) => {
    cardError.value = event.error ? event.error.message : ''
  })
})

const formatPrice = (price) => {
  return Number(price).toLocaleString();
}

const totalPrice = computed(() => cartStore.totalPrice);

const checkout = async() => {
  if(paymentMethod.value !== 'card') {
    alert("カード決済を選択してください。")
    return
  }
  if (!stripe.value) {
    alert("Stripeがまだ初期化されていません。少し待ってからもう一度試してください。")
    return
  }
  const { paymentMethod: pm, error } = await stripe.value.createPaymentMethod({
    type: 'card',
    card: cardElement.value,
  })

  if (error) {
    cardError.value = error.message
    return
  }

  const res = await apiFetch('/api/checkout/pay', {
    method: "POST",
    body: {
      payment_method: pm.id,
      amount: cartStore.totalPrice,
      items: cart.value.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      address: {
        shipping_zip: postal_code.value,
        shipping_address1: prefecture.value + city.value + street.value,
        shipping_address2: building.value,
        shipping_phone: phone_number.value
      }
    }
  })

  if(res.status === 'success') {
    alert('支払いが完了しました！');
    cartStore.clearCart();
    router.push('/order_confirm')
  } else {
    alert('エラー：' + response.message)
  }
}

const openModal = () => {
  isModalOpen.value = true
}

const getAddress = async() => {
  try {
    const res = await apiFetch('/api/getAddress', {
      method: "GET"
    });
    if(res) {
      postal_code.value = res.postal_code
      prefecture.value = res.prefecture
      city.value = res.city
      street.value = res.street
      building.value = res.building
      phone_number.value = res.phone_number
      is_default.value = res.is_default
    }
  } catch (error) {
    if(error.message) {
      alert(error.message)
    } else {
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  }
}
onMounted(() => {
  const storedCart = localStorage.getItem('cart');
  if(storedCart) {
    cart.value = JSON.parse(storedCart)
  }
  getAddress();
})

</script>
<template>
  <div class="checkout-page container">
    <h1>注文手続き</h1>

    <div class="checkout-container">
      <!-- 左側 -->
      <div class="checkout-detail">
        
        <!-- お届け住所 -->
        <div class="card">
          <div class="card-header">
            <h2>お届け住所</h2>
            <button class="add-btn" @click="openModal">+ 新しい住所を追加</button>
          </div>

          <AddressModal 
            :isOpen="isModalOpen" 
            @close="isModalOpen = false" 
            @save="isModalOpen = false" 
          />

          <div v-if="is_default" class="address-info">
            <p><strong>郵便番号：</strong> {{ postal_code }}</p>
            <p><strong>都道府県：</strong> {{ prefecture }}</p>
            <p><strong>市区町村：</strong> {{ city }}</p>
            <p><strong>町名・番地：</strong> {{ street }}</p>
            <p><strong>建物名・部屋番号：</strong> {{ building }}</p>
            <p><strong>電話番号：</strong> {{ phone_number }}</p>
          </div>

          <div v-else class="no-address">
            登録されたお届け先がありません。
          </div>
        </div>

        <!-- 支払い方法 -->
        <div class="card">
          <h2>お支払い方法</h2>

          <div class="payment-methods">
            <label class="payment-option">
              <input type="radio" name="payment" value="card" v-model="paymentMethod" />
              クレジットカード
            </label>

            <label class="payment-option">
              <input type="radio" name="payment" value="paypal" v-model="paymentMethod" />
              PayPal
            </label>

            <label class="payment-option">
              <input type="radio" name="payment" value="bank" v-model="paymentMethod" />
              銀行振込
            </label>
          </div>
          <div v-show="paymentMethod === 'card'" class="stripe-card-box">
            <div id="card-element"></div>
            <p v-if="cardError" class="error">{{ cardError }}</p>
          </div>
        </div>

        <!-- 注文内容 -->
        <div class="card">
          <h2>注文内容</h2>

          <ul class="item-list">
            <li v-for="item in cart" :key="item.id" class="item-row">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-qty">x {{ item.quantity }}</span>
            </li>
          </ul>

          <div class="item-total">
            <p>合計： <strong>￥{{ formatPrice(cartStore.totalPrice) }}</strong></p>
          </div>
        </div>
      </div>

      <!-- 右側 -->
      <div class="checkout">
        <div class="summary-box">
          <p class="summary-label">支払い金額</p>
          <p class="summary-price">￥{{ formatPrice(cartStore.totalPrice) }}</p>
        </div>

        <button class="checkoutBtn" @click="checkout">
          購入する
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  font-family: "Noto Sans JP", sans-serif;
}
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}
.checkout-container{
  display: flex;
  gap: 24px;
}
.checkout-detail {
  width: 65%;
}
.card {
  background: #fff;
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-btn {
  background: #3b82f6;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.add-btn:hover {
  background: #2563eb;
}
.address-info p{
  margin: 4px 0;
}
.no-address {
  color: #777;
  font-size: 14px;
  margin-top: 10px;
}
.payment-methods {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.payment-option {
  display: flex;
  align-items: center;
  gap: 8px;
}
.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.item-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}
.item-total {
  margin-top: 16px;
  text-align: right;
  font-size: 18px;
}
.checkout {
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.summary-box {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  text-align: center;
}
.summary-label {
  color: #666;
  font-size: 14px;
}
.summary-price {
  font-size: 22px;
  font-weight: bold;
  margin-top: 8px;
}
.checkoutBtn {
  width: 100%;
  background-color: #2563eb; 
  color: #fff;
  padding: 12px 0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.checkoutBtn:hover {
  background-color: #1d4ed8;
}
.checkoutBtn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}
.stripe-card-box {
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.error {
  color: red;
  margin-top: 6px;
}
</style>