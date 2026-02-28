<script setup lang="ts">
import ServicePage from '@/components/ServicePage.vue';
import type { ServicePageData } from '@/types/servicePage';

import ambTeamImg from '@/assets/AMB_Removals_team.jpg';
import packingBoxImg from '@/assets/photos/Packing_box_removals.jpg';
import livingImg from '@/assets/photos/Living_removals.jpg';
import tvImg from '@/assets/photos/TV_pictures_removals.jpg';
import furnitureImg from '@/assets/photos/Furniture_removals.jpg';
import planIcon from '@/assets/svg/plan.svg';
import requestIcon from '@/assets/svg/request.png';
import moveIcon from '@/assets/svg/move.svg';
import moonIcon from '@/assets/svg/moon.svg';
import requestSvg from '@/assets/svg/request.svg';
import keysIcon from '@/assets/svg/keys.svg';
import sheedIcon from '@/assets/svg/sheed.svg';
import recycleIcon from '@/assets/svg/recycle.svg';

const data: ServicePageData = {
  phoneNumber: '0 (116) 456-0653',
  phoneLink: 'tel:01164560653',

  seo: {
    title: 'Professional Packing Services & Fragile Item Moves',
    description: 'Expert packing services across the Midlands. Professional packers for fragile items, pianos, antiques and full home packing. Quality materials, careful handling and full insurance guaranteed.',
    keywords: 'packing services Leicester, fragile item removals, piano movers Leicester, professional packers, AMB Removals, packing materials, fragile item handling, antique movers',
    ogTitle: 'Professional Packing Services & Fragile Item Moves',
    ogDescription: 'Expert packing services across the Midlands. Professional packers for fragile items, pianos, antiques and full home packing. Fully insured.',
    ogUrl: 'https://ambremovals.com/packing-services',
    twitterTitle: 'Professional Packing Services & Fragile Item Moves',
    twitterDescription: 'Expert packing services across the Midlands. Professional packers for fragile items, pianos, antiques and full home packing. Fully insured.',
    canonical: 'https://ambremovals.com/packing-services',
  },

  schema: {
    service: {
      name: 'Packing Services',
      areaServed: ['Leicester', 'Leicestershire', 'Lutterworth', 'Blaby', 'South Leicestershire'],
      description: 'Professional packing services for home and office moves. Specialist handling for fragile items, pianos, antiques and valuables across Leicestershire.',
      serviceType: 'Packing Services',
    },
    faq: [
      { q: 'Do you provide the packing materials?', a: 'Yes \u2014 we supply all packing materials including boxes, bubble wrap, tissue paper, wardrobe cartons and tape. Everything is included in our packing service quote.' },
      { q: 'Can you move a piano or other heavy fragile items?', a: 'Absolutely. We have specialist equipment and trained staff for moving pianos, antiques, artwork and other heavy or delicate items safely.' },
      { q: 'How do you handle fragile items?', a: 'Each fragile item is individually wrapped using bubble wrap, tissue paper and custom padding. We use clearly labelled "fragile" boxes and ensure careful loading to prevent movement during transit.' },
      { q: 'How much does a packing service cost?', a: 'Costs depend on the volume of items and level of service required. We offer free, no-obligation quotes \u2014 contact us with your details for an accurate price.' },
      { q: 'Do I need to pack anything myself?', a: 'Not at all \u2014 we offer a full packing service where our team handles everything. Alternatively, you can choose partial packing if you prefer to pack some items yourself.' },
      { q: 'How long does the packing take?', a: 'A typical 3-bedroom house takes around half a day to pack fully. Larger homes or those with many fragile items may take a full day. We can pack the day before your move or on the same day.' },
    ],
    breadcrumb: { name: 'Packing Services', item: 'https://ambremovals.com/packing-services' },
  },

  hero: {
    h1: 'Professional Packing & Fragile Item Services in Leicestershire',
    subtitle: 'Expert packing, careful handling and specialist fragile item moves across Leicester and South Leicestershire.',
  },

  form: {
    fromLabel: 'Moving From Postcode *',
    toLabel: 'Moving To Postcode *',
    messageLabel: 'Tell us about your packing needs',
    messagePlaceholder: 'Fragile items, pianos, antiques, number of rooms...',
  },

  exceptional: {
    eyebrow: 'Why Choose AMB Removals?',
    title: 'Expert Packing For Every Move',
    lead: 'From full house packing to specialist fragile item handling, our trained packers use quality materials and proven techniques to keep your belongings safe throughout your move.',
    items: [
      { heading: 'Trained Professional Packers', text: 'Our experienced team packs efficiently and carefully, ensuring every item is protected for transit.' },
      { heading: 'Quality Packing Materials', text: 'We use premium boxes, bubble wrap, tissue paper and wardrobe cartons \u2014 all included in our service.' },
      { heading: 'Fragile Item Specialists', text: 'Pianos, antiques, artwork and glassware \u2014 we have the expertise and equipment to move them safely.' },
      { heading: 'Fully Insured & Labelled', text: 'Every box is clearly labelled for organised unpacking, and all items are covered by our insurance.' },
    ],
    grid: {
      darkTile1: 'Quality Packing Materials Included',
      darkTile2: 'Specialist Fragile Item Handling',
      photo1: { src: packingBoxImg, alt: 'Professional packing service' },
      photo2: { src: livingImg, alt: 'Fragile items carefully packed' },
    },
  },

  projects: {
    eyebrow: 'Complete packing solutions for every type of move.',
    title: 'Our Packing Services',
    lead: 'Whether you need us to pack your entire home or just handle the delicate items, we offer flexible packing options tailored to your needs and budget.',
    cards: [
      { image: { src: packingBoxImg, alt: 'Full packing service' }, heading: 'Full Packing Service', text: 'We pack your entire home from top to bottom \u2014 every room, every item. Ideal if you want a completely hands-off moving experience.' },
      { image: { src: livingImg, alt: 'Partial packing service' }, heading: 'Partial Packing', text: 'Pack what you can and leave the rest to us. We handle the tricky items like kitchenware, glassware and electronics while you take care of the easy stuff.' },
      { image: { src: tvImg, alt: 'Fragile items and piano moving' }, heading: 'Fragile Items & Piano Moving', text: 'Specialist handling for pianos, antiques, artwork, mirrors and other delicate or heavy items. Custom wrapping and secure transport guaranteed.' },
      { image: { src: furnitureImg, alt: 'Packing materials supply' }, heading: 'Packing Materials Supply', text: 'Need boxes and supplies for self-packing? We deliver quality packing materials including boxes, bubble wrap, tape and wardrobe cartons direct to your door.' },
    ],
  },

  steps: {
    eyebrow: 'A simple, stress-free process from enquiry to packing day.',
    title: 'How Our Packing Service Works',
    lead: 'We make the packing process easy and efficient, so you can focus on the exciting parts of your move while we handle the hard work.',
    cards: [
      { icon: { src: planIcon, alt: 'Plan icon' }, heading: '1. Request Your Free Quote', text: "Tell us about your packing needs \u2014 we'll provide a clear, accurate price with no hidden extras." },
      { icon: { src: requestIcon, alt: 'Request icon' }, heading: '2. We Assess Your Needs', text: 'We discuss your requirements, identify fragile or specialist items, and plan the packing around your schedule.' },
      { icon: { src: moveIcon, alt: 'Move icon' }, heading: '3. Packing Day', text: 'Our team arrives with all materials, packs everything safely and labels each box for easy unpacking at your new home.' },
    ],
  },

  guarantees: {
    eyebrow: 'Your belongings packed with care and total peace of mind.',
    title: 'Our Packing Guarantees',
    lead: "We're committed to protecting your belongings with professional packing techniques, quality materials and full insurance cover \u2014 giving you complete confidence in every box we pack.",
    image: { src: ambTeamImg, alt: 'AMB Removals packing team' },
    items: [
      'Premium packing materials included',
      'Careful handling of fragile and valuable items',
      'Full insurance coverage on all packed items',
      'Clear labelling system for organised unpacking',
      'Specialist equipment for pianos and antiques',
      'Transparent pricing with no hidden charges',
    ],
  },

  faq: {
    eyebrow: 'Common questions about our packing and fragile item services',
    title: 'Frequently Asked Questions',
    lead: "We've answered the most common questions about our packing services to help you understand what's included and how we can help make your move easier.",
    cards: [
      { icon: { src: moveIcon, alt: 'Box icon' }, heading: 'Do you provide the packing materials?', text: 'Yes \u2014 we supply all packing materials including boxes, bubble wrap, tissue paper, wardrobe cartons and tape. Everything is included in our packing service quote.' },
      { icon: { src: keysIcon, alt: 'Keys icon' }, heading: 'Can you move a piano or other heavy fragile items?', text: 'Absolutely. We have specialist equipment and trained staff for moving pianos, antiques, artwork and other heavy or delicate items safely.' },
      { icon: { src: sheedIcon, alt: 'Shield icon' }, heading: 'How do you handle fragile items?', text: 'Each fragile item is individually wrapped using bubble wrap, tissue paper and custom padding. We use clearly labelled "fragile" boxes and ensure careful loading.' },
      { icon: { src: requestSvg, alt: 'Calendar icon' }, heading: 'How much does a packing service cost?', text: 'Costs depend on the volume of items and level of service required. We offer free, no-obligation quotes \u2014 contact us with your details for an accurate price.' },
      { icon: { src: recycleIcon, alt: 'Recycle icon' }, heading: 'Do I need to pack anything myself?', text: 'Not at all \u2014 we offer a full packing service where our team handles everything. Alternatively, choose partial packing if you prefer to pack some items yourself.' },
      { icon: { src: moonIcon, alt: 'Clock icon' }, heading: 'How long does the packing take?', text: 'A typical 3-bedroom house takes around half a day to pack fully. Larger homes or those with many fragile items may take a full day. We can pack the day before or on moving day.' },
    ],
  },

  finalCta: {
    heading: 'Ready To Get Your Packing Sorted?',
    text: 'Get a free, no-obligation quote today and let AMB Removals handle your packing professionally and carefully.',
  },
};
</script>

<template>
  <ServicePage :data="data" />
</template>
