<script setup lang="ts">
import { computed } from 'vue';
import { useHead } from '@vueuse/head';
import stickyButtons from '@/components/stickyButtons.vue';
import { useSidebarForm } from '@/composables/useSidebarForm';

import ambTeamImg from '@/assets/AMB_Removals_team.jpg';
import ambVanImg from '@/assets/photos/AMB_Removals_Van.jpg';
import packingBoxImg from '@/assets/photos/Packing_box_removals.jpg';
import furnitureImg from '@/assets/photos/Furniture_removals.jpg';
import livingImg from '@/assets/photos/Living_removals.jpg';
import planIcon from '@/assets/svg/plan.svg';
import requestIcon from '@/assets/svg/request.png';
import moveIcon from '@/assets/svg/move.svg';

const props = defineProps<{ city: string }>();

const { sidebarFormRef, sidebarForm, sidebarRules, submitSidebarForm, scrollToForm } =
  useSidebarForm();

const phoneNumber = '0 (116) 456-0653';
const phoneLink = 'tel:01164560653';

interface LocationData {
  name: string;
  slug: string;
  distance: string;
  description: string;
  areaServed: string[];
  nearby: string[];
  content: {
    heroTitle: string;
    heroSubtitle: string;
    introTitle: string;
    introText: string;
    servicesIntro: string;
    whyTitle: string;
    whyItems: Array<{ heading: string; text: string }>;
    ctaText: string;
  };
}

