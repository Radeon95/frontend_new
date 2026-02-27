<script setup lang="ts">
import stickyButtons from '../components/stickyButtons.vue';
import QuoteForm from '../components/QuoteForm.vue';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Request a Quote',
  meta: [
    {
      name: 'description',
      content:
        'Get your personalized moving quote from AMB Removals. Trusted UK-based company offering local and nationwide removals. Powered by ambremovals team.',
    },
    {
      name: 'keywords',
      content:
        'AMB Removals, ambremovals, removal quote, moving company UK, house removals, man with a van, packing services',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Request a Quote | AMB Removals' },
    {
      property: 'og:description',
      content:
        'Request your moving quote from ambremovals – trusted experts in local and nationwide removals across the UK.',
    },
    { property: 'og:url', content: 'https://ambremovals.com/quote' },
    { property: 'og:type', content: 'website' },
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
      content: 'Request a Quote | AMB Removals',
    },
    {
      name: 'twitter:description',
      content:
        'Request your moving quote from ambremovals – trusted experts in local and nationwide removals across the UK.',
    },
    {
      name: 'twitter:image',
      content: 'https://ambremovals.com/AMB_Removals.jpg',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://ambremovals.com/quote' }],
});
</script>

<template>
  <div class="introImage">
    <stickyButtons />
    <h2>About Your Move...</h2>
  </div>
  <QuoteForm />
</template>

<style scoped>
.introImage {
  background-image: url('../assets/Removals_quotation.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
}
.introImage h2 {
  font-size: 2.5rem;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 8px;
}
@media (max-width: 768px) {
  .introImage {
    height: 45vh;
    padding: 1rem;
    margin-top: 8rem;
  }

  .introImage h2 {
    font-size: 1.5rem;
    padding: 0.5rem;
  }
}

@media (min-width: 768px) and (max-width: 1025px) {
  .introImage {
    height: 55vh;
    padding: 1.5rem;
  }

  .introImage h2 {
    font-size: 2rem;
    padding: 0.5rem 1rem;
  }
}
</style>
