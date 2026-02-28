<template>
  <div class="gallery">
    <stickyButtons />
    <div class="gallery-section">
      <h1 class="section-title">Our Removals Gallery</h1>
      <!-- Page optimized for ambremovals SEO keyword -->
      <div class="gallery-grid">
        <img
          v-for="(img, index) in galleryImages"
          :key="index"
          :src="img"
          :alt="getAlt(img)"
          class="gallery-thumbnail"
          loading="lazy"
          @click="openLightbox(index)"
        />
      </div>

      <Lightbox
        v-if="lightboxVisible"
        :images="galleryImages"
        :startIndex="lightboxIndex"
        :visible="lightboxVisible"
        @close="lightboxVisible = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import Lightbox from './Lightbox.vue';
import stickyButtons from '../components/stickyButtons.vue';

const galleryImages = ref<string[]>(
  Object.values(
    import.meta.glob('/src/assets/galery/*.{jpg,jpeg,png,webp}', {
      eager: true,
      import: 'default',
    })
  )
);

const lightboxVisible = ref(false);
const lightboxIndex = ref(0);

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxVisible.value = true;
}

function getAlt(path: string) {
  const name = path.split('/').pop()?.replace(/[-_]/g, ' ').replace(/\..+$/, '') || 'Gallery image';
  return `ambremovals / AMB Removals – ${name}`;
}
useHead({
  title: 'Our Removals Gallery - AMB Removals Photo Showcase',
  meta: [
    {
      name: 'description',
      content:
        'Explore our photo gallery showcasing professional removals, packing and moving services by AMB Removals across the Midlands and the UK. See our team in action.',
    },
    {
      name: 'keywords',
      content:
        'ambremovals, removal gallery, moving van photos, relocation services, AMB Removals gallery',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'Gallery | AMB Removals',
    },
    {
      property: 'og:description',
      content: 'Explore the ambremovals photo gallery showcasing our moving services across the UK.',
    },
    {
      property: 'og:url',
      content: 'https://ambremovals.com/gallery',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: 'https://ambremovals.com/AMB_Removals.jpg',
    },
    {
      property: 'og:site_name',
      content: 'AMB Removals',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Gallery | AMB Removals',
    },
    {
      name: 'twitter:description',
      content: 'Explore the ambremovals photo gallery showcasing our moving services across the UK.',
    },
    {
      name: 'twitter:image',
      content: 'https://ambremovals.com/AMB_Removals.jpg',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://ambremovals.com/gallery' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'ambremovals Gallery',
        url: 'https://ambremovals.com/gallery',
        description: 'Gallery of ambremovals moving and packing services across the UK.',
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ambremovals.com' },
          { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://ambremovals.com/gallery' },
        ],
      }),
    },
  ],
});
</script>

<style scoped>
.gallery {
  padding: 2rem 1rem;
  font-family: 'Nunito', sans-serif;
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 20vh;
}
@media (min-width: 768px) and (max-width: 1025px) {
  .gallery {
    padding-top: 15vh;
  }
}
@media (max-width: 768px) {
  .gallery {
    padding-top: 17vh;
  }
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #d97a0b;
}
.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.gallery-thumbnail {
  width: 100%;
  max-width: 300px;
  border-radius: 6px;
  cursor: zoom-in;
  object-fit: cover;
}
</style>
