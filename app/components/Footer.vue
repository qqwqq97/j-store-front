<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="copyright">© 2025 J_STORE. All rights reserved.</p>
      <div class="social-icons">
        <a href="#"><img src="/images/icon_facebook.png" alt="facebook" /></a>
        <a href="#"><img src="/images/icon_instagram.png" alt="instagram" /></a>
        <a href="#"><img src="/images/icon_twitter.png" alt="twitter" /></a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background-color: #f9fafc;
  border-top: 1px solid #e5e5e5;
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.footer-inner {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

/* 저작권 */
.copyright {
  font-size: 13px;
  color: #777;
}

/* SNS 아이콘 */
.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons img {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.social-icons img:hover {
  opacity: 1;
}

/* 반응형 */
@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    gap: 10px;
  }
}
</style>