const locations: Record<string, LocationData> = {
  leicester: {
    name: 'Leicester',
    slug: 'removals-leicester',
    distance: '8 miles from our base in Blaby',
    description: 'Professional house removals, office moves and man with a van services in Leicester. Fully insured, affordable and reliable. AMB Removals covers all Leicester postcodes.',
    areaServed: ['Leicester', 'Oadby', 'Wigston', 'Braunstone', 'Beaumont Leys', 'Evington'],
    nearby: ['Oadby', 'Wigston', 'Braunstone', 'Glenfield', 'Thurmaston'],
    content: {
      heroTitle: 'Professional Removals in Leicester',
      heroSubtitle: 'Trusted, fully insured moving services covering all Leicester postcodes. House removals, office moves and man with a van.',
      introTitle: 'Your Local Leicester Removal Company',
      introText: 'AMB Removals is proud to serve Leicester and the surrounding areas with professional, affordable moving services. Based just 8 miles away in Blaby, we offer fast response times and local knowledge that larger companies simply cannot match. Whether you are moving within Leicester or relocating to or from the city, our experienced team handles every move with care and efficiency.',
      servicesIntro: 'We offer a full range of removal services across Leicester, tailored to your specific needs and budget.',
      whyTitle: 'Why Leicester Residents Choose AMB Removals',
      whyItems: [
        { heading: 'Local Knowledge', text: 'We know Leicester inside out — parking restrictions, narrow streets, busy times. We plan every move to avoid delays.' },
        { heading: 'Fast Response', text: 'Based just minutes from Leicester city centre, we can often offer same-day or next-day availability.' },
        { heading: 'All Leicester Postcodes', text: 'From LE1 to LE19, we cover every postcode in Leicester and Leicestershire.' },
        { heading: 'Fully Insured', text: 'Every move is fully insured for your complete peace of mind. Your belongings are protected from start to finish.' },
      ],
      ctaText: 'Get a free, no-obligation quote for your Leicester move today.',
    },
  },
  nottingham: {
    name: 'Nottingham',
    slug: 'removals-nottingham',
    distance: '30 miles from our base',
    description: 'Reliable house removals and office relocation services in Nottingham. AMB Removals offers fully insured, professional moves from Leicestershire to Nottingham and surrounding areas.',
    areaServed: ['Nottingham', 'West Bridgford', 'Beeston', 'Arnold', 'Carlton', 'Long Eaton'],
    nearby: ['West Bridgford', 'Beeston', 'Arnold', 'Carlton', 'Long Eaton'],
    content: {
      heroTitle: 'Reliable Removals in Nottingham',
      heroSubtitle: 'Fully insured house removals, office moves and man with a van across Nottingham and the East Midlands.',
      introTitle: 'AMB Removals — Serving Nottingham',
      introText: 'AMB Removals provides professional moving services across Nottingham and Nottinghamshire. Whether you are moving house in West Bridgford, relocating an office in the city centre, or need a man with a van for a small delivery, we deliver the same reliable, insured service that has earned us excellent reviews across the Midlands.',
      servicesIntro: 'Our full range of removal services is available across all Nottingham postcodes.',
      whyTitle: 'Why Nottingham Customers Trust AMB Removals',
      whyItems: [
        { heading: 'East Midlands Coverage', text: 'We serve the entire East Midlands corridor from Leicester to Nottingham and beyond.' },
        { heading: 'Competitive Pricing', text: 'Transparent quotes with no hidden fees. We offer excellent value for Nottingham moves.' },
        { heading: 'Experienced Team', text: 'Our movers regularly handle Nottingham moves and know the area well.' },
        { heading: 'Fully Insured', text: 'Comprehensive insurance cover on every move, giving you total peace of mind.' },
      ],
      ctaText: 'Get a free quote for your Nottingham removal today.',
    },
  },
  derby: {
    name: 'Derby',
    slug: 'removals-derby',
    distance: '30 miles from our base',
    description: 'Affordable house removals and office moves in Derby. AMB Removals delivers fully insured, professional relocation services across Derby and Derbyshire.',
    areaServed: ['Derby', 'Allestree', 'Chellaston', 'Mickleover', 'Spondon', 'Littleover'],
    nearby: ['Allestree', 'Chellaston', 'Mickleover', 'Spondon', 'Littleover'],
    content: {
      heroTitle: 'Affordable Removals in Derby',
      heroSubtitle: 'Professional house removals, office relocations and man with a van services across Derby and Derbyshire.',
      introTitle: 'AMB Removals — Your Derby Moving Partner',
      introText: 'AMB Removals offers reliable, fully insured removal services across Derby and the wider Derbyshire area. From family home moves to commercial relocations, we bring the same professional approach to every job. Our team regularly works in Derby and understands the local area, ensuring efficient and stress-free moves.',
      servicesIntro: 'We provide comprehensive moving solutions for homes and businesses across Derby.',
      whyTitle: 'Why Derby Residents Choose AMB Removals',
      whyItems: [
        { heading: 'Regular Derby Service', text: 'We frequently work in Derby and know the area, traffic patterns and access challenges.' },
        { heading: 'Affordable Rates', text: 'Competitive pricing for Derby moves with clear, upfront quotes and no hidden costs.' },
        { heading: 'Flexible Scheduling', text: 'Evening and weekend moves available to suit your schedule.' },
        { heading: 'Fully Insured', text: 'All Derby moves are fully insured, protecting your belongings throughout the journey.' },
      ],
      ctaText: 'Request a free removal quote for your Derby move.',
    },
  },
  coventry: {
    name: 'Coventry',
    slug: 'removals-coventry',
    distance: '25 miles from our base',
    description: 'Professional removals in Coventry. AMB Removals offers insured house moves, office relocations and packing services across Coventry and Warwickshire.',
    areaServed: ['Coventry', 'Kenilworth', 'Bedworth', 'Nuneaton', 'Warwick', 'Leamington Spa'],
    nearby: ['Kenilworth', 'Bedworth', 'Nuneaton', 'Warwick', 'Leamington Spa'],
    content: {
      heroTitle: 'Professional Removals in Coventry',
      heroSubtitle: 'Trusted house removals, office moves and packing services across Coventry and Warwickshire. Fully insured and affordable.',
      introTitle: 'AMB Removals — Coventry Moving Services',
      introText: 'AMB Removals provides dependable removal services for homes and businesses across Coventry and the surrounding Warwickshire area. Whether you are moving locally within Coventry or relocating to the area from elsewhere, our professional team ensures a smooth, stress-free experience from start to finish.',
      servicesIntro: 'From house moves to commercial relocations, we offer tailored services across Coventry.',
      whyTitle: 'Why Coventry Customers Choose AMB Removals',
      whyItems: [
        { heading: 'Warwickshire & Midlands Coverage', text: 'Comprehensive service across Coventry, Warwickshire and the wider West Midlands.' },
        { heading: 'Professional Packing', text: 'Full and partial packing services available with quality materials included.' },
        { heading: 'On-Time, Every Time', text: 'We pride ourselves on punctuality and reliability for every Coventry move.' },
        { heading: 'Fully Insured', text: 'Complete insurance cover on all moves for your total peace of mind.' },
      ],
      ctaText: 'Get your free Coventry removal quote today.',
    },
  },
  northampton: {
    name: 'Northampton',
    slug: 'removals-northampton',
    distance: '35 miles from our base',
    description: 'Reliable removal services in Northampton. AMB Removals offers fully insured house moves, office relocations and man with a van across Northampton and Northamptonshire.',
    areaServed: ['Northampton', 'Kettering', 'Wellingborough', 'Corby', 'Daventry', 'Towcester'],
    nearby: ['Kettering', 'Wellingborough', 'Corby', 'Daventry', 'Towcester'],
    content: {
      heroTitle: 'Reliable Removals in Northampton',
      heroSubtitle: 'Fully insured house removals, office moves and man with a van services in Northampton and across Northamptonshire.',
      introTitle: 'AMB Removals — Northampton Moving Services',
      introText: 'AMB Removals extends its professional moving services to Northampton and the wider Northamptonshire area. With excellent access via the M1 and A14 corridors, we offer efficient and reliable removals for homes and businesses across the region. Our trained team brings the same high standard of care to every Northampton move.',
      servicesIntro: 'We offer complete removal solutions across Northampton and surrounding areas.',
      whyTitle: 'Why Northampton Residents Trust AMB Removals',
      whyItems: [
        { heading: 'Easy M1 Access', text: 'Quick, efficient routes between Leicester and Northampton mean competitive pricing and fast service.' },
        { heading: 'Full Service Offering', text: 'House moves, office relocations, packing and man with a van — all available in Northampton.' },
        { heading: 'Transparent Pricing', text: 'Clear, honest quotes with no surprises. Know exactly what you are paying before the move.' },
        { heading: 'Fully Insured', text: 'Every Northampton move is covered by our comprehensive insurance policy.' },
      ],
      ctaText: 'Request a free removal quote for your Northampton move.',
    },
  },
  loughborough: {
    name: 'Loughborough',
    slug: 'removals-loughborough',
    distance: '15 miles from our base',
    description: 'Affordable removals in Loughborough. AMB Removals offers house moves, student removals, office relocations and man with a van across Loughborough and North Leicestershire.',
    areaServed: ['Loughborough', 'Shepshed', 'Quorn', 'Mountsorrel', 'Sileby', 'Barrow upon Soar'],
    nearby: ['Shepshed', 'Quorn', 'Mountsorrel', 'Sileby', 'Barrow upon Soar'],
    content: {
      heroTitle: 'Affordable Removals in Loughborough',
      heroSubtitle: 'Professional house removals, student moves and man with a van services in Loughborough and North Leicestershire.',
      introTitle: 'AMB Removals — Loughborough Moving Specialists',
      introText: 'AMB Removals is a trusted name for removals in Loughborough and the surrounding North Leicestershire area. As a university town, Loughborough has specific moving needs — from student relocations to family home moves and commercial premises. Our team handles them all with professionalism and care.',
      servicesIntro: 'Our services in Loughborough cover everything from student moves to full house removals.',
      whyTitle: 'Why Loughborough Chooses AMB Removals',
      whyItems: [
        { heading: 'Student Move Specialists', text: 'Affordable, flexible moves for Loughborough University students. Moving in, out or between houses.' },
        { heading: 'Close Proximity', text: 'Just 15 miles from our base, meaning fast response times and competitive rates for Loughborough.' },
        { heading: 'Local Area Knowledge', text: 'We know Loughborough well and plan every move for efficiency.' },
        { heading: 'Fully Insured', text: 'All Loughborough moves come with full insurance protection.' },
      ],
      ctaText: 'Get your free Loughborough removal quote today.',
    },
  },
  'market-harborough': {
    name: 'Market Harborough',
    slug: 'removals-market-harborough',
    distance: '15 miles from our base',
    description: 'Professional removal services in Market Harborough. AMB Removals offers insured house removals, office moves and packing services across Market Harborough and South East Leicestershire.',
    areaServed: ['Market Harborough', 'Great Bowden', 'Kibworth', 'Fleckney', 'Billesdon'],
    nearby: ['Great Bowden', 'Kibworth', 'Fleckney', 'Billesdon', 'Husbands Bosworth'],
    content: {
      heroTitle: 'Professional Removals in Market Harborough',
      heroSubtitle: 'Trusted house removals, office relocations and packing services in Market Harborough and South East Leicestershire.',
      introTitle: 'AMB Removals — Market Harborough Moving Services',
      introText: 'AMB Removals provides reliable, professional moving services to Market Harborough and the beautiful South East Leicestershire countryside. Whether you are moving within the town, relocating from a nearby village, or moving to Market Harborough from further afield, our experienced team ensures a smooth, efficient and stress-free experience.',
      servicesIntro: 'We offer comprehensive removal solutions across Market Harborough and the surrounding villages.',
      whyTitle: 'Why Market Harborough Trusts AMB Removals',
      whyItems: [
        { heading: 'Rural & Town Moves', text: 'Experience with both town centre and rural property moves across South East Leicestershire.' },
        { heading: 'Careful Handling', text: 'Period properties and narrow lanes are no problem for our experienced team.' },
        { heading: 'Competitive Local Rates', text: 'Affordable pricing for Market Harborough moves with no hidden charges.' },
        { heading: 'Fully Insured', text: 'Complete insurance coverage on every Market Harborough move we handle.' },
      ],
      ctaText: 'Request a free quote for your Market Harborough move.',
    },
  },
  lutterworth: {
    name: 'Lutterworth',
    slug: 'removals-lutterworth',
    distance: '6 miles from our base in Blaby',
    description: 'Trusted house removals and man with a van in Lutterworth, South Leicestershire. AMB Removals is your closest professional mover — just 6 miles away. Fully insured, affordable local service.',
    areaServed: ['Lutterworth', 'Magna Park', 'Bitteswell', 'Ullesthorpe', 'Gilmorton', 'Broughton Astley'],
    nearby: ['Broughton Astley', 'Magna Park', 'Bitteswell', 'Ullesthorpe', 'Gilmorton', 'Catthorpe'],
    content: {
      heroTitle: 'Trusted Removals in Lutterworth',
      heroSubtitle: 'Your nearest professional removal company — just 6 miles from Lutterworth. House moves, office relocations and man with a van.',
      introTitle: 'Your Closest Removal Company to Lutterworth',
      introText: 'Based in nearby Blaby, AMB Removals is the closest professional moving company to Lutterworth. We know the area inside out — from the residential streets around the town centre to the rural properties and farmhouses in surrounding villages. Whether you are moving to a new-build near Magna Park or downsizing within town, we provide a personal, reliable service that larger national firms cannot match.',
      servicesIntro: 'As your nearest mover, we offer rapid response times and competitive rates for all Lutterworth removals.',
      whyTitle: 'Why Lutterworth Residents Choose Their Nearest Mover',
      whyItems: [
        { heading: 'Just 6 Miles Away', text: 'We are closer to Lutterworth than any other professional removal company, meaning faster response and lower travel costs.' },
        { heading: 'Rural Property Experience', text: 'Narrow lanes, gravel drives and farm conversions — we handle Lutterworth\'s unique property challenges with ease.' },
        { heading: 'Magna Park Logistics Hub', text: 'Regular office and warehouse moves around the Magna Park distribution centre and surrounding business parks.' },
        { heading: 'Fully Insured', text: 'Comprehensive goods-in-transit and public liability insurance on every Lutterworth move.' },
      ],
      ctaText: 'Get a free quote from your nearest removal company in Lutterworth.',
    },
  },
  hinckley: {
    name: 'Hinckley',
    slug: 'removals-hinckley',
    distance: '12 miles from our base in Blaby',
    description: 'Professional house removals, office moves and packing services in Hinckley and Burbage. AMB Removals offers fully insured, reliable moving services across Hinckley and the Leicestershire-Warwickshire border.',
    areaServed: ['Hinckley', 'Burbage', 'Earl Shilton', 'Barwell', 'Stoke Golding', 'Nuneaton'],
    nearby: ['Burbage', 'Earl Shilton', 'Barwell', 'Stoke Golding', 'Sapcote', 'Desford'],
    content: {
      heroTitle: 'Professional Removals in Hinckley',
      heroSubtitle: 'Fully insured house removals, packing services and man with a van across Hinckley, Burbage and the surrounding area.',
      introTitle: 'AMB Removals — Serving Hinckley & Burbage',
      introText: 'AMB Removals provides professional moving services across Hinckley, Burbage and the wider Leicestershire-Warwickshire border. As a growing market town with a mix of period properties, modern estates and rural homes, Hinckley presents unique moving challenges that our local team understands. From careful handling of furniture through narrow doorways in older homes to efficient loading on new-build estates, we tailor every move to the property.',
      servicesIntro: 'We deliver the full range of removal services across Hinckley and all surrounding postcodes.',
      whyTitle: 'Why Hinckley Trusts AMB Removals',
      whyItems: [
        { heading: 'Border Area Expertise', text: 'Covering both Leicestershire and Warwickshire sides of Hinckley, including moves to and from Nuneaton, Coventry and beyond.' },
        { heading: 'Period & Modern Properties', text: 'Experience with both Hinckley\'s older town-centre homes and the newer estates around Barwell and Burbage.' },
        { heading: 'Weekend & Evening Availability', text: 'Flexible scheduling including Saturday and Sunday moves to suit your timeline.' },
        { heading: 'Fully Insured', text: 'Complete insurance protection on every Hinckley move, from single items to full house relocations.' },
      ],
      ctaText: 'Request a free removal quote for your Hinckley move today.',
    },
  },
  rugby: {
    name: 'Rugby',
    slug: 'removals-rugby',
    distance: '25 miles from our base in Blaby',
    description: 'Reliable house removals and office relocations in Rugby, Warwickshire. AMB Removals offers fully insured, professional moving services with excellent M1/M6 corridor access for efficient Rugby moves.',
    areaServed: ['Rugby', 'Dunchurch', 'Hillmorton', 'Cawston', 'Long Lawford', 'Bilton'],
    nearby: ['Dunchurch', 'Hillmorton', 'Cawston', 'Long Lawford', 'Bilton', 'Clifton upon Dunsmore'],
    content: {
      heroTitle: 'Reliable Removals in Rugby',
      heroSubtitle: 'Professional house removals, office moves and man with a van in Rugby. Fast motorway access for efficient, affordable service.',
      introTitle: 'AMB Removals — Rugby Moving Services',
      introText: 'AMB Removals serves Rugby and the surrounding Warwickshire area with professional, fully insured removal services. Rugby\'s position at the junction of the M1, M6 and A5 makes it a key location for both residential and commercial moves. Whether you are relocating within Rugby, moving to one of the town\'s expanding new-build developments, or transferring a business to the thriving town centre, our experienced team delivers a smooth, efficient move every time.',
      servicesIntro: 'We provide comprehensive removal solutions for homes and businesses across Rugby and surrounding villages.',
      whyTitle: 'Why Rugby Customers Choose AMB Removals',
      whyItems: [
        { heading: 'Motorway Corridor Advantage', text: 'Excellent M1/M6 access means fast transit times between our base and Rugby, keeping your costs down.' },
        { heading: 'New-Build Specialists', text: 'Regular moves into Rugby\'s growing housing developments in Houlton, Cawston and South West Rugby.' },
        { heading: 'Commercial Moves', text: 'Office and warehouse relocations across Rugby\'s business parks, including Swift Valley and Elliott Park.' },
        { heading: 'Fully Insured', text: 'Every Rugby move is fully covered by our comprehensive insurance for total peace of mind.' },
      ],
      ctaText: 'Get a free, no-obligation quote for your Rugby removal.',
    },
  },
};

