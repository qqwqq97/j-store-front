<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '~/composable/useApi';

const { apiFetch } = useApi();
const router = useRouter();

const email = ref('');
const password = ref('');

const goRegister = () => {
  router.push('/register')
}

const loginBtnClick = async() => {
  try {
    const res = await apiFetch('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    });
    router.push('/')

  } catch (error) {
    if(error.data.message) {
      alert(error.data.message);
    } else {
      // 네트워크 오류 등
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  }
}
</script>
<template>
  <div class="login-container">
    <div class="login-box">
      <div class="profile">
        <img src="/images/login/profile.png" alt="profile">
      </div>
      <div class="login">
        <label for="email" class="login-label">
          <input id="email" type="email" placeholder="Email ID" v-model="email">
        </label>
        <label for="password" class="login-label">
          <input id="password" type="password" placeholder="Password" v-model="password">
        </label>
      </div>
      <div class="login-btn">
        <a class="loginBtn" @click="loginBtnClick">Login</a>
        <a class="loginBtn">Forgot Password?</a>
      </div>
      <a class="sign-up" @click="goRegister">SIGN UP+</a>
    </div>
  </div>
</template>
<style>
.login-container {
  width: 100%;
  height: auto;
  text-align: center;
  margin: 0 auto;
}
.login-box {
  margin: 200px auto;
  width: 500px;
  height: auto;
  border: 1px solid #f0f8ff;
  border-radius: 8px;
  padding: 50px 0px;
  background-color: #f0f8ff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile {
  margin-bottom: 20px;
  img {
    width: 120px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-label {
  display: flex;
  margin-bottom: 10px;
  input {
    width: 200px;
    border: none;
    padding: 8px;
  }
}
.login-btn {
  margin: 10px 0;
  .loginBtn {
    margin: 0 10px;
    border: 1px solid #d7ecff;
    border-radius: 8px;
    text-align: center;
    padding: 10px;
    background-color: #d7ecff;
    width: 100px;
  }
  .loginBtn:hover {
    background-color: steelblue;
    cursor: pointer;
    color: #fff;
  }
}
.sign-up {
  margin: 30px 0 0;
}
.sign-up:hover {
  color: steelblue;
  cursor: pointer;
  }
</style>