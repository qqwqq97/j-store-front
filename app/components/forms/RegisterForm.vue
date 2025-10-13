<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '~/composable/useApi';

const { apiFetch } = useApi();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

const goSignIn = () => {
  router.push('/login')
}

const signUp = async() => {
  try {
    const res = await apiFetch('/api/register', {
    method: 'POST',
    body: {
      name: name.value,
      email: email.value,
      password: password.value
      }
    });
    alert(res.message)
  } catch (error) {
    if(error?.data) {
      const errors = error.data.errors;

      if(errors) {
        if(errors.name) alert(`name: ${errors.name[0]}`);
        if(errors.email) alert(`email: ${errors.email[0]}`);
        if(errors.password) alert(`name: ${errors.password[0]}`);
      } else if (error.data.message) {
        // 일반 에러 메시지 처리
        alert(error.data.message);
      }
    } else {
        // 네트워크 오류 등
        alert('서버와 통신 중 오류가 발생했습니다.');
    }
  }
}

</script>
<template>
  <div class="signUpBox">
    <div class="signUpContainer">
      <h2 class="title">Sign up</h2>
      <input class="name" type="text" placeholder="Name" v-model="name">
      <input class="email" type="email" placeholder="Email" v-model="email">
      <input class="password" type="password" placeholder="Password" v-model="password">
      <button class="signUpBtn" @click = signUp>Sign up</button>
    </div>
    <div class="already">Already have an account? <a @click="goSignIn">Sign in</a></div>
  </div>
</template>
<style>
.signUpBox {
  width: 500px;
  margin: 200px auto;
  text-align: center;
}
.signUpContainer {
  display: flex;
  flex-direction: column;
  border: 1px solid #fff;
  padding: 50px;
  background-color: #fff;
  > .title {
    font-weight: 400;
    font-size: 40px;
    color: #000;
  }
  > .name {
    padding: 15px 15px 15px 0;
    margin-bottom: 20px;
    border-bottom: 2px solid #ddd !important;
    border: none;
    outline: none;
  } 
  > .email {
    padding: 15px 15px 15px 0;
    margin-bottom: 20px;
    border-bottom: 2px solid #ddd !important;
    border: none;
    outline: none;
  }
  > .password {
    padding: 15px 15px 15px 0;
    margin-bottom: 50px;
    border-bottom: 2px solid #ddd !important;
    border: none;
    outline: none;
  }
  > .signUpBtn {
    color: #fff;
    background: #058aff;
    padding: 15px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
  }
  > .signUpBtn:hover {
    background-color: steelblue;
    cursor: pointer;
  }
}
.already {
  margin-top: 15px;
  > a {
    color: #058aff;
    padding-left: 5px;
  }
  > a:hover {
    color: steelblue;
    cursor: pointer;
  }
}
</style>