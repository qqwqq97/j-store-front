<script setup>
const menuItems = [
  { label: 'ALL', path: '/' },
  { label: 'NEW', path: '/' },
  { label: 'CLOTHING', path: '/' },
  { label: 'COSMETICS', path: '/' },
  { label: 'ACCESSORIES', path: '/' },
  { label: 'PHONE', path: '/' },
  { label: 'COMPUTERS', path: '/' },
  { label: 'GROCERY', path: '/' },
]
</script>

<template>
  <header class="header">
    <!-- 상단 바 -->
    <div class="header-top">
      <!-- 로고 -->
      <NuxtLink to="/" class="logo">
        <img src="/images/logo.png" alt="J-STORE_logo" class="logo-img">
        <span class="logo-text">J_STORE</span>
      </NuxtLink>

      <!-- 검색창 -->
      <div class="search-container">
        <input type="text" placeholder="SEARCH" class="search-input">
        <button class="search-button">
          <img src="/images/search.png" alt="search" class="search-icon">
        </button>
      </div>

      <!-- 사용자 액션 -->
      <div class="user-actions">
        <div class="cart">
          <img src="/images/cart.png" alt="cart" class="action-icon">
          <span class="action-text">Cart</span>
        </div>
        <div class="user">
          <img src="/images/user.png" alt="user" class="action-icon">
          <span class="action-text">User</span>
        </div>
      </div>
    </div>

    <!-- 네비게이션 메뉴 -->
    <nav class="main-nav">
      <ul class="menu-list">
        <li v-for="item in menuItems" :key="item.path" class="menu-item">
          <NuxtLink :to="item.path" class="menu-link">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* ===== 전체 헤더 ===== */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}

/* ===== 상단 영역 ===== */
.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  padding: 10px 20px;
}

/* ===== 로고 ===== */
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #222;
  font-weight: 700;
  font-size: 1.5rem;
  gap: 8px;
}

.logo-img {
  height: 40px;
}

.logo-text {
  letter-spacing: 1px;
}

/* ===== 검색창 ===== */
.search-container {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 400px;
  margin: 0 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
}

.search-button {
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background-color: #e0e0e0;
}

.search-icon {
  width: 18px;
  height: 18px;
}

/* ===== 사용자 액션 (Cart, User) ===== */
.user-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-actions > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #333;
  cursor: pointer;
}

.user-actions > div:hover .action-text {
  color: #007bff;
}

.action-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

/* ===== 네비게이션 메뉴 ===== */
.main-nav {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #eee;
}

.menu-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 12px 0;
  list-style: none;
  margin: 0;
}

.menu-link {
  text-decoration: none;
  color: #444;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.2s ease, border-bottom 0.2s ease;
}

.menu-link:hover,
.menu-link.router-link-active {
  color: #007bff;
  padding-bottom: 2px;
}

/* ===== 반응형 ===== */
@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    gap: 10px;
  }

  .search-container {
    order: 3;
    margin: 10px 0;
  }

  .user-actions {
    order: 2;
  }

  .main-nav .menu-list {
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 14px;
  }
}
</style>