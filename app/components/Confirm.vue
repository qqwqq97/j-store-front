<script setup lang="ts">
import { useConfirm } from '~/composable/useConfirm'

const { isOpen, message, confirm, cancel } = useConfirm()
</script>
<template>
  <div v-if="isOpen" class="confirm-overlay">
    <div class="confirm-box">
      <p class="cofirm-message">{{ message }}</p>
      <div class="confirm-buttons">
        <button @click="confirm" class="btn confirm-btn">はい</button>
        <button @click="cancel" class="btn cancel-btn">いいえ</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .confirm-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .confirm-box {
    background-color: #fff;
    border-radius: 10px;
    padding: 24px;
    width: 320px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: fadeIn 0.2s ease-out;
  }
  .cofirm-message {
    color: #333;
    font-size: 15px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  .confirm-buttons {
    display: flex;
    justify-content: space-around;
    gap: 12px;
  }
  .btn {
    border: none;
    border-radius: 6px;
    padding: 8px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .confirm-btn {
    background-color: #007bff;
    color: #fff;
  }
  .confirm-btn:hover {
    background-color: #0066d1;
  }
  .cancel-btn {
    background-color: #e0e0e0;
    color: #333;
  }
  .cancel-btn:hover {
    background-color: #c9c9c9;
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