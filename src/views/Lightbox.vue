<template>
  <div
    v-if="visible"
    ref="lightboxRef"
    class="lightbox"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    @click.self="$emit('close')"
  >
    <transition name="fade">
      <img
        :src="images?.[currentIndex] || ''"
        class="lightbox-image"
        @touchstart="startTouch"
        @touchend="endTouch"
        loading="lazy"
        alt="Enlarged gallery image"
      />
    </transition>
    <div v-if="!isMobile" class="lightbox-controls">
      <button @click.stop="prev">‹</button>
      <button @click.stop="next">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  images: Array as () => string[],
  startIndex: Number,
  visible: Boolean,
});

const emit = defineEmits(['close']);

const currentIndex = ref(props.startIndex || 0);
const lightboxRef = ref<HTMLDivElement | null>(null);

watch(
  () => props.startIndex,
  val => {
    currentIndex.value = val ?? 0;
  }
);

const isMobile = ref(false);

function checkMobile() {
  isMobile.value = window.innerWidth < 768;
}

function trapTabKey(e: KeyboardEvent) {
  if (!props.visible) return;

  const focusable = lightboxRef.value?.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable || focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
}

function prev() {
  currentIndex.value =
    (currentIndex.value - 1 + (props.images?.length ?? 0)) % (props.images?.length ?? 1);
}
function next() {
  currentIndex.value = (currentIndex.value + 1) % (props.images?.length ?? 1);
}

let startX = 0;
function startTouch(e: TouchEvent) {
  startX = e.touches[0].clientX;
}
function endTouch(e: TouchEvent) {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) next();
  else if (endX - startX > 50) prev();
}

function handleKey(e: KeyboardEvent) {
  if (!props.visible) return;

  trapTabKey(e); // 👈 previne focusul să iasă

  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    next();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    emit('close');
  }
}

function disableBodyScroll(e: Event) {
  if (props.visible) {
    e.preventDefault();
  }
}

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('keydown', handleKey, { passive: false });
  window.addEventListener('wheel', disableBodyScroll, { passive: false });
  window.addEventListener('touchmove', disableBodyScroll, { passive: false });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
  window.removeEventListener('keydown', handleKey);
  window.removeEventListener('wheel', disableBodyScroll);
  window.removeEventListener('touchmove', disableBodyScroll);
  document.body.classList.remove('no-scroll');
});

watch(
  () => props.visible,
  newVal => {
    if (newVal) {
      document.body.classList.add('no-scroll');
      // Forțează focus pe lightbox
      setTimeout(() => {
        lightboxRef.value?.focus();
      }, 0);
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
);
</script>

<style scoped>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lightbox img {
  width: auto;
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 10px;
}
.lightbox-controls {
  margin-top: 10px;
  display: flex;
  gap: 2rem;
}
.lightbox-controls button {
  background: white;
  border: none;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
@media (min-width: 1024px) {
  .lightbox img {
    max-width: 80vw;
    max-height: 90vh;
  }
}

@media (min-width: 768px) and (max-width: 1132px) {
  .lightbox-controls button {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .lightbox-controls {
    display: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:global(body.no-scroll) {
  overflow: hidden;
  height: 100%;
}
</style>
