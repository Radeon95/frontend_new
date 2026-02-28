<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import { useHead } from '@vueuse/head';
import ambLogo from '@/assets/AmbLogo.png';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const menuToggleRef = ref<HTMLElement | null>(null);

const handleOutsideClick = (event: MouseEvent) => {
  if (typeof document === 'undefined') return;
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
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 10;
  }
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
                :src="ambLogo"
                loading="eager"
                width="115"
                height="100"
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
            <nav class="desktop-menu" aria-label="Main navigation">
              <router-link to="/" :class="['nav-link', { active: $route.path === '/' }]">Home</router-link>
              <router-link to="/services" :class="['nav-link', { active: $route.path === '/services' }]">Our Services</router-link>
              <router-link to="/gallery" :class="['nav-link', { active: $route.path === '/gallery' }]">Gallery</router-link>
              <router-link to="/about" :class="['nav-link', { active: $route.path === '/about' }]">About Us</router-link>
              <router-link to="/contact" :class="['nav-link', { active: $route.path === '/contact' }]">Contact</router-link>
              <router-link to="/quote" :class="['nav-link', { active: $route.path === '/quote' }]">Request Quote</router-link>
            </nav>
          </div>
        </div>
      </el-header>
      <transition name="slide">
        <div v-if="isMobileMenuOpen" class="mobile-menu-overlay">
          <nav class="mobile-menu" aria-label="Mobile navigation">
            <router-link to="/" @click="toggleMenu">Home</router-link>
            <router-link to="/services" @click="toggleMenu">Our Services</router-link>
            <router-link to="/gallery" @click="toggleMenu">Gallery</router-link>
            <router-link to="/about" @click="toggleMenu">About Us</router-link>
            <router-link to="/contact" @click="toggleMenu">Contact</router-link>
            <router-link to="/quote" @click="toggleMenu">Request Quote</router-link>
          </nav>
        </div>
      </transition>
      <el-main>
        <!-- Page optimized for ambremovals SEO keyword -->
        <router-view></router-view>
        <button @click="scrollToTop" class="scroll-to-top" aria-label="Scroll to top">
          <i class="fas fa-arrow-up"></i>
        </button>
      </el-main>

      <el-footer>
        <div class="footer-content">
          <div class="footer-info">
            <h3>AMB Removals Limited</h3>
            <p>Professional Moving Service</p>
            <p>2026 AMB Removals Limited. All rights reserved.</p>
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
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/services">Our Services</router-link></li>
              <li><router-link to="/about">About Us</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
              <li><router-link to="/gallery">Gallery</router-link></li>
              <li><router-link to="/quote">Get a Quote</router-link></li>
            </ul>
          </div>
          <div class="areas">
            <h4>Areas covered</h4>
            <ul>
              <li><router-link to="/removals-leicester">Leicester</router-link></li>
              <li><router-link to="/removals-nottingham">Nottingham</router-link></li>
              <li><router-link to="/removals-derby">Derby</router-link></li>
              <li><router-link to="/removals-coventry">Coventry</router-link></li>
              <li><router-link to="/removals-northampton">Northampton</router-link></li>
              <li><router-link to="/removals-loughborough">Loughborough</router-link></li>
              <li><router-link to="/removals-market-harborough">Market Harborough</router-link></li>
              <li><router-link to="/removals-lutterworth">Lutterworth</router-link></li>
              <li><router-link to="/removals-hinckley">Hinckley</router-link></li>
              <li><router-link to="/removals-rugby">Rugby</router-link></li>
              <li>Milton Keynes</li>
              <li>Tamworth</li>
              <li>Ashby-de-la-Zouch</li>
              <li>Royal Leamington Spa</li>
              <li>Oakham</li>
              <li>Coalville</li>
              <li>Castle Donington</li>
            </ul>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<style scoped>
.app-container {
  padding: 0;
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
.header-inner .logo img.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

@media (max-width: 890px) {
  .header-content {
    height: 100px;
    transition: none;
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

.footer-nav a {
  color: bisque;
  text-decoration: none;
}
.footer-nav a:hover {
  text-decoration: underline;
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
.areas a {
  color: bisque;
  text-decoration: none;
}
.areas a:hover {
  text-decoration: underline;
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
  gap: 0;
}
.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #818a94;
  color: white;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s ease;
}
.nav-link:hover,
.nav-link:focus {
  background-color: #545c64;
}
.nav-link.active {
  background-color: #545c64;
  color: #409eff;
}

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
    display: flex;
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
  .header-content {
    transition: none;
  }
  
  .header-content.scrolled {
    background-color: rgb(0 0 0 / 64%);
    padding: 25px 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    height: 11%;
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
