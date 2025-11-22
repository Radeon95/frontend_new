<script setup lang="ts">
import { ref } from 'vue';
import Lightbox from '../views/Lightbox.vue';

const props = defineProps<{
  galleryImages: { src: string; alt: string }[];
}>();

const emit = defineEmits(['open-quote']);

const mainGallery = ref<HTMLDivElement | null>(null);
const thumbGallery = ref<HTMLDivElement | null>(null);
const mainImages = ref<(HTMLImageElement | null)[]>([]);

const lightboxIndex = ref(0);
const lightboxVisible = ref(false);

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxVisible.value = true;
}

function scrollToImage(index: number) {
  const container = mainGallery.value;
  const targetImage = mainImages.value[index];
  if (container && targetImage) {
    const scrollOffset = targetImage.offsetLeft - container.offsetLeft;
    container.scrollTo({ left: scrollOffset, behavior: 'smooth' });
  }
}

function scrollGallery(direction: 'left' | 'right') {
  if (!mainGallery.value || !props.galleryImages.length) return;

  const total = props.galleryImages.length;
  let newIndex = lightboxIndex.value;

  newIndex = direction === 'left' ? (newIndex - 1 + total) % total : (newIndex + 1) % total;

  scrollToImage(newIndex);
  lightboxIndex.value = newIndex;
}
</script>
<template>
  <div class="section gallery-section">
    <h2 class="section-title">Gallery</h2>

    <div class="gallery-wrapper">
      <button class="nav-arrow left" @click.prevent="scrollGallery('left')">&#10094;</button>
      <div class="gallery-scroll" ref="mainGallery">
        <img
          v-for="(image, index) in props.galleryImages"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          ref="mainImages"
          loading="lazy"
          @click="openLightbox(index)"
          class="gallery-image"
        />
      </div>
      <button class="nav-arrow right" @click.prevent="scrollGallery('right')">&#10095;</button>
    </div>

    <div class="thumbnail-scroll" ref="thumbGallery">
      <img
        v-for="(image, index) in galleryImages"
        :key="'thumb-' + index"
        :src="image.src"
        :alt="image.alt || `Thumbnail ${index + 1}`"
        class="thumbnail"
        loading="lazy"
        :class="{ active: index === lightboxIndex }"
        @click="scrollToImage(index)"
      />
    </div>

    <Lightbox
      v-if="lightboxVisible"
      :images="galleryImages.map(image => image.src)"
      :startIndex="lightboxIndex"
      :visible="lightboxVisible"
      @close="lightboxVisible = false"
    />

    <el-button class="quote-section-galery" type="primary" size="large" @click="emit('open-quote')">
      GET FREE QUOTE
    </el-button>
  </div>
</template>

<style scoped>
.gallery-section {
  padding: 2rem 1rem;
}
.gallery-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.gallery-scroll {
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: 100%;
  gap: 10px;
  height: 35rem;
  scroll-snap-type: x mandatory;
}

.gallery-image {
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  scroll-snap-align: start;
  flex-shrink: 0;
  border-radius: 6px;
  cursor: zoom-in;
}

.thumbnail-scroll {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  margin-top: 10px;
}
.thumbnail {
  height: 60px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s;
}
.thumbnail:hover {
  border-color: #409eff;
}
.thumbnail.active {
  border-color: #409eff;
}

.nav-arrow {
  background: none;
  border: none;
  font-size: 2rem;
  color: black;
  position: absolute;
  top: 40%;
  z-index: 1;
  cursor: pointer;
  padding: 0 10px;
}
.nav-arrow.left {
  left: 5px;
}
.nav-arrow.right {
  right: 5px;
}

.quote-section-galery {
  margin-left: 40%;
  margin-top: 4rem;
  margin-bottom: -3rem;
  font-size: 20px;
}

@media (max-width: 768px) {
  .gallery-scroll {
    height: auto;
  }
  .gallery-image {
    height: 300px;
  }
  .quote-section-galery {
    margin-top: 2rem;
    margin-bottom: -3rem;
    margin-left: 24%;
  }
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.lightbox img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
}

.nav-arrow:focus {
  outline: none;
  box-shadow: none;
}
.nav-arrow {
  background: none;
  border: none;

  font-size: 2rem;
  color: black;

  /*  */
  position: absolute;
  top: 40%;

  z-index: 1;
  cursor: pointer;
  padding: 0 10px;
}
</style>
