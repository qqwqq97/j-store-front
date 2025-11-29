<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/')
}
</script>
<template>
  <div class="order-confirm">
    <div class="order-confirm-message">
      <h2>ご注文ありがとうございます。</h2>
      <p>この度は当ショップをご利用いただき、誠にありがとうございます。<br>
         ご注文手続きが正常に完了いたしました。<br>
         注文内容の詳細は、確認メールをご覧ください。
      </p>
    </div>
    <div class="confrim-btn">
      <button @click="goHome">ホームへ戻る</button>
      <button>注文履歴を見る</button>
    </div>
  </div>
</template>
<style scoped>
.order-confirm {
  max-width: 650px;
  margin: 50px auto;
  padding: 40px 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.08);
  text-align: center;
}
.order-confirm-message h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
}
.order-confirm-message p {
  font-size: 15px;
  line-height: 1.8;
  color: #555;
}
.confrim-btn {
  margin-top: 35px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
.confrim-btn button {
  padding: 12px 20px;
  background-color: #4b7bec;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s ease;
  min-width: 130px;
}
.confrim-btn button:hover {
  background-color: #3867d6;
}
.confrim-btn button:nth-child(2) {
  background-color: #4a4a4a; /* 다크그레이 */
}

.confrim-btn button:nth-child(2):hover {
  background-color: #333333; /* 더 진한 그레이 */
}
</style>
