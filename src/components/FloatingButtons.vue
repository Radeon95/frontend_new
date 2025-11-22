<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMobile = ref(window.innerWidth <= 768);
const isOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', checkMobile);
  checkMobile();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', checkMobile);
});
</script>

<template>
  <>
  <transition name="fade">
    <a
      v-if="!isScrolled"
      href="https://wa.me/447853451275"
      target="_blank"
      rel="noopener noreferrer"
      class="floating-button whatsapp-float"
    >
      <i class="fa-brands fa-whatsapp"></i>
      <span class="button-text">
        <span
          v-for="(letter, idx) in 'WhatsApp'.split('')"
          :key="idx"
          class="letter"
          :style="{ transitionDelay: `${idx * 50}ms` }"
        >
          {{ letter }}
        </span>
      </span>
    </a>
  </transition>
  <!-- 
        <transition name="fade">
          <a
            v-if="!isScrolled"
            href="https://t.me/ambremovals"
            target="_blank"
            rel="noopener noreferrer"
            class="floating-button telegram-float"
          >
            <i class="fa-brands fa-telegram"></i>
            <span class="button-text">
              <span
                v-for="(letter, idx) in 'Telegram'.split('')"
                :key="idx"
                class="letter"
                :style="{ transitionDelay: `${idx * 50}ms` }"
              >
                {{ letter }}
              </span>
            </span>
          </a>
        </transition> -->

  <!-- <transition name="fade">
          <a
            v-if="!isScrolled"
            href="https://www.instagram.com/ambremovals/"
            target="_blank"
            rel="noopener noreferrer"
            class="floating-button instagram-float"
          >
            <i class="fa-brands fa-instagram"></i>
            <span class="button-text">
              <span
                v-for="(letter, idx) in 'Instagram'.split('')"
                :key="idx"
                class="letter"
                :style="{ transitionDelay: `${idx * 50}ms` }"
              >
                {{ letter }}
              </span>
            </span>
          </a>
        </transition> -->

  <transition name="fade">
    <a v-if="!isScrolled" href="tel:01164560653" class="floating-button phone-float">
      <i class="fa-solid fa-phone"></i>
      <span class="button-text">
        <span
          v-for="(letter, idx) in 'Call Us'.split('')"
          :key="idx"
          :class="['letter', isScrolled ? 'fade-out' : '']"
          :style="{ transitionDelay: `${idx * 50}ms` }"
        >
          {{ letter }}
        </span>
      </span>
    </a>
  </transition>

  <!-- SMALL STICKY BUTTONS: only show when scrolled -->
  <transition name="scale-fade">
    <a
      v-if="isScrolled"
      href="https://wa.me/447853451275"
      target="_blank"
      rel="noopener noreferrer"
      class="floating-button whatsapp-float sticky no-text"
    >
      <i class="fa-brands fa-whatsapp"></i>
    </a>
  </transition>

  <!-- <transition name="scale-fade">
          <a
            v-if="isScrolled"
            href="https://t.me/ambremovals"
            target="_blank"
            rel="noopener noreferrer"
            class="floating-button telegram-float sticky no-text"
          >
            <i class="fa-brands fa-telegram"></i>
          </a>
        </transition> -->

  <!-- <transition name="scale-fade">
          <a
            v-if="isScrolled"
            href="https://www.instagram.com/ambremovals/"
            target="_blank"
            rel="noopener noreferrer"
            class="floating-button instagram-float sticky no-text"
          >
            <i class="fa-brands fa-instagram"></i>
          </a>
        </transition> -->

  <transition name="scale-fade">
    <a v-if="isScrolled" href="tel:01164560653" class="floating-button phone-float sticky no-text">
      <i class="fa-solid fa-phone"></i>
    </a>
  </transition>

  <!-- MOBILE FAB -->
  <div class="mobile-fab" v-if="isScrolled && isMobile">
    <button class="main-fab" @click="isOpen = !isOpen">
      <img src="@/assets/contact_AMB_Removals.png" alt="Contact" class="fab-icon" />
    </button>
    <a
      href="https://wa.me/message/CHLGJLYSNVZLE1"
      target="_blank"
      class="fab-child whatsapp"
      :class="{ open: isOpen }"
    >
      <i class="fa-brands fa-whatsapp"></i>
    </a>
    <!-- <a
            href="https://t.me/ambremovals"
            target="_blank"
            class="fab-child telegram"
            :class="{ open: isOpen }"
          >
            <i class="fa-brands fa-telegram"></i>
          </a> -->
    <!-- <a
            href="https://www.instagram.com/ambremovals"
            target="_blank"
            class="fab-child instagram"
            :class="{ open: isOpen }"
          >
            <i class="fa-brands fa-instagram"></i>
          </a> -->
    <a href="tel:+447853451275" class="fab-child phone" :class="{ open: isOpen }">
      <i class="fa-solid fa-phone"></i>
    </a>
  </div>
