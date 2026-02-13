<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Declare gtag as a global variable
declare const gtag: (...args: any[]) => void;
import { useRoute } from 'vue-router';
const $route = useRoute();

const isScrolled = ref(false);
const isOpen = ref(false); // For expanding contacts on mobile

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

const isMobile = ref(false);

function checkMobile() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  window.addEventListener('resize', checkMobile);
  window.addEventListener('scroll', handleScroll);
  checkMobile(); // initial check
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
  window.removeEventListener('scroll', handleScroll);
});

function trackWhatsappClick() {
  if (typeof gtag === 'function') {
    gtag('event', 'click_whatsapp', {
      event_category: 'Contact',
      event_label: 'WhatsApp Floating Button',
      transport_type: 'beacon',
    });
  }
}
</script>

<template>
  <!-- WhatsApp -->
  <a
    role="button"
    title="Contact via WhatsApp"
    href="https://wa.me/message/CHLGJLYSNVZLE1"
    target="_blank"
    rel="noopener noreferrer"
    class="floating-button whatsapp-float sticky no-text"
    aria-label="Chat on WhatsApp"
    @click="trackWhatsappClick"
  >
    <i class="fa-brands fa-whatsapp"></i>
  </a>

  <!-- Telegram -->
  <!-- <a
    href="https://t.me/ambremovals"
    target="_blank"
    rel="noopener noreferrer"
    class="floating-button telegram-float sticky no-text"
  >
    <i class="fa-brands fa-telegram"></i>
  </a> -->

  <!-- Instagram -->
  <!-- <a
    href="https://www.instagram.com/ambremovals/"
    target="_blank"
    rel="noopener noreferrer"
    class="floating-button instagram-float sticky no-text"
  >
    <i class="fa-brands fa-instagram"></i>
  </a> -->

  <!-- Phone -->
  <a href="tel:01164560653" class="floating-button phone-float sticky no-text">
    <i class="fa-solid fa-phone"></i>
  </a>

  <!-- MOBILE VERSION (all in 1 button) -->
  <div class="mobile-fab" v-if="isMobile && (isScrolled || $route.path !== '/')">
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
/*  */
.floating-button.sticky {
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);

  position: fixed;
  bottom: 10rem;
  border-radius: 100%;
  padding: 25px;
  height: 1rem;
  font-size: 25px;
  top: auto; /* override top */
  transition: all 2s ease;
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

.whatsapp-float.sticky {
  box-shadow: rgba(66, 219, 135, 1) 0px 0px 0px 0.00811595px;
  right: 20px;
}

.telegram-float.sticky {
  box-shadow: rgb(38, 133, 221) 0px 0px 0px 0.00811595px;
  left: 20px;
}

/* Fade out text smoothly */
.floating-button.sticky .button-text {
  opacity: 0;
  width: 0;
  margin: 0;
  overflow: hidden;
  transition: opacity 2s ease, margin-left 2s ease;
}

/* Scale icon slightly */
.floating-button.sticky i {
  transform: scale(2);
  transition: transform 1s ease;
}
.letter {
  display: inline-block;
  transition: transform 1s ease, opacity 1s ease;
}
/* Staggered fade out effect for each letter */
.letter.fade-out {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .floating-button.sticky {
    left: 10px; /* Align both to left */
    right: auto !important; /* Remove right alignment */
  }

  .telegram-float.sticky {
    bottom: 10rem; /* Telegram higher */
  }

  .whatsapp-float.sticky {
    bottom: calc(10rem - 25px - 60px); /* WhatsApp 25px lower */
    left: 10px; /* Force same left alignment */
    right: auto !important; /* Remove right */
  }
}
.whatsapp-float {
  right: 10rem;
  background-color: #25d366;
}

.telegram-float {
  left: 10rem;
  background-color: #0088cc;
}

/*  */

.floating-button {
  color: white;

  display: flex;
  align-items: center;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  z-index: 999;
  transition: all 0.5s ease, background-color 0.3s ease;
}
.floating-button i {
  font-size: 18px;
  transition: transform 0.5s ease;
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

/*  ////////////// */
@media (max-width: 768px) {
  /* Hide normal floating buttons */
  .whatsapp-float,
  .telegram-float,
  .instagram-float,
  .phone-float {
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