const location = computed(() => locations[props.city] || locations['leicester']);

useHead({
  title: computed(() => `Removals ${location.value.name} | House Moves & Man with Van | AMB Removals`),
  meta: [
    { name: 'description', content: computed(() => location.value.description) },
    { name: 'keywords', content: computed(() => `removals ${location.value.name}, house removals ${location.value.name}, man with van ${location.value.name}, office removals ${location.value.name}, AMB Removals`) },
    { property: 'og:title', content: computed(() => `Removals ${location.value.name} | AMB Removals`) },
    { property: 'og:description', content: computed(() => location.value.description) },
    { property: 'og:image', content: 'https://ambremovals.com/AMB_Removals.jpg' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => `https://ambremovals.com/${location.value.slug}`) },
    { property: 'og:site_name', content: 'AMB Removals' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => `Removals ${location.value.name} | AMB Removals`) },
    { name: 'twitter:description', content: computed(() => location.value.description) },
    { name: 'twitter:image', content: 'https://ambremovals.com/AMB_Removals.jpg' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: computed(() => `https://ambremovals.com/${location.value.slug}`) }],
  script: [
    { src: 'https://elfsightcdn.com/platform.js', async: true, defer: true },
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'AMB Removals Limited',
        url: 'https://ambremovals.com',
        telephone: '+44 116 456 0653',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '42 The Crescent, Blaby',
          addressLocality: 'Leicester',
          addressRegion: 'Leicestershire',
          postalCode: 'LE8 4FN',
          addressCountry: 'GB',
        },
        areaServed: location.value.areaServed.map(a => ({
          '@type': 'City',
          name: a,
        })),
      })),
    },
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ambremovals.com' },
          { '@type': 'ListItem', position: 2, name: `Removals ${location.value.name}`, item: `https://ambremovals.com/${location.value.slug}` },
        ],
      })),
    },
  ],
});
</script>