</template>

<style scoped>
/* Big button styles */
.floating-button {
  top: 75vh;
  position: absolute;
  background-color: #cdbe22;
  color: white;
  padding: 10px 16px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  z-index: 999;
  transition: all 0.5s ease, background-color 0.3s ease;
}

.floating-button i {
  font-size: 18px;
  transition: transform 0.5s ease;
}

.floating-button .button-text {
  margin-left: 8px;
  transition: opacity 0.5s ease, margin-left 0.5s ease;
  white-space: nowrap;
}

.floating-button:hover {
  transform: scale(1.1);
}

/* Big button positions */
.whatsapp-float {
  right: 10rem;
  background-color: #25d366;
}

.telegram-float {
  left: 10rem;
  background-color: #0088cc;
}

.instagram-float {
  right: 10.3rem;
  margin-top: -4rem;
  background-color: #c13584;
}
.phone-float {
  left: 10.8rem;
  /* margin-top: -1rem; */
  background-color: #333;
}
/* --- WHEN SCROLLING (sticky) --- */
.floating-button.sticky {
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  position: fixed;
  bottom: 10rem;
  border-radius: 100%;
  padding: 25px;
  height: 1rem;
  font-size: 25px;
  top: auto;
  transition: background-color 0.3s ease;
}

@keyframes pulsing {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Sticky button positions */
.whatsapp-float.sticky {
  box-shadow: rgba(66, 219, 135, 1) 0px 0px 0px 0.00811595px;
  right: 20px;
}

.telegram-float.sticky {
  box-shadow: rgb(38, 133, 221) 0px 0px 0px 0.00811595px;
  left: 20px;
}

.instagram-float.sticky {
  box-shadow: rgb(193, 53, 132) 0px 0px 0px 0.00811595px;
  right: 20px;
  bottom: calc(12rem + 70px); /* Above WhatsApp */
  background-color: #c13584;
}

.phone-float.sticky {
  box-shadow: rgb(50, 50, 50) 0px 0px 0px 0.00811595px;
  left: 20px;
  /* bottom: calc(12rem + 70px); Above Telegram */
  background-color: #333;
}

/* Text fade on scroll */
.floating-button.sticky .button-text {
  opacity: 0;
  width: 0;
  margin: 0;
  overflow: hidden;
  transition: opacity 2s ease, margin-left 2s ease;
}
.floating-button.sticky-enter-active {
  transition: opacity 2s ease, transform 2s ease;
}
.floating-button.sticky-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.floating-button.sticky i {
  transform: scale(2);
  transition: transform 2s ease;
}
.letter {
  display: inline-block;
  transition: transform 1s ease, opacity 1s ease;
}

.letter.fade-out {
  opacity: 0;
  transform: translateY(-10px);
}

/* Smooth fade transition for big buttons */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth scale + fade for sticky buttons */
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .floating-button {
    top: 83vh;
    width: auto;
    height: 2rem;
    padding: 6px 12px;
    border-radius: 25px;
    font-size: 16px;
    bottom: 15px;
  }
  .whatsapp-float {
    right: 2rem;
    background-color: #25d366;
  }

  .telegram-float {
    left: 2rem;
    background-color: #0088cc;
  }
  .instagram-float {
    right: 2.2rem;
    margin-top: -4rem;
    background-color: #c13584;
  }
  .phone-float {
    left: 2.7em;
    /* margin-top: -4rem; */
    background-color: #333;
  }
  .floating-button.sticky {
    left: 10px;
    right: auto !important;
  }

  .telegram-float.sticky {
    bottom: 10rem;
  }

  .whatsapp-float.sticky {
    bottom: calc(10rem - 25px - 60px);
    left: 10px;
    right: auto !important;
  }

  .instagram-float.sticky {
    bottom: calc(12rem + 70px);
    right: 10px;
  }

  .phone-float.sticky {
    bottom: calc(12rem + 70px);
    left: 10px;
  }
}

