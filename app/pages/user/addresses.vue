<script setup>
import { ref, onMounted } from 'vue'; 
import { useApi } from '~/composable/useApi';

const { apiFetch } = useApi();

const addresses = ref([]);

const getAddresses = async() => {
  try {
    const res = await apiFetch('/api/addresses', {
      method: "GET"
    });
    addresses.value = res.addresses.map(addr => {
      return {
        postal_code: addr.postal_code,
        shipping_address1: addr.prefecture + addr.city + addr.street,
        shipping_address2: addr.building,
        phone_number: addr.phone_number,
        is_default: addr.is_default
      }
    })
  } catch(error) {
    if(error.message) {
      alert(error.message)
    } else {
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  }
} 

onMounted(() => {
  getAddresses();
})

</script>
<template>
  <div class="address-section">
    <h2 class="address-section__title">お届け先リスト</h2>
    <div class="address-table-wrapper">
      <table class="address-table">
        <thead class="address-table__head">
          <tr>
            <th>郵便番号</th>
            <th>住所（都道府県・市区町村・番地）</th>
            <th>建物名・部屋番号</th>
            <th>携帯番号</th>
            <th class="defaultAddress">既定のお届け先</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="address-table__body">
          <tr v-for="address in  addresses" :key="address.id" class="address-table__row">
            <td class="address-table__cell">{{ address.postal_code }}</td>
            <td class="address-table__cell">{{ address.shipping_address1 }}</td>
            <td class="address-table__cell">{{ address.shipping_address2 }}</td>
            <td class="address-table__cell">{{ address.phone_number }}</td>
            <td class="address-table__cell address-table__cell--center">
              <span
                :class="[
                  'address-default-badge',
                  address.is_default === 1 ? 'is-active' : ''
                ]"
              >
                {{ address.is_default === 1 ? '✓' : '-' }}
              </span>
            </td>
            <td class="address-table__cell"> 
              <button class="address-edit-button">修正</button>
            </td>
          </tr>
        </tbody>
      </table>      
    </div>
  </div>
</template>
<style>
.address-section {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.address-section__title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}
.address-table-wrapper {
  overflow-x: auto;
}
.address-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.address-table__head {
  background: #f3f4f6;
}
.address-table th {
  padding: 12px 10px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}
th.defaultAddress {
  text-align: center;
}
.address-table__row:hover {
  background: #f9fafb;
}
.address-table__cell {
  padding: 12px 10px;
  border-bottom: 1px solid #e5e7eb;
  color: #444;
}
.address-table__cell--center {
  text-align: center;
}
.address-default-badge {
  display: inline-block;
  min-width: 24px;
  padding: 4px 6px;
  border-radius: 999px;
  background: #e5e7eb;
  font-size: 12px;
  font-weight: 600;
  color: #555;
}
.address-default-badge.is-active {
  background: #111;
  color: #fff;
}
.address-edit-button {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}
.address-edit-button:hover {
  background: #111;
  color: #fff;
  border-color: #111;
}
@media (max-width: 768px) {
  .address-table th,
  .address-table__cell {
    font-size: 13px;
    padding: 10px 8px;
  }
}
</style>