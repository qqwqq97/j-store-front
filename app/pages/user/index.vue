<script setup>
import { ref, onMounted } from 'vue'; 
import { useAuth } from '~/composable/useAuth';
import { useApi } from '~/composable/useApi';

const auth = useAuth();
const router = useRouter();
const { apiFetch } = useApi();

const userName = computed(() => {
  if(auth.user.value == null) return ''  
  return auth.user.value.name;
})

const orders = ref(0);
const shippings = ref(0);

const onLogout = async () => {
  try {
    await auth.logout()
    router.push('/login')
  } catch (error) {
    alert('로그아웃 중 오류가 발생했습니다.')
  }
}

const getOrders = async() => {
  try {
    const res = await apiFetch('/api/orders', {
      method: "GET",
    });
    if(res) {
      orders.value = res.newOrders;
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

const getShippings = async() => {
  try {
    const res = await apiFetch('/api/shippings', {
      method: "GET",
    });
    if(res) {
      shippings.value = res.shippingCount;
    }
  } catch (error) {
    if(error.mesage) {
      alert(error.message);
    } else {
      // 네트워크 오류 등
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  } 
}

onMounted(() => {
  getOrders();
  getShippings();
})

</script>
<template>
  <div class="user-container">
    <div class="user-gretting">
      <p class="user-gretting-text">{{ userName }}さん、ようこそ!</p>
    </div>
    <div class="order-shipping-container">
      <div class="status-card order-card">
        <p class="status-title">注文履歴</p>
        <a class="status-value">最近 {{ orders }}件</a>
      </div>
      <div class="status-card shipping-card">
        <p class="status-title">お届け状況</p>
        <a class="status-value">配送中 {{ shippings }}件</a>
      </div>
    </div>
    <div class="address-card">
      <NuxtLink to="/user/addresses" class="addresses">
        <p>お届け先管理</p>
      </NuxtLink>
    </div>
    <div class="settings-logout">
      <NuxtLink to="/user/settings" class="setting-btn">
        アカウント設定
      </NuxtLink>
      <button class="logout-btn" @click="onLogout">ログアウト</button>
    </div>
  </div>
</template>
<style>
.user-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px;
}
.user-greeting {
  margin-bottom: 32px;
}
.user-gretting-text {
  font-size: 22px;
  font-weight: 700;
  color: #222;
}
.order-shipping-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}
.status-card {
  background-color: #fff;
  border-radius: 14px;
  padding: 26px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.status-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}
.status-value {
  font-size: 15px;
  font-weight: 700;
  color: #222;
  text-decoration: none;
}
.address-card {
  background-color: #fff;
  border-radius: 14px;
  padding: 26px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}
.address-card:hover {
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);
}
.address-card .addresses {
  text-decoration: none;
  color: black;
}
.address-card p {
  font-size: 16px;
  font-weight: 600;
}
.settings-logout {
  display: flex;
  gap: 16px;
}
.setting-btn,
.logout-btn {
  flex: 1;
  padding: 14px 0;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.setting-btn {
  background-color: #fff;
  color: #333;
  text-align: center;
  text-decoration: none;
}
.logout-btn {
  background-color: #fff;
  color: #c0392b;
}
</style>