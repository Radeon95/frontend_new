<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useHead } from '@vueuse/head';

import QuoteForm from '@/components/QuoteForm.vue';
import { ElDialog } from 'element-plus';
import OurServices from '../components/OurServices.vue';
import WhyUs from '../components/WhyUs.vue';
import GallerySection from '../components/GallerySection.vue';
import ReviewsSection from '../components/ReviewsSection.vue';
import FaqSection from '../components/FaqSection.vue';
import FloatingButtons from '../components/FloatingButtons.vue';

// REVIEWS
const isVisible = ref(false);

const showQuoteModal = ref(false);

// Gallery
const rawImages = import.meta.glob('/src/assets/galery/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const galleryImages = ref<{ src: string; alt: string }[]>(
  Object.entries(rawImages).map(([path, src]) => {
    const fileName = path.split('/').pop()?.split('.')[0] || '';
    const alt = fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return { src: src as string, alt };
  })
);

// Contacts:

onMounted(() => {
  const el = document.querySelector('.elfsight-app-9cd0abc5-08e1-4dc1-8ccd-0f60387d7b18');

  if (el) {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          isVisible.value = true;

          const existingScript = document.querySelector(
            'script[src="https://static.elfsight.com/platform/platform.js"]'
          );
          if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://static.elfsight.com/platform/platform.js';
            script.async = true;
            document.body.appendChild(script);
          }

          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(el);
  }
});

let scrollY = 0;

watch(showQuoteModal, val => {
  if (val) {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  } else {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.overflow = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }
});

useHead({
  title: 'AMB Removals - Fast & Secure Moving Services',
  meta: [
    {
      name: 'description',
      content: 'Professional moving company offering home and office relocation with care.',
    },
    {
      property: 'og:title',
      content: 'AMB Removals - Fast & Secure Moving Services',
    },
    {
      property: 'og:description',
      content: 'We pack, move, and unpack — your stress-free move starts here!',
    },
    {
      property: 'og:image',
      content: 'https://ambremovals.com/AMB_Removals.jpg',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://ambremovals.com',
    },
    {
      property: 'og:site_name',
      content: 'AMB Removals',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://ambremovals.com',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How quickly can you organize a move?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depending on the complexity and volume of work, we can organize a move within 1–3 days from the order confirmation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you work on weekends and holidays?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we work without days off, including holidays. However, a surcharge may apply on holidays.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you provide guarantees for your services?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we provide guarantees for all our services. In case of damage to items during the move, we compensate for the damage according to the contract.',
            },
          },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MovingCompany',
        name: 'AMB Removals Limited',
        url: 'https://ambremovals.com',
        logo: 'https://ambremovals.com/amb_logo.jpeg',
        image: 'https://ambremovals.com/AMB_Removals.jpg',
        description:
          'AMB Removals is a fully insured and accredited moving company based in Leicester, offering professional relocation services across Leicestershire and surrounding areas.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Leicester',
          addressRegion: 'Leicestershire',
          postalCode: 'LE8',
          addressCountry: 'GB',
        },
        telephone: '+44 116 456 0653',
        areaServed: [
          'Leicester',
          'Loughborough',
          'Hinckley',
          'Market Harborough',
          'Wigston',
          'Oadby',
          'Leicestershire',
        ],
        foundingDate: '2023',
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Accredited Removals Company',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Move Assured',
            },
          },
        ],
        sameAs: [
          'https://www.instagram.com/ambremovals/',
          'https://www.facebook.com/ambremovals/',
          'https://t.me/ambremovals',
          'https://wa.me/447853451275',
        ],
      }),
    },
  ],
});
</script>

