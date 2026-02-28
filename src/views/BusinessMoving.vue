<script setup lang="ts">
import ServicePage from '@/components/ServicePage.vue';
import type { ServicePageData } from '@/types/servicePage';

import ambTeamImg from '@/assets/AMB_Removals_team.jpg';
import ambVanImg from '@/assets/photos/AMB_Removals_Van.jpg';
import packingBoxImg from '@/assets/photos/Packing_box_removals.jpg';
import furnitureImg from '@/assets/photos/Furniture_removals.jpg';
import livingImg from '@/assets/photos/Living_removals.jpg';
import planIcon from '@/assets/svg/plan.svg';
import requestIcon from '@/assets/svg/request.png';
import moveIcon from '@/assets/svg/move.svg';
import moonIcon from '@/assets/svg/moon.svg';
import requestSvg from '@/assets/svg/request.svg';
import keysIcon from '@/assets/svg/keys.svg';
import computerIcon from '@/assets/svg/computer.svg';
import buildingIcon from '@/assets/svg/building.svg';

const data: ServicePageData = {
  phoneNumber: '0 (116) 456-0653',
  phoneLink: 'tel:01164560653',

  seo: {
    title: 'Professional Business & Commercial Removals in South Leicestershire',
    description: 'Expert office and commercial relocations across Leicester, Nottingham, Derby, Coventry and the wider Midlands. Fully insured, minimal downtime and transparent pricing guaranteed.',
    keywords: 'office removals Leicester, commercial removals South Leicestershire, business relocation, Lutterworth office movers, AMB Removals, IT equipment moving',
    ogTitle: 'Professional Business & Commercial Removals | AMB Removals',
    ogDescription: 'Expert office and commercial relocations across Lutterworth, Leicester and South Leicestershire. Fully insured, minimal downtime, transparent pricing.',
    ogUrl: 'https://ambremovals.com/business-moving',
    twitterTitle: 'Professional Business & Commercial Removals | AMB Removals',
    twitterDescription: 'Expert office and commercial relocations across South Leicestershire. Fully insured, minimal downtime.',
    canonical: 'https://ambremovals.com/business-moving',
  },

  schema: {
    service: {
      name: 'Business & Commercial Removals',
      areaServed: ['Lutterworth', 'Leicester', 'Blaby', 'South Leicestershire', 'East Midlands'],
      description: 'Expert office and commercial relocations. Furniture dismantling, IT equipment handling, out-of-hours moves, and full insurance included.',
      serviceType: 'Commercial Moving',
    },
    faq: [
      { q: 'Can you move our office outside business hours?', a: "Yes - we offer evening and weekend moves to help minimise disruption to your team's working day." },
      { q: 'Do you provide packing materials for commercial moves?', a: 'Yes - we supply strong crates, protective wraps and specialist packing materials for office and commercial equipment.' },
      { q: 'How much notice do you need for an office move?', a: 'Earlier bookings are ideal, but we often accommodate short-notice moves for local businesses across South Leicestershire.' },
      { q: 'Can you dismantle and rebuild office furniture?', a: 'Yes - we regularly dismantle desks, shelves and workstations, and reassemble them at your new location.' },
      { q: 'Can you handle IT equipment safely?', a: 'Absolutely. We carefully pack and protect computers, monitors and sensitive equipment to ensure everything arrives safely and ready to use.' },
      { q: 'Can you relocate equipment from multiple locations?', a: 'Yes - we can collect items from multiple business sites or storage units and deliver everything to your new address.' },
    ],
    breadcrumb: { name: 'Business Moving', item: 'https://ambremovals.com/business-moving' },
  },

  hero: {
    h1: 'Exceptional Service for Every Business Move',
    subtitle: 'Local, reliable and fully insured office and commercial relocations across Lutterworth, Leicester and South Leicestershire.',
  },

  form: {
    fromLabel: 'Moving From Postcode *',
    toLabel: 'Moving To Postcode *',
    messageLabel: 'Tell us about your move',
    messagePlaceholder: 'Rooms, packing help, special items...',
  },

  exceptional: {
    eyebrow: 'Why Choose AMB Removals for Commercial Moves?',
    title: 'Exceptional Service For Every Business Move',
    lead: 'Choosing the right team for your office move is crucial. AMB Removals delivers an organised, efficient and disruption-free commercial relocation service for businesses across South Leicestershire.',
    items: [
      { heading: 'Experienced commercial movers', text: 'We regularly relocate offices, small businesses and commercial spaces across Lutterworth, Blaby and Leicester.' },
      { heading: 'Fully Insured & Professional', text: 'Your equipment, furniture and documents are handled safely by trained, reliable movers.' },
      { heading: 'Minimal Downtime', text: 'We plan your move around your business hours to keep your operations running smoothly.' },
      { heading: 'Transparent, Honest Pricing', text: 'Clear quotes with no hidden extras - giving you full visibility over costs before the move begins.' },
    ],
    grid: {
      darkTile1: 'Quality Packing Materials Used',
      darkTile2: 'Highly Skilled Moving Team',
      photo1: { src: ambTeamImg, alt: 'AMB team walking' },
      photo2: { src: ambVanImg, alt: 'AMB removals van' },
    },
  },

  projects: {
    eyebrow: 'Everything your business needs for a smooth, disruption-free relocation.',
    title: 'Our Removal Services',
    lead: 'We handle every stage of your office move with care, precision and clear communication - ensuring your team stays productive throughout the process.',
    cards: [
      { image: { src: ambVanImg, alt: 'Office relocation' }, heading: 'Office & Workspace Relocations', text: 'From small offices to larger commercial spaces across Leicester and South Leicestershire, we manage relocations of every size.' },
      { image: { src: packingBoxImg, alt: 'Packing and IT protection' }, heading: 'Packing & IT Equipment Protection', text: 'We pack monitors, computers and sensitive equipment using protective materials and organised labelling so everything arrives safely.' },
      { image: { src: furnitureImg, alt: 'Furniture handling' }, heading: 'Furniture Dismantling & Reassembly', text: 'Desks, workstations and meeting tables dismantled, transported and reassembled properly in your new space.' },
      { image: { src: livingImg, alt: 'Out of hours moves' }, heading: 'Out-of-Hours & Weekend Moves', text: 'Ideal for avoiding downtime\u2014plan evening or weekend moves so your team keeps running smoothly.' },
    ],
  },

  steps: {
    eyebrow: 'A structured, efficient process from start to finish.',
    title: 'How Our Commercial Moves Work',
    lead: 'We keep your business relocation running smoothly with clear planning, reliable communication and a professional team supporting you at every stage.',
    cards: [
      { icon: { src: planIcon, alt: 'Plan icon' }, heading: '1. Request Your Free Quote!', text: "Share your move details and business requirements \u2014 we'll provide a clear, accurate price." },
      { icon: { src: requestIcon, alt: 'Request icon' }, heading: '2. We Plan Your Move', text: 'We build a schedule around your operating hours, ensuring minimal disruption to your workflow.' },
      { icon: { src: moveIcon, alt: 'Move icon' }, heading: '3. Move In Day!', text: 'Our team arrives on time, handles everything safely and gets your new workspace set up quickly and correctly.' },
    ],
  },

  guarantees: {
    eyebrow: 'Your office move handled with efficiency and total peace of mind.',
    title: 'Our Business Removal Guarantees',
    lead: "We're committed to delivering a smooth, reliable experience for every business we support - ensuring your relocation is organised, secure and stress-free from start to finish.",
    image: { src: ambTeamImg, alt: 'AMB Removals team' },
    items: [
      'Trained commercial moving teams',
      'Full insurance and professional handling',
      'Minimal downtime and disruption',
      'Clear communication throughout',
      'Fair, transparent pricing',
      'A secure, stress-free business relocation',
    ],
  },

  faq: {
    eyebrow: 'Common questions from businesses planning a commercial move',
    title: 'Frequently Asked Questions',
    lead: "We've gathered the most frequent queries from companies across South Leicestershire to help you understand how we work and what to expect.",
    cards: [
      { icon: { src: moonIcon, alt: 'Moon icon' }, heading: 'Can you move our office outside business hours?', text: "Yes - we offer evening and weekend moves to help minimise disruption to your team's working day." },
      { icon: { src: moveIcon, alt: 'Box icon' }, heading: 'Do you provide packing materials for commercial moves?', text: 'Yes - we supply strong crates, protective wraps and specialist packing materials for office and commercial equipment.' },
      { icon: { src: requestSvg, alt: 'Calendar icon' }, heading: 'How much notice do you need for an office move?', text: 'Earlier bookings are ideal, but we often accommodate short-notice moves for local businesses across South Leicestershire.' },
      { icon: { src: keysIcon, alt: 'Keys icon' }, heading: 'Can you dismantle and rebuild office furniture?', text: 'Yes - we regularly dismantle desks, shelves and workstations, and reassemble them at your new location.' },
      { icon: { src: computerIcon, alt: 'Computer icon' }, heading: 'Can you handle IT equipment safely?', text: 'Absolutely. We carefully pack and protect computers, monitors and sensitive equipment to ensure everything arrives safely and ready to use.' },
      { icon: { src: buildingIcon, alt: 'Building icon' }, heading: 'Can you relocate equipment from multiple locations?', text: 'Yes - we can collect items from multiple business sites or storage units and deliver everything to your new address.' },
    ],
  },

  finalCta: {
    heading: 'Ready To Make Your Move?',
    text: 'Get a free, no-obligation quote today and let AMB Removals handle your commercial relocation smoothly and professionally.',
  },
};
</script>

<template>
  <ServicePage :data="data" />
</template>
