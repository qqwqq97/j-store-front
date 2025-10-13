<template>
  <div class="auth-layout">
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<style>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fff;
}
</style>