<template>
  <div class="home-container">
    <!-- Баннер -->
    <div class="hero-section">
      <img
        src="/AMB_Removals.jpg"
        alt="AMB Removals team in front of their moving vans"
        class="hero-image"
        width="1280"
        height="720"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        style="width: 100%; height: 100%; display: block"
      />
      <div class="hero-content">
        <div class="welcomeTxt">
          <h1 style="font-family: 'Inter', sans-serif; color: bisque; align-items: center">
            AMB Removals Limited
          </h1>

          <p class="p2">Your Trusted Family-Run Removals Company</p>
          <el-dialog
            :teleported="false"
            v-model="showQuoteModal"
            title="About Your Move..."
            top="5vh"
            :style="{ backgroundColor: '#dfdfdf' }"
            class="quote-dialog"
            :close-on-click-modal="false"
          >
            <QuoteForm variant="modal" />
          </el-dialog>
          <el-button class="quote" type="primary" size="large" @click="showQuoteModal = true">
            GET FREE QUOTE
          </el-button>

          <FloatingButtons />
        </div>
      </div>
    </div>

    <OurServices />

    <WhyUs @open-quote="showQuoteModal = true" />

    <!-- Customer Reviews Widget -->
    <!-- <div class="elfsight-app-9cd0abc5-08e1-4dc1-8ccd-0f60387d7b18"></div> -->

    <!-- Как мы работаем -->
    <div class="section how-we-work-section">
      <h2 class="section-title">How it work's</h2>
      <el-steps :active="4" finish-status="success" simple class="how-it-works-steps">
        <el-step title="Request" description="Place a request"></el-step>
        <el-step title="Evaluation" description="Our professionals will evaluate"></el-step>
        <el-step title="Moving" description="Our team will be ready in time"></el-step>
        <el-step title="Result" description="All your things are in their new place"></el-step>
      </el-steps>
    </div>

    <GallerySection :galleryImages="galleryImages" @open-quote="showQuoteModal = true" />

    <!-- FAQ -->

    <FaqSection />

    <ReviewsSection />
    <!-- Призыв к действию -->
    <div class="cta-section">
      <h2>Ready for moving?</h2>
      <!-- <p>Contact us  </p> -->
      <el-button type="primary" size="large" @click="$router.push('/quote')">
        Request Quote
      </el-button>
      <el-button type="primary" size="large" @click="$router.push('/contact')">
        Contact Us
      </el-button>
    </div>

    <QuoteForm />
  </div>
</template>

<style scoped>
/* QUOTE  */
/* Target only the modal version of the quote form */

:deep(.el-dialog .quote-container) {
  padding: 1rem;
  margin: 0 auto;
  max-width: 100%;
}

:deep(.el-dialog .quote-form) {
  gap: 0rem;
  padding-top: 0;
}

:deep(.el-dialog .form-group) {
  margin-bottom: 0.2rem;
}
:deep(.quote-dialog .el-dialog__header) {
  justify-content: center;
  text-align: center;
}
:deep(.quote-dialog .el-dialog__title) {
  margin: 0 auto;
  display: block;
  font-weight: bold;
  font-size: 35px;
}

:deep(.el-dialog .el-input__wrapper),
:deep(.el-dialog .el-textarea__inner),
:deep(.el-dialog .el-select .el-input__wrapper) {
  padding: 6px 10px;
  font-size: 16px;
  background-color: #fff;
}

:deep(.el-dialog .el-button) {
  padding: 8px 20px;
  font-size: 18px;
  width: 30%;
  margin-left: 0;
}
:deep(.el-dialog .el-dialog__headerbtn) {
  font-size: 40px;
  top: 0.5rem;
}

:deep(.el-dialog h3) {
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.quote {
  position: absolute;
  top: 70%; /* Adjust to fine-tune */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-size: 20px;
}
:deep(.el-dialog .el-select__wrapper) {
  font-size: 16px;
}

@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 95%;
  }
  :deep(.el-dialog .quote-container) {
    padding: 1rem;
    margin: 0 auto;
    max-width: 100%;
  }
  :deep(.el-dialog .el-button) {
    padding: 8px 20px;
    font-size: 14px;
    width: 30%;
    margin-left: 0%;
  }
  :deep(.quote-dialog .el-dialog) {
    width: 90% !important;
    margin: 0 auto !important;
  }
  :deep(.el-dialog .el-checkbox__inner) {
    margin: -0.5rem;
  }

  :deep(.el-dialog .el-checkbox__label) {
    font-size: 16px;
    padding-left: 12px;
  }

  :deep(.el-dialog .el-input__wrapper),
  :deep(.el-dialog .el-textarea__inner),
  :deep(.el-dialog .el-select .el-input__wrapper) {
    font-size: 18px;
  }
  :deep(.el-form-item--label-top .el-form-item__label) {
    font-size: 16px;
    display: flex;
    justify-content: flex-start;
  }
  :deep(.el-dialog h3) {
    font-size: 19px;
  }
}
@media (max-width: 430px) {
  :deep(.el-dialog .el-checkbox__label) {
    font-size: 14px;
    padding-left: 12px;
  }
  .quote {
    top: 66%; /* iPhone 14 Pro Max */
  }
}

