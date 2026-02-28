<script setup lang="ts">
import ServicePage from '@/components/ServicePage.vue';
import type { ServicePageData } from '@/types/servicePage';

import ambVanImg from '@/assets/photos/AMB_Removals_Van.jpg';
import flatImg from '@/assets/photos/Flat_removals.jpg';
import furnitureImg from '@/assets/photos/Furniture_removals.jpg';
import livingImg from '@/assets/photos/Living_removals.jpg';
import tvImg from '@/assets/photos/TV_pictures_removals.jpg';
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
    title: 'Man with a Van | Affordable Moves Across the Midlands',
    description: 'Affordable man with a van service across Leicester, Nottingham, Derby, Coventry and the Midlands. Perfect for single items, student moves, small flats and marketplace collections. Fully insured.',
    keywords: 'man with van Leicester, cheap removals Leicester, single item delivery, student moves Leicester, AMB Removals, small moves, van hire with driver',
    ogTitle: 'Man with a Van | Affordable Moves Across the Midlands',
    ogDescription: 'Affordable man with a van across the Midlands. Perfect for single items, student moves, small flats and marketplace collections. Fully insured.',
    ogUrl: 'https://ambremovals.com/man-with-van',
    twitterTitle: 'Man with a Van | Affordable Moves Across the Midlands',
    twitterDescription: 'Affordable man with a van across the Midlands. Perfect for single items, student moves, small flats and marketplace collections. Fully insured.',
    canonical: 'https://ambremovals.com/man-with-van',
  },

  schema: {
    service: {
      name: 'Man with a Van',
      areaServed: ['Leicester', 'Leicestershire', 'Loughborough', 'Hinckley', 'East Midlands'],
      description: 'Affordable man with a van service in Leicester and surrounding areas. Ideal for single items, student moves, small flat relocations and marketplace collections.',
      serviceType: 'Man with a Van',
    },
    faq: [
      { q: 'How much does a man with a van cost?', a: "Prices depend on distance and volume. Our man with a van service starts from competitive hourly rates. Contact us for a free, no-obligation quote tailored to your specific needs." },
      { q: 'Can you do same-day collections?', a: "Yes \u2014 subject to availability, we can often arrange same-day or next-day collection and delivery. Give us a call and we'll do our best to fit you in." },
      { q: 'What fits in the van?', a: "Our vans can accommodate a wide range of items \u2014 from single pieces of furniture to the contents of a 1-2 bedroom flat. Let us know what you need moved and we'll advise on the best option." },
      { q: 'Do you help with loading and unloading?', a: "Absolutely. Our service includes full loading and unloading assistance. We handle your items with care so you don't have to lift a finger." },
      { q: 'How far do you travel?', a: 'We cover Leicester, Leicestershire and the wider East Midlands as standard. We also handle longer-distance jobs across the UK \u2014 just ask for a quote.' },
      { q: 'Can I ride along in the van?', a: "Yes \u2014 you're welcome to travel in the van with us to your destination. Just let us know when booking so we can make arrangements." },
    ],
    breadcrumb: { name: 'Man with a Van', item: 'https://ambremovals.com/man-with-van' },
  },

  hero: {
    h1: 'Affordable Man with a Van in Leicester & Surrounding Areas',
    subtitle: 'Flexible, reliable and fully insured small moves and deliveries across Leicester and the East Midlands.',
  },

  form: {
    fromLabel: 'Collection Postcode *',
    toLabel: 'Delivery Postcode *',
    messageLabel: 'Tell us what you need moved',
    messagePlaceholder: 'Items, number of rooms, access details...',
  },

  exceptional: {
    eyebrow: 'Why Choose AMB Removals?',
    title: 'Flexible Man With A Van Service',
    lead: 'Whether you need a single item collected or a small flat moved, our man with a van service offers an affordable, flexible solution with the same professional care as our full removal service.',
    items: [
      { heading: 'Affordable & Transparent Pricing', text: 'Competitive rates with no hidden fees \u2014 just honest, upfront pricing for every job.' },
      { heading: 'Flexible & Available at Short Notice', text: 'Same-day and next-day bookings often available. We work around your schedule.' },
      { heading: 'Single Items to Full Loads', text: 'From one sofa to the contents of a small flat \u2014 no job is too big or too small.' },
      { heading: 'Fully Insured & Professional', text: 'Your items are handled safely and covered by our full insurance, just like our larger moves.' },
    ],
    grid: {
      darkTile1: 'Affordable Rates, No Hidden Fees',
      darkTile2: 'Same-Day Service Available',
      photo1: { src: ambVanImg, alt: 'AMB Removals man with a van' },
      photo2: { src: flatImg, alt: 'Small flat move' },
    },
  },

  projects: {
    eyebrow: 'The right solution for smaller, flexible moves.',
    title: 'Our Man With A Van Services',
    lead: 'From single item pickups to full small flat moves, our man with a van service gives you the flexibility and affordability you need without compromising on quality.',
    cards: [
      { image: { src: furnitureImg, alt: 'Single item delivery' }, heading: 'Single Item Delivery', text: "Need one item moved? Whether it's a sofa, washing machine or wardrobe, we collect and deliver single items quickly and affordably." },
      { image: { src: flatImg, alt: 'Student moves' }, heading: 'Student Moves', text: 'Moving in or out of student accommodation? We offer budget-friendly moves for students across Leicester, Loughborough and the East Midlands.' },
      { image: { src: livingImg, alt: 'Small flat moves' }, heading: 'Small Flat Moves', text: 'Relocating from a studio or one-bed flat? Our man with a van is the ideal solution \u2014 efficient, affordable and hassle-free.' },
      { image: { src: tvImg, alt: 'eBay and marketplace collections' }, heading: 'eBay & Marketplace Collections', text: "Bought something online that won't fit in your car? We collect and deliver items from eBay, Facebook Marketplace and Gumtree sellers." },
    ],
  },

  steps: {
    eyebrow: 'Quick, easy and hassle-free from start to finish.',
    title: 'How Our Man With A Van Works',
    lead: 'Booking our man with a van is simple. Tell us what you need, we confirm availability, and we get it done \u2014 often on the same day.',
    cards: [
      { icon: { src: planIcon, alt: 'Plan icon' }, heading: '1. Request Your Free Quote', text: "Tell us what needs moving, where from and where to \u2014 we'll give you a clear, honest price." },
      { icon: { src: requestIcon, alt: 'Request icon' }, heading: '2. We Confirm Availability', text: 'We check our schedule and confirm your slot \u2014 often same-day or next-day for local jobs.' },
      { icon: { src: moveIcon, alt: 'Move icon' }, heading: '3. Collection & Delivery', text: 'We arrive on time, load carefully, and deliver your items safely to their destination.' },
    ],
  },

  guarantees: {
    eyebrow: 'Small moves handled with the same care as our full removals.',
    title: 'Our Service Guarantees',
    lead: "Just because it's a smaller job doesn't mean it gets less attention. Every man with a van booking comes with the same professionalism, insurance cover and reliability you'd expect from a full removal service.",
    image: { src: ambVanImg, alt: 'AMB Removals van' },
    items: [
      'Fully insured for your peace of mind',
      'On-time arrival and reliable service',
      'Careful handling of all items',
      'Transparent pricing with no surprises',
      'Loading and unloading included',
      'Flexible scheduling including same-day',
    ],
  },

  faq: {
    eyebrow: 'Common questions about our man with a van service',
    title: 'Frequently Asked Questions',
    lead: "We've answered the most common questions about our man with a van service to help you understand how it works and whether it's right for your move.",
    cards: [
      { icon: { src: requestSvg, alt: 'Price icon' }, heading: 'How much does a man with a van cost?', text: 'Prices depend on distance and volume. Our service starts from competitive hourly rates. Contact us for a free, no-obligation quote tailored to your needs.' },
      { icon: { src: moonIcon, alt: 'Clock icon' }, heading: 'Can you do same-day collections?', text: "Yes \u2014 subject to availability, we can often arrange same-day or next-day collection and delivery. Give us a call and we'll do our best to fit you in." },
      { icon: { src: moveIcon, alt: 'Van icon' }, heading: 'What fits in the van?', text: "Our vans can accommodate a wide range of items \u2014 from single furniture pieces to the contents of a 1-2 bedroom flat. Let us know what you need moved and we'll advise." },
      { icon: { src: keysIcon, alt: 'Help icon' }, heading: 'Do you help with loading and unloading?', text: "Absolutely. Our service includes full loading and unloading assistance. We handle your items with care so you don't have to lift a finger." },
      { icon: { src: sheedIcon, alt: 'Map icon' }, heading: 'How far do you travel?', text: 'We cover Leicester, Leicestershire and the wider East Midlands as standard. We also handle longer-distance jobs across the UK \u2014 just ask for a quote.' },
      { icon: { src: recycleIcon, alt: 'Passenger icon' }, heading: 'Can I ride along in the van?', text: "Yes \u2014 you're welcome to travel in the van with us to your destination. Just let us know when booking so we can make arrangements." },
    ],
  },

  finalCta: {
    heading: 'Need A Man With A Van?',
    text: 'Get a free, no-obligation quote today. Affordable, flexible and fully insured small moves across Leicester and beyond.',
  },
};
</script>

<template>
  <ServicePage :data="data" />
</template>
