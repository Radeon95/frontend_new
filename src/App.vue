<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import { useHead } from '@vueuse/head';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const menuToggleRef = ref<HTMLElement | null>(null);

const handleOutsideClick = (event: MouseEvent) => {
  const menu = document.querySelector('.mobile-menu');
  const toggleBtn = menuToggleRef.value;
  if (
    isMobileMenuOpen.value &&
    !menu?.contains(event.target as Node) &&
    !toggleBtn?.contains(event.target as Node)
  ) {
    isMobileMenuOpen.value = false;
  }
};

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('scroll', handleScroll);
});

// SEO
useHead({
  titleTemplate: title => (title ? `${title} | AMB Removals` : 'AMB Removals'),
  meta: [
    {
      name: 'description',
      content:
        'ambremovals is the trusted online brand for AMB Removals, offering professional and reliable moving services across the UK.',
    },
    {
      name: 'keywords',
      content:
        'ambremovals, AMB Removals, moving company UK, house removals, relocation, Leicester',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
    {
      name: 'author',
      content: 'AMB Removals',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://ambremovals.com/' }],
});
</script>
<template>
  <div class="app-container">
    <el-container>
      <el-header :class="['header-content', { scrolled: isScrolled }]">
        <div class="header-inner">
          <div class="assured-container">
            <img
              alt="AMB Removals Assured"
              class="assured-header"
              src="https://www.moveassured.com/img/MA-logo-header.png"
              loading="lazy"
            />
            <div class="mobile-phone">
              <a href="tel:01164560653" class="phone-link-mobile">
                <i class="fas fa-phone"></i> 0 (116) 456-0653
              </a>
            </div>
          </div>
          <div class="logo">
            <a href="/">
              <img
                alt="AMB Removals Limited"
                class="logo"
                src="/src/assets/AmbLogo.png"
                loading="lazy"
              />
            </a>
          </div>
          <button
            @click.stop="toggleMenu"
            class="mobile-menu-toggle"
            ref="menuToggleRef"
            aria-label="Toggle mobile menu"
            :aria-expanded="isMobileMenuOpen"
          >
            <i class="fas fa-bars" v-if="!isMobileMenuOpen"></i>
            <i class="fas fa-times" v-else=""></i>
          </button>
          <div class="header-right-section">
            <div class="header-phone">
              <a href="tel:01164560653" class="phone-link">
                <i class="fas fa-phone"></i> 0 (116) 456-0653
              </a>
            </div>
            <el-menu
              :default-active="$route.path"
              :ellipsis="false"
              class="desktop-menu"
              mode="horizontal"
              router=""
            >
              <el-menu-item index="/" router="/">Home</el-menu-item>
              <el-menu-item index="/services" router="/services">Our Services</el-menu-item>
              <el-menu-item index="/galery" router="/galery">Gallery</el-menu-item>
              <el-menu-item index="/about" router="/about">About Us</el-menu-item>
              <el-menu-item index="/contact" router="/contact">Contact</el-menu-item>
              <el-menu-item index="/quote" router="/quote"> Request Quote</el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-header>
      <transition name="slide">
        <div v-if="isMobileMenuOpen" class="mobile-menu-overlay">
          <div class="mobile-menu">
            <router-link to="/" @click="toggleMenu">Home</router-link>
            <router-link to="/services" @click="toggleMenu">Our Services</router-link>
            <router-link to="/galery" @click="toggleMenu">Gallery</router-link>
            <router-link to="/about" @click="toggleMenu">About Us</router-link>
            <router-link to="/contact" @click="toggleMenu">Contact</router-link>
            <router-link to="/quote" @click="toggleMenu">Request Quote</router-link>
          </div>
        </div>
      </transition>
      <el-main>
        <!-- Page optimized for ambremovals SEO keyword -->
        <router-view></router-view>
        <button @click="scrollToTop" class="scroll-to-top">
          <i class="fas fa-arrow-up"></i>
        </button>
      </el-main>

      <el-footer>
        <div class="footer-content">
          <div class="footer-info">
            <h3>AMB Removals Limited</h3>
            <p>Professional Moving Service</p>
            <p>2025 AMB Removals Limited. All rights reserved.</p>
            <img
              alt="AMB Removals Assured"
              class="assured"
              src="https://www.moveassured.com/img/MA-logo-header.png"
              loading="lazy"
            />
            <div class="social-links">
              <a
                href="https://www.facebook.com/ambremovalslimited"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/ambremovals"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                href="https://t.me/ambremovals"
                title="Telegram"
                target="_blank"
                rel="noopener noreferrer"
                ><i class="fab fa-telegram-plane"></i
              ></a>
            </div>
          </div>

          <div class="footer-contact">
            <h4>Contact</h4>

            <p>
              <el-icon><Phone /></el-icon> 0 (116) 456-0653
            </p>
            <p>
              <el-icon><Message /></el-icon> info@ambremovals.com
            </p>
          </div>
          <div class="footer-nav">
            <h4>Navigation</h4>
            <ul>
              <li><el-link @click="$router.push('/')">Home</el-link></li>
              <li>
                <el-link @click="$router.push('/services')">Our Services</el-link>
              </li>
              <li>
                <el-link @click="$router.push('/about')">About Us</el-link>
              </li>
              <li>
                <el-link @click="$router.push('/contact')">Contact</el-link>
              </li>
              <li>
                <el-link @click="$router.push('/galery')">Gallery</el-link>
              </li>
              <li>
                <el-link @click="$router.push('/quote')">Get a Quote</el-link>
              </li>
            </ul>
          </div>
          <div class="areas">
            <h4>Areas covered</h4>
            <ul>
              <li>Milton Keynes</li>
              <li>Tamworth</li>
              <li>Ashby-de-la-Zouch</li>
              <li>Royal Leamington Spa</li>
              <li>Market Harborough</li>
              <li>Lutterworth</li>
              <li>Loughborough</li>
              <li>Hinckley</li>
              <li>Oakham</li>
              <li>Coalville</li>
              <li>Derby</li>
              <li>Leicestershire</li>
              <li>Castle Donington</li>
              <li>Nottingham</li>
              <li>Coventry</li>
              <li>Northampton</li>
              <li>Rugby</li>
            </ul>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<style scoped>
.app-container {
  padding: auto;
}

@media (max-width: 890px) {
  .app-container {
    padding: 0;
  }
}

.header-content {
  position: fixed;
  height: auto;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 25px 20px;
  background-color: transparent;
  transition: background-color 0.4s ease, padding 0.4s ease, box-shadow 0.4s ease;
}

@media (min-width: 891px) {
  .header-content {
    height: 115px;
  }
}

/*     width: 170px;
    height: 88px; */
.header-content.hidden {
  /* top: -100px; */
  background-color: rgb(0 0 0 / 64%);
  position: sticky;
}
.header-inner .logo {
  margin-left: 43%;

  /* width: 215px; */
  height: 100px;
  min-width: 115px;
  min-height: 100px;
  position: relative;
  z-index: 1;
}

.el-menu-item {
  background-color: #818a94;
  color: white;
  border-bottom: #cdbe22;
}
@media (max-width: 890px) {
  .header-content {
    height: 100px;
  }
  .header-inner {
    padding: 10px;
    position: relative;
  }
  .header-inner .logo {
    all: unset;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    max-width: 140px;
    max-height: 70px;
    min-width: 100px;
    min-height: 60px;
    height: 70px;
    width: 140px;
  }
  .header-inner .logo a {
    width: 100%;
    height: 100%;
    margin-left: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-inner .logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  .mobile-menu-toggle {
    position: absolute;
    right: 15px;
    z-index: 2;
  }
  .fa-bars:before,
  .fa-navicon:before {
    color: #e3d385;
  }
  .fa-close:before,
  .fa-multiply:before,
  .fa-remove:before,
  .fa-times:before,
  .fa-xmark:before {
    color: #e3d385;
  }
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-main {
  padding: 0;
  min-height: calc(100vh - 120px);
}

.el-footer {
  background-color: #545c64;
  color: rgb(62, 58, 58);
  padding: 20px;
  height: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-info {
  flex: 1;
  min-width: 200px;
}

.footer-info h3 {
  margin-top: 0;
  color: bisque;
}
.footer-info p {
  margin-top: 0;
  color: bisque;
}
.footer-contact {
  color: bisque;
}

.footer-contact,
.footer-nav {
  flex: 1;
  min-width: 200px;
}

.footer-nav h4 {
  margin-bottom: -1px;
}
.footer-contact h4,
.footer-nav h4 {
  color: bisque;
  margin-top: 0;
}

.footer-contact p {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav li {
  margin-bottom: 8px;
}

.footer-nav .el-link {
  color: bisque;
}
.areas {
  flex: 1;
}
.areas h4 {
  margin-bottom: -1px;
  color: bisque;
  margin-top: 0;
}
.areas ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.areas li {
  margin-bottom: 8px;
  color: bisque;
}

.social-links a {
  margin: 0 10px;
  font-size: 24px;
  color: #b7b3b3;
  text-decoration: none;
}

.social-links a:hover {
  color: #007bff;
}

.header-right-section {
  display: none;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.header-phone {
  display: flex;
  align-items: center;
}

.header-phone .phone-link {
  color: white;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
}

.header-phone .phone-link:hover {
  color: #409eff;
}

.header-phone .phone-link i {
  font-size: 12px;
}

.desktop-menu {
  display: none;
  border: #545c64;
}
.el-menu-item {
  margin-bottom: -20px;
  border: #545c64;
}

.el-menu-item.is-active:hover {
  background-color: #545c64;
}
.el-menu-item:not(.is-disabled):hover {
  background-color: #545c64;
}
.el-menu-item:not(.is-disabled):focus {
  background-color: #545c64;
}
/* .el-menu-item:hover {
  background-color: #2fe1de;
  color: #2fe1de;
}
.el-menu-item:focus {
  color: #545c64;
} */

@media (min-width: 891px) and (max-width: 1444px) {
  .header-inner .logo {
    all: unset;
    margin-left: 10%;
    max-width: 300px;
    max-height: 60px;
    min-width: 115px;
    min-height: 100px;
  }
}
.mobile-menu-toggle {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  z-index: 1001;
}

.mobile-menu {
  position: fixed;
  top: 60px;
  right: 0;
  width: 100%;
  height: 5%;
  background: white;
  z-index: 1001;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  padding-top: 0;
  background-color: #818a94;
}

.mobile-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: rgb(0 0 0 / 67%);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
.el-menu-item.is-active {
  background-color: #545c64;
  color: #409eff;
  border-bottom: #818a94;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateY(-100%);
}
.slide-leave-to {
  transform: translateY(-100%);
}

.scroll-to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  font-size: 25px;
  background: none;
  color: blue;
  border: none;
  border-radius: 50%;
  padding: 10px 12px;
  cursor: pointer;
  z-index: 999;
}
@media (min-width: 768px) and (max-width: 1024px) {
  .scroll-to-top {
    font-size: 50px;
  }
}

@media (min-width: 891px) {
  .header-right-section {
    display: flex;
  }

  .desktop-menu {
    display: flex !important;
  }

  .mobile-menu-toggle,
  .mobile-menu {
    display: none;
  }
}

@media (max-width: 890px) {
  .social-links a {
    margin: 0 10px;
    font-size: 24px;
    color: #dbd5d5;
    text-decoration: none;
  }
}

/* Mobile Menu Styles */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: #818a94;
  backdrop-filter: blur(10px);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

.mobile-menu.open {
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 50%;
  width: 250px;
  height: 100%;
  background: #818a94;
  padding: 2rem;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-menu a {
  font-size: 1.2rem;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
  color: #fece7a;
}

.mobile-menu a:hover {
  color: #1beabd;
}

.header-content.scrolled {
  background-color: rgb(0 0 0 / 64%);
  padding: 15px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 890px) {
  .header-content.scrolled {
    padding: 0;
    height: 100px;
  }
  .header-content.scrolled .header-inner {
    padding: 10px;
  }
}
.assured {
  width: 15vh;
}

.assured-container {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.assured-header {
  width: 60px;
  height: auto;
  object-fit: contain;
}

.mobile-phone {
  display: none;
}

@media (max-width: 890px) {
  .assured-container {
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .assured-header {
    width: 40px;
  }

  .mobile-phone {
    display: flex;
    align-items: center;
  }

  .phone-link-mobile {
    color: #e3d385;
    text-decoration: none;
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 3px;
    white-space: nowrap;
  }

  .phone-link-mobile i {
    font-size: 8px;
  }

  /* Ensure AMB logo doesn't overlap with Move Assured logo */
  .header-inner .logo {
    transform: translateX(-50%);
  }
}
</style>