@media (max-width: 375px) {
  :deep(.el-dialog .el-checkbox__label) {
    font-size: 12px;
    padding-left: 12px;
  }
  .quote {
    top: 64%; /* iPhone SE */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  :deep(.el-dialog) {
    width: 70%;
  }
} /* QUOTE */
.why-us-grid {
  flex-wrap: wrap;
}

.how-we-work-section .el-step__title {
  min-width: 100px;
  text-align: center;
}
.how-we-work-section .el-step__icon {
  margin: 0 auto;
}
.how-we-work-section .el-step {
  flex: 1;
}

.home-container {
  width: 100%;
}

.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
}
.hero-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: -1;
}

.hero-content {
  max-width: 800px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}
.welcomeTxt {
  margin-top: -14rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (max-width: 768px) {
  .welcomeTxt {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* <-- vertically center inside parent */
    height: 100%; /* full height of hero-content or parent */
    text-align: center;
    margin-top: -10rem; /* remove manual offset */
  }

  .welcomeTxt .p2 {
    font-size: 1.8rem;
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 380px) {
  .welcomeTxt h1 {
    font-size: 1.3rem;
  }
  .welcomeTxt .p2 {
    font-size: 1.5rem;
  }
}

.p1,
.p2 {
  color: bisque;
}
.p1 {
  font-size: 3rem;
}
.p2 {
  font-size: 2rem;
}
.section {
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  color: #303133;
}

.how-we-work-section {
  background-color: #f5f7fa;
}

.cta-section {
  background-color: #545c64;
  color: white;
  text-align: center;
  padding: 60px 20px;
}

.cta-section h2 {
  margin-top: 0;
  color: bisque;
}

.cta-section .el-button {
  background-color: #444a51;
  color: bisque;
  border: none;
  margin-top: 20px;
  justify-content: space-between;
  margin-left: 6rem;
  margin-right: 7rem;
}

@media (max-width: 768px) {
  .hero-section {
    height: 100vh;
  }

  .hero-content h1 {
    font-size: 2.1rem;
  }

  :deep(.how-it-works-steps .el-step__arrow) {
    display: none;
  }
  :deep(.how-it-works-steps) {
    justify-content: flex-start !important;
    padding-left: 0;
    margin-left: -10px;
    margin-right: -8px;
  }
}
@media (max-width: 415px) {
  .hero-content h1 {
    font-size: 1.7rem;
  }
}
:deep(.how-it-works-steps .el-step__title) {
  white-space: nowrap;
  font-size: 14px;
  color: #0e63c1;
}

:deep(.how-it-works-steps .el-step__description) {
  display: block; /* Optional: hide description on small screens */
  font-size: 12px;
  color: #666;
}

:deep(.how-it-works-steps .el-step__icon) {
  margin-right: 2px;
  color: #1e40de;
}

@media (min-width: 768px) {
  :deep(.how-it-works-steps .el-step__description) {
    display: block;
  }
  :deep(.how-it-works-steps .el-step__arrow) {
    margin-left: 8px;
    margin-right: 8px;
  }
}

:deep(.how-it-works-steps .el-step__title) {
  margin: 0 10px;
  font-size: 16px;
  white-space: nowrap;
}
:deep(.how-it-works-steps .el-step__icon) {
  margin-right: -15px;
}

.el-row {
  align-items: flex-start !important;
  flex-wrap: wrap !important;
  justify-content: space-evenly;
}

.logo {
  .hero-logo {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
}
@media (max-width: 768px) {
  .logo {
    max-width: 45vh;
    max-height: 25vh;
    margin-top: -17vh;
  }
}
</style>

<style>
.elfsight-app-9cd0abc5-08e1-4dc1-8ccd-0f60387d7b18 {
  margin-top: 30px;
}
</style>