/*  */

@media (max-width: 768px) {
  /* Hide normal floating buttons */
  .floating-button.sticky {
    display: none !important;
  }

  .mobile-fab {
    position: fixed;
    bottom: 8rem;
    left: 0.5rem;
    z-index: 9999;
  }

  .main-fab {
    -webkit-tap-highlight-color: transparent;
    -webkit-focus-ring-color: transparent;

    width: auto;
    height: auto;
    border: none;
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    margin: 0;
    animation: pulsing 1.25s infinite;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
  }
  .main-fab:focus,
  .main-fab:hover {
    outline: none !important;
    box-shadow: none !important;
    background-color: transparent !important;
  }

  .fab-child {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #555;
    color: white;
    text-align: center;
    line-height: 60px;
    font-size: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: scale(0);
    transition: all 0.4s ease;
    pointer-events: none;
  }

  .fab-child::before {
    content: '';
    position: absolute;
    width: 2px;
    background-color: #ccc;
    left: 25px;
    top: 25px;
    transform-origin: center;
    transform: rotate(0deg) scaleY(0);
    transition: transform 0.4s ease;
  }

  /* When open, show children */
  .mobile-fab .fab-child.whatsapp,
  .mobile-fab .fab-child.telegram,
  .mobile-fab .fab-child.instagram,
  .mobile-fab .fab-child.phone {
    pointer-events: auto;
  }

  /* Positions + show transition when isOpen */
  .mobile-fab .fab-child.whatsapp {
    top: -70px;
    left: 55px;
  }
  .mobile-fab .fab-child.telegram {
    top: -30px;
    left: 75px;
  }
  .mobile-fab .fab-child.instagram {
    top: 44px;
    left: 80px;
  }
  .mobile-fab .fab-child.phone {
    top: 59px;
    left: 60px;
  }

  /* When expanded (v-if already controls visibility, but we'll use class for smooth effect) */
  .mobile-fab .fab-child[style*='display: block'],
  .mobile-fab .fab-child[style*='display: inline-block'] {
    opacity: 1;
    transform: scale(1);
  }

  .fab-child.whatsapp {
    background-color: #25d366;
  }
  .fab-child.telegram {
    background-color: #0088cc;
  }
  .fab-child.instagram {
    background-color: #c13584;
  }
  .fab-child.phone {
    background-color: #333;
  }

  /* Show lines when open */
  .mobile-fab .fab-child[style*='display: block']::before,
  .mobile-fab .fab-child[style*='display: inline-block']::before {
    height: 50px;
    transform: rotate(0deg) scaleY(1);
  }
  .fab-child.open {
    opacity: 1;
    transform: scale(1);
  }

  .fab-child.open::before {
    transform: rotate(0deg) scaleY(1);
  }
  .main-fab img.fab-icon {
    width: 55px;
    height: 55px;
    object-fit: contain;
    border-radius: 50%; /* optional if your image has a circle */
    display: block;
  }
}

/* ----- PULSING ANIMATION ----- */
@keyframes pulsing {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