<template>
  <div class="location-page">
    <stickyButtons />

    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-inner">
        <div class="hero-copy">
          <div class="google-badge">
            <div
              class="elfsight-app-e4820a07-25c5-45ac-8988-3f71b17a6ad0"
              data-elfsight-app-lazy
            ></div>
          </div>
          <h1>{{ location.content.heroTitle }}</h1>
          <div class="hero-divider"></div>
          <p>{{ location.content.heroSubtitle }}</p>
          <div class="hero-actions">
            <a :href="phoneLink" class="cta-phone">CALL US: {{ phoneNumber }}</a>
          </div>
        </div>

        <div class="form-card" id="quote-form">
          <h3>Get A Free Quote</h3>
          <el-form
            :model="sidebarForm"
            :rules="sidebarRules"
            ref="sidebarFormRef"
            label-position="top"
            @submit.prevent="submitSidebarForm(sidebarFormRef)"
          >
            <div class="form-row">
              <el-form-item prop="name" label="Name *">
                <el-input v-model="sidebarForm.name" placeholder="John Doe" />
              </el-form-item>
              <el-form-item prop="phone" label="Phone *">
                <el-input v-model="sidebarForm.phone" placeholder="07388 836945" type="tel" />
              </el-form-item>
            </div>
            <div class="form-row">
              <el-form-item prop="email" label="Email *">
                <el-input v-model="sidebarForm.email" placeholder="you@email.com" type="email" />
              </el-form-item>
              <el-form-item prop="moveDate" label="Date of Move">
                <el-input v-model="sidebarForm.moveDate" type="date" placeholder="dd/mm/yyyy" />
              </el-form-item>
            </div>
            <div class="form-row">
              <el-form-item prop="fromPostcode" label="Moving From Postcode *">
                <el-input v-model="sidebarForm.fromPostcode" placeholder="e.g. LE17" />
              </el-form-item>
              <el-form-item prop="toPostcode" label="Moving To Postcode *">
                <el-input v-model="sidebarForm.toPostcode" placeholder="e.g. LE2" />
              </el-form-item>
            </div>
            <el-form-item prop="message" label="Tell us about your move">
              <el-input
                v-model="sidebarForm.message"
                type="textarea"
                :rows="3"
                placeholder="Rooms, packing help, special items..."
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit" class="btn-primary submit-button">
                Request My Free Quote
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>

    <section class="intro-section">
      <div class="intro-shell">
        <div class="intro-copy">
          <h2>{{ location.content.introTitle }}</h2>
          <p>{{ location.content.introText }}</p>
          <p class="distance-badge">{{ location.distance }}</p>
        </div>
        <div class="intro-image">
          <img :src="ambVanImg" :alt="`AMB Removals van in ${location.name}`" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="services-section">
      <div class="services-shell">
        <div class="services-header">
          <h2>Our Services in {{ location.name }}</h2>
          <p>{{ location.content.servicesIntro }}</p>
        </div>
        <div class="services-grid">
          <router-link to="/services#house-moving" class="service-card-link">
            <div class="service-card">
              <img :src="ambVanImg" alt="House removals" loading="lazy" />
              <h3>House Removals</h3>
              <p>Full house moves from flats to large family homes across {{ location.name }} and surrounding areas.</p>
            </div>
          </router-link>
          <router-link to="/services#office-moving" class="service-card-link">
            <div class="service-card">
              <img :src="furnitureImg" alt="Office removals" loading="lazy" />
              <h3>Office Removals</h3>
              <p>Commercial relocations with minimal downtime. We move offices of all sizes in {{ location.name }}.</p>
            </div>
          </router-link>
          <router-link to="/services#man-with-van" class="service-card-link">
            <div class="service-card">
              <img :src="livingImg" alt="Man with a van" loading="lazy" />
              <h3>Man with a Van</h3>
              <p>Affordable single item delivery and small moves across {{ location.name }}. Same-day often available.</p>
            </div>
          </router-link>
          <router-link to="/services#packing-services" class="service-card-link">
            <div class="service-card">
              <img :src="packingBoxImg" alt="Packing services" loading="lazy" />
              <h3>Packing Services</h3>
              <p>Professional packing with quality materials. Fragile item specialists serving {{ location.name }}.</p>
            </div>
          </router-link>
        </div>
        <div class="services-cta">
          <button class="cta-solid" @click="scrollToForm">GET A FREE QUOTE</button>
          <a :href="phoneLink" class="cta-outline-blue">CALL US: {{ phoneNumber }}</a>
        </div>
      </div>
    </section>

    <section class="why-section">
      <div class="why-shell">
        <div class="why-image">
          <img :src="ambTeamImg" :alt="`AMB Removals team serving ${location.name}`" loading="lazy" />
        </div>
        <div class="why-copy">
          <h2>{{ location.content.whyTitle }}</h2>
          <div class="why-list">
            <div v-for="(item, i) in location.content.whyItems" :key="i" class="why-item">
              <span class="why-icon">&#10003;</span>
              <div class="why-text">
                <h4>{{ item.heading }}</h4>
                <p>{{ item.text }}</p>
              </div>
            </div>
          </div>
          <div class="why-cta">
            <button class="cta-solid" @click="scrollToForm">GET A FREE QUOTE</button>
            <a :href="phoneLink" class="cta-outline-blue">CALL US: {{ phoneNumber }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="steps-section">
      <div class="steps-shell">
        <h2>How It Works</h2>
        <div class="steps-grid">
          <div class="step-card">
            <img :src="planIcon" alt="Plan icon" class="step-icon" />
            <h3>1. Get Your Free Quote</h3>
            <p>Tell us about your {{ location.name }} move and we will provide a clear, no-obligation price.</p>
          </div>
          <div class="step-card">
            <img :src="requestIcon" alt="Request icon" class="step-icon step-icon-lg" />
            <h3>2. We Plan Everything</h3>
            <p>We schedule your move around your availability and handle all the logistics.</p>
          </div>
          <div class="step-card">
            <img :src="moveIcon" alt="Move icon" class="step-icon" />
            <h3>3. Moving Day</h3>
            <p>Our team arrives on time, handles everything with care and gets you settled in.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="areas-section">
      <div class="areas-shell">
        <h2>Areas We Cover Near {{ location.name }}</h2>
        <p>In addition to {{ location.name }} itself, we regularly serve:</p>
        <div class="areas-list">
          <span v-for="(area, i) in location.nearby" :key="i" class="area-tag">{{ area }}</span>
        </div>
      </div>
    </section>

    <section class="reviews-section">
      <div class="reviews-shell">
        <div class="elfsight-app-700a1bb7-8408-4e4b-8213-e528f4768e56" data-elfsight-app-lazy></div>
      </div>
    </section>

    <section class="final-cta">
      <div class="final-overlay"></div>
      <div class="final-shell">
        <h2>Ready To Move in {{ location.name }}?</h2>
        <p>{{ location.content.ctaText }}</p>
        <div class="final-actions">
          <button class="cta-solid" @click="scrollToForm">GET A FREE QUOTE</button>
          <a :href="phoneLink" class="cta-outline-white">CALL US: {{ phoneNumber }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.location-page {
  width: 100%;
  color: #1f1f1f;
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  background: #f6f7fb;
  overflow-x: hidden;
}

.hero {
  position: relative;
  padding: 46px 18px 56px;
  background: url('/AMB_Removals.jpg') center/cover no-repeat;
  min-height: 640px;
  display: flex;
  align-items: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0.52) 100%);
}

