<script setup>
import LoginForm from '~/components/forms/LoginForm.vue';
import { useAuth } from '~/composable/useAuth';

definePageMeta({
  layout: 'auth'
})

const auth = useAuth();

if(auth.user.value) {
  navigateTo('/')
}
</script>
<template>
  <LoginForm />
</template>