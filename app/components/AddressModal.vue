<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useApi } from '~/composable/useApi';

const { apiFetch } = useApi();

const props = defineProps({
  isOpen: Boolean
})

const emits = defineEmits(['close', 'save'])

const closeModal = () => {
  emits('close')
}

const saveAddress = async() => {
  try {
    const res = await apiFetch('/api/newAddress', {
      method: "POST",
      body: {
        postal_code: postal_code.value,
        prefecture: prefecture.value,
        city: city.value,
        street: street.value,
        building: building.value,
        phone_number: phone_number.value,
        is_default: is_default.value
      }
    });
  } catch (error) {
    if(error.message) {
      alert(error.message)
    } else {
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  }
  postal_code.value = '';
  prefecture.value = '';
  city.value = '';
  street.value = '';
  building.value = '';
  phone_number.value = '';
  emits('save')
}

const postal_code = ref('');
const prefecture = ref('');
const city = ref('');
const street = ref('');
const building = ref('');
const phone_number = ref('');
const is_default = ref(0);

const searchAddress = async() => {
  if(!postal_code.value) return alert('郵便番号を入力してください。')
  try {
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postal_code.value}`)
    const data = await res.json()
    if(data.results) {
      const result = data.results[0]
      prefecture.value = result.address1
      city.value = result.address2
      street.value = result.address3
    } else {
      alert('住所が見つかりませんでした。')
    }
  } catch (error) {
    if(error.message) {
      alert(error.message)
    } else {
      alert('検索中にエラーが発生しました。')
    }
  }
}

</script>
<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <h3>新しい配送先を追加</h3>
      <div class="form-group">
        <label>郵便番号</label>
        <div class="zip-row">
          <input type="text" v-model="postal_code" placeholder="例：1000001" maxlength="7"/>
          <button @click="searchAddress">住所検索</button>
        </div>
      </div>
      <div class="form-group">
        <label>都道府県</label>
        <input v-model="prefecture" placeholder="例：東京都">
      </div>
      <div class="form-group">
        <label>市区町村</label>
        <input v-model="city" placeholder="例: 千代田区">
      </div>
      <div class="form-group">
        <label>町名・番地</label>
        <input v-model="street" placeholder="例: 千代田1-1">
      </div>
      <div class="form-group">
        <label>建物名・部屋番号</label>
        <input class="detailAdress" v-model="building" placeholder="例: OOマンション101号室">
      </div>
      <div class="form-group">
        <label>携帯番号</label>
        <input v-model="phone_number" placeholder="(-) はつけないで下さい">
      </div>
      <div class="form-group">
        <label>お届け先のデフォルトに設定しますか？</label>
        <label class="default-option">
          <input type="radio" name="isDefault" value=1 v-model="is_default"/> はい
        </label>
        <label class="payment-option">
          <input type="radio" name="isDefault" value=0 v-model="is_default" checked/> いいえ
        </label>
      </div>
      <div class="actions">
        <button @click="saveAddress">保存</button>
        <button @click="closeModal">キャンセル</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  width: 401px;
  animation: fadeIn 0.2s ease-in-out;
}
.form-group {
  display: flex;
  margin-bottom: 1rem;
}
label {
  padding-right: 10px;
}
.zip-row {
  display: flex;
  gap: 0.5rem;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.detailAdress {
  width: 180px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>