.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 28px;
  max-width: 60%;
  margin: 0 auto;
  width: 100%;
  z-index: 1;
  align-items: flex-start;
}

.hero-copy {
  margin-top: 12vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 540px;
}

.google-badge {
  width: fit-content;
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
}

.hero h1 {
  margin: 0;
  font-size: 2.9rem;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.hero-divider {
  width: 100%;
  max-width: 420px;
  height: 3px;
  border-radius: 2px;
  background: #fff;
  margin: 6px 0 4px;
}

.hero p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #fff;
  font-weight: 800;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.cta-phone {
  display: inline-flex;
  align-items: center;
  background: #1f7bc9;
  color: #fff;
  text-decoration: none;
  padding: 14px 18px;
  border-radius: 6px;
  font-weight: 800;
  min-width: 240px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  text-transform: uppercase;
  font-size: 1.05rem;
  justify-content: center;
}

.cta-phone:hover { background: #1966a8; }

.form-card {
  margin-top: 12vh;
  background: #fff;
  border-radius: 10px;
  padding: 18px 18px 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.form-card h3 { margin: 0 0 8px; font-size: 1.15rem; font-weight: 700; }

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

:deep(.el-form-item) { margin-bottom: 12px; }
:deep(.el-form-item__label) { font-weight: 600; color: #303133; margin-bottom: 4px; }
:deep(.el-input__wrapper), :deep(.el-textarea__inner) { background: rgba(0, 0, 0, 0.09); border-radius: 6px; }
:deep(.el-input__wrapper) { padding: 10px 12px; }

.btn-primary {
  background: #1f7bc9;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}

.btn-primary:hover { background: #1966a8; }
.submit-button { width: 100%; justify-content: center; }

.intro-section {
  background: #fff;
  padding: 80px 24px;
}

.intro-shell {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.intro-copy h2 {
  margin: 0 0 16px;
  font-size: 32px;
  font-weight: 700;
  color: #c9a24a;
}

.intro-copy p {
  margin: 0 0 12px;
  font-size: 15px;
  line-height: 26px;
  color: #666;
}

.distance-badge {
  display: inline-block;
  background: #e6f0fb;
  color: #1f7bc9;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
}

.intro-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.services-section {
  background: rgba(0, 0, 0, 0.04);
  padding: 80px 24px;
}

.services-shell {
  max-width: 1080px;
  margin: 0 auto;
}

.services-header {
  text-align: center;
  margin-bottom: 40px;
}

.services-header h2 {
  margin: 0 0 10px;
  font-size: 32px;
  font-weight: 700;
  color: #c9a24a;
}

.services-header p {
  margin: 0;
  font-size: 16px;
  color: #666;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.service-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.service-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding-bottom: 20px;
}

.service-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.service-card h3 {
  margin: 16px 16px 8px;
  font-size: 18px;
  font-weight: 700;
  color: #00334a;
}

.service-card p {
  margin: 0 16px;
  font-size: 14px;
  line-height: 22px;
  color: #777;
}

.services-cta {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.cta-solid {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 19px;
  background: #2c7cc9;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.cta-solid:hover { background: #2466a5; }

.cta-outline-blue {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 19px;
  background: transparent;
  color: #2c7cc9;
  border: 1px solid #2c7cc9;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
}

.cta-outline-blue:hover { background: #e6f0fb; }

.why-section {
  background: #fff;
  padding: 80px 24px;
}

.why-shell {
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  gap: 50px;
  align-items: flex-start;
}

.why-image img {
  width: 450px;
  max-width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.why-copy {
  flex: 1;
}

.why-copy h2 {
  margin: 0 0 20px;
  font-size: 32px;
  font-weight: 700;
  color: #c9a24a;
}

.why-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.why-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.why-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #c9a24a;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 20px;
  font-weight: 700;
  flex: none;
}

.why-text h4 {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 700;
  color: #333;
}

.why-text p {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: #666;
}

.why-cta {
  display: flex;
  gap: 10px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.steps-section {
  background: rgba(0, 0, 0, 0.04);
  padding: 80px 24px;
}

.steps-shell {
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
}

.steps-shell h2 {
  margin: 0 0 40px;
  font-size: 32px;
  font-weight: 700;
  color: #c9a24a;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.step-card {
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 30px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.step-card img {
  margin: 0 auto;
  display: block;
}

.step-icon {
  width: 65px;
  height: 65px;
  object-fit: contain;
  margin-bottom: 16px;
}

.step-icon-lg {
  width: 100px;
  height: 100px;
}

.step-card h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.step-card p {
  margin: 0;
  font-size: 15px;
  line-height: 24px;
  color: #686868;
}

.areas-section {
  background: #fff;
  padding: 60px 24px;
  text-align: center;
}

.areas-shell {
  max-width: 800px;
  margin: 0 auto;
}

.areas-shell h2 {
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: 700;
  color: #c9a24a;
}

.areas-shell > p {
  margin: 0 0 20px;
  color: #666;
  font-size: 15px;
}

.areas-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.area-tag {
  background: #e6f0fb;
  color: #1f7bc9;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
}

.reviews-section {
  padding: 60px 24px;
  background: rgba(0, 0, 0, 0.04);
}

.reviews-shell {
  max-width: 1080px;
  margin: 0 auto;
}

.final-cta {
  position: relative;
  background: url('/AMB_Removals.jpg') center/cover no-repeat;
  padding: 80px 24px;
  color: #fff;
  display: flex;
  justify-content: center;
  text-align: center;
}

.final-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.final-shell {
  position: relative;
  max-width: 800px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.final-shell h2 {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
}

.final-shell p {
  margin: 0;
  font-size: 16px;
  line-height: 27px;
  color: #fff;
}

.final-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.cta-outline-white {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 19px;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
}

.cta-outline-white:hover { background: rgba(255, 255, 255, 0.1); }

@media (max-width: 960px) {
  .hero-inner { grid-template-columns: 1fr; max-width: 100%; justify-items: center; }
  .hero-copy { padding-top: 100px; margin-top: 0; text-align: center; align-items: center; max-width: 100%; }
  .form-card { width: 100%; max-width: 100%; margin-top: 20px; }
  .form-row { grid-template-columns: 1fr; }
  .intro-shell { grid-template-columns: 1fr; }
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .why-shell { flex-direction: column; }
  .why-image img { width: 100%; height: auto; }
  .steps-grid { grid-template-columns: 1fr; }
  .services-cta, .why-cta, .final-actions { flex-direction: column; width: 100%; }
  .cta-solid, .cta-outline-blue, .cta-outline-white { width: 100%; min-width: 0; }
}

@media (max-width: 640px) {
  .hero { padding: 22px 14px 32px; }
  .hero h1 { font-size: 2.2rem; }
  .services-grid { grid-template-columns: 1fr; }
}
</style>
