<script setup lang="ts">
import { Van, OfficeBuilding, Box } from '@element-plus/icons-vue';
import stickyButtons from '../components/stickyButtons.vue';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Our Services - Professional Moving Solutions',
  meta: [
    {
      name: 'description',
      content:
        'Discover AMB Removals professional moving services including house removals, office relocations, and packing services across Leicestershire and the UK.',
    },
    {
      name: 'keywords',
      content:
        'AMB Removals, house removals, office moving, packing services, Leicester removals, professional movers, relocation services',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'Our Services - Professional Moving Solutions | AMB Removals',
    },
    {
      property: 'og:description',
      content:
        'Discover AMB Removals professional moving services including house removals, office relocations, and packing services across Leicestershire and the UK.',
    },
    {
      property: 'og:url',
      content: 'https://ambremovals.com/services',
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
      content: 'Our Services - Professional Moving Solutions | AMB Removals',
    },
    {
      name: 'twitter:description',
      content:
        'Discover AMB Removals professional moving services including house removals, office relocations, and packing services across Leicestershire and the UK.',
    },
    {
      name: 'twitter:image',
      content: 'https://ambremovals.com/AMB_Removals.jpg',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://ambremovals.com/services',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Moving Services',
        provider: {
          '@type': 'MovingCompany',
          name: 'AMB Removals',
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
        },
        areaServed: {
          '@type': 'Place',
          name: 'Leicestershire and the UK',
        },
        description:
          'Professional moving services including house removals, office relocations, and packing services across Leicestershire and the UK.',
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ambremovals.com' },
          { '@type': 'ListItem', position: 2, name: 'Our Services', item: 'https://ambremovals.com/services' },
        ],
      }),
    },
  ],
});

const services = [
  {
    icon: Van,
    title: 'House Moving Services',
    content: {
      intro: [
        '🏠 House Removals in Leicestershire – Professional Home Moving Services',
        "Moving house in Leicester or the surrounding areas? Whether you're upgrading to a larger home, relocating to another city, or downsizing, AMB Removals is here to make your house move smooth, stress-free, and efficient.",
        "As a trusted Leicester removals company, we specialise in residential moving services tailored to your exact needs. With years of experience, a reliable team, and great customer feedback, we take care of everything — so you don't have to.",
      ],
      featuresTitle: "✅ What's Included in Our House Moving Service",
      featuresSubtitle: 'We provide everything you need for a successful home move:',
      features: [
        '📦 Fully trained and friendly movers with experience in house removals',
        '🛠 Disassembly and reassembly of furniture — beds, wardrobes, tables',
        '📅 Flexible scheduling to suit your timeline',
        '🔒 Secure packing using high-quality materials',
        '💬 Clear, upfront pricing with no hidden charges',
      ],
      closing: [
        "Whether you're moving across Leicester or to another part of the UK, your belongings are safe in our hands.",
        "📞 Ready to Move? Let AMB Removals take the stress out of moving day. We're proud to be one of the top-rated house removal companies in Leicester, known for care, speed, and customer satisfaction.",
        '👉 Get your FREE moving quote today – fast, friendly, and no obligation.',
      ],
    },
  },
  {
    icon: OfficeBuilding,
    title: 'Office Moving',
    content: {
      intro: [
        '🏢 Office Removals in Leicester – Business Relocation Made Simple',
        'Relocating your office in Leicester or nearby areas? At AMB Removals, we understand that time is money — and we make sure your office move is fast, efficient, and disruption-free.',
        "Whether you're a small business upgrading to a larger space or a company moving departments across the city, our professional office movers handle everything with minimal downtime.",
      ],
      featuresTitle: '✅ Our Office Moving Services Include:',
      features: [
        '📦 Packing and labelling of office equipment, files, and electronics',
        '🛠 Furniture disassembly and reassembly (desks, chairs, cabinets)',
        '👨‍💼 Coordination with building managers and out-of-hours moves',
        '🔐 Secure transport with GPS-tracked vehicles',
        '🧹 Optional post-move cleanup and waste disposal',
      ],
      closing: [
        'We serve businesses across Leicester, Loughborough, Hinckley, Wigston, and the wider East Midlands.',
        '📞 Book Your Office Move Today Keep your team focused — and let us handle the logistics. Contact AMB Removals for a free quote and expert advice on your upcoming business relocation.',
      ],
    },
  },
  {
    icon: Box,
    title: 'Packing Services',
    content: {
      intro: [
        '📦 Packing Services – Professional Packing for Home & Office Moves',
        "Don't want the hassle of packing? Our professional packing service ensures your items are safely wrapped, boxed, and ready for transport — whether you're moving house or relocating your office.",
      ],
      featuresTitle: "✅ What's Included in Our Packing Services:",
      features: [
        '🧰 High-quality materials: boxes, bubble wrap, tape, wardrobe cartons',
        '👷‍♂️ Experienced packers trained to handle fragile or valuable items',
        '🗂 Labelling for organised unpacking at destination',
        '⏱️ Full or partial packing options – tailored to your needs',
        '🔐 Optional unpacking and setup service at your new location',
      ],
      closing: [
        'From kitchenware and books to monitors and printers, we pack it all with care.',
        '🚚 Book Your Packing Service Now Save time, reduce stress, and avoid damage. Let AMB Removals take care of the packing so you can focus on settling in.',
        '👉 Contact us today for a free quote or to combine packing with your removal service.',
      ],
    },
  },
  {
    icon: Van,
    title: 'Man with a Van',
    content: {
      intro: [
        '🚐 Man with a Van in Leicester – Affordable, Flexible Moving',
        "Need something moved quickly and affordably? Our man with a van service is perfect for single items, student moves, small flat relocations, and marketplace collections across Leicester and the East Midlands.",
      ],
      featuresTitle: "✅ What's Included in Our Man with a Van Service:",
      features: [
        '🚛 Spacious van suitable for single items up to full small flat loads',
        '💪 Full loading and unloading assistance included',
        '⏱️ Same-day and next-day availability (subject to schedule)',
        '🔐 Fully insured for your peace of mind',
        '💰 Transparent, competitive pricing with no hidden fees',
      ],
      closing: [
        "Whether you need a sofa collected, a student room moved, or an eBay purchase delivered, we've got you covered.",
        '📞 Book Your Man with a Van Today Save time and hassle with our affordable, reliable man with a van service. Contact AMB Removals for a quick, no-obligation quote.',
        '👉 Get your FREE quote today – flexible, affordable and fully insured.',
      ],
    },
  },
];
</script>

<template>
  <div class="services-page">
    <stickyButtons />

    <!-- Banner Section -->
    <div class="services-banner">
      <div class="banner-content">
        <h1>Our Services</h1>
        <p>Professional moving solutions tailored to your needs</p>
      </div>
    </div>

    <!-- Services Section -->
    <div class="services-container">
      <div class="service-item" v-for="(service, index) in services" :key="index">
        <el-card class="service-card">
          <div class="service-header">
            <el-icon class="service-icon">
              <component :is="service.icon" />
            </el-icon>
            <h2 class="service-title">{{ service.title }}</h2>
          </div>

          <div class="service-content">
            <div class="intro-section">
              <p
                v-for="(paragraph, pIndex) in service.content.intro"
                :key="pIndex"
                class="intro-text"
              >
                {{ paragraph }}
              </p>
            </div>

            <div class="features-section">
              <h3 class="features-title">{{ service.content.featuresTitle }}</h3>
              <p v-if="service.content.featuresSubtitle" class="features-subtitle">
                {{ service.content.featuresSubtitle }}
              </p>
              <ul class="features-list">
                <li
                  v-for="(feature, fIndex) in service.content.features"
                  :key="fIndex"
                  class="feature-item"
                >
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="closing-section">
              <p
                v-for="(paragraph, pIndex) in service.content.closing"
                :key="pIndex"
                class="closing-text"
              >
                {{ paragraph }}
              </p>
            </div>

            <div class="service-cta">
              <el-button
                v-if="index === 0"
                type="primary"
                size="large"
                @click="$router.push('/house-removal')"
                class="service-link-button"
              >
                Find Out More About House Moving
              </el-button>
              <el-button
                v-else-if="index === 1"
                type="primary"
                size="large"
                @click="$router.push('/business-moving')"
                class="service-link-button"
              >
                Find Out More About Office Moving
              </el-button>
              <el-button
                v-else-if="index === 2"
                type="primary"
                size="large"
                @click="$router.push('/packing-services')"
                class="service-link-button"
              >
                Find Out More About Packing Services
              </el-button>
              <el-button
                v-else-if="index === 3"
                type="primary"
                size="large"
                @click="$router.push('/man-with-van')"
                class="service-link-button"
              >
                Find Out More About Man with a Van
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-section">
      <h2>Ready to Get Started?</h2>
      <p>Contact us today for a free, no-obligation quote</p>
      <el-button type="primary" size="large" @click="$router.push('/quote')">
        Request a Quote
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.services-page {
  width: 100%;
  min-height: 100vh;
}

.services-banner {
  background: linear-gradient(135deg, #0a376f 0%, #818181 100%);
  background-size: cover;
  background-position: center;
  height: 50vh;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 20px;
}

.banner-content {
  max-width: 800px;
}

.banner-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.banner-content p {
  font-size: 1.3rem;
  opacity: 0.95;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.service-item {
  margin-bottom: 40px;
}

.service-item:last-child {
  margin-bottom: 0;
}

.service-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.service-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px 30px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  border-bottom: 3px solid #409eff;
}

.service-icon {
  font-size: 48px;
  color: #409eff;
  flex-shrink: 0;
}

.service-title {
  font-size: 2rem;
  color: #303133;
  margin: 0;
  font-weight: 600;
}

.service-content {
  padding: 30px;
  line-height: 1.8;
  color: #606266;
}

.intro-section {
  margin-bottom: 30px;
}

.intro-text {
  font-size: 1.1rem;
  margin-bottom: 15px;
  text-align: justify;
}

.intro-text:first-child {
  font-size: 1.2rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.features-section {
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  margin: 30px 0;
  border-left: 4px solid #409eff;
}

.features-title {
  font-size: 1.4rem;
  color: #303133;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.features-subtitle {
  font-size: 1rem;
  color: #606266;
  margin: 0 0 20px 0;
  font-style: italic;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  font-size: 1.05rem;
  padding: 12px 0;
  padding-left: 25px;
  position: relative;
  color: #606266;
  line-height: 1.6;
}

.feature-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #409eff;
  font-weight: bold;
  font-size: 1.2rem;
}

.closing-section {
  margin-top: 30px;
}

.closing-text {
  font-size: 1.05rem;
  margin-bottom: 15px;
  text-align: justify;
}

.service-cta {
  margin-top: 30px;
  text-align: center;
  padding-top: 20px;
  border-top: 2px solid #e9ecef;
}

.service-link-button {
  background-color: #409eff;
  border-color: #409eff;
  font-size: 1rem;
  padding: 12px 30px;
  transition: all 0.3s ease;
}

.service-link-button:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.cta-section {
  background: linear-gradient(135deg, #545c64 0%, #303133 100%);
  color: #fff;
  text-align: center;
  padding: 60px 20px;
  margin-top: 40px;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin: 0 0 15px 0;
  color: #fff;
}

.cta-section p {
  font-size: 1.2rem;
  margin: 0 0 30px 0;
  opacity: 0.95;
}

.cta-section .el-button {
  background-color: #409eff;
  border-color: #409eff;
  font-size: 1.1rem;
  padding: 15px 40px;
  transition: all 0.3s ease;
}

.cta-section .el-button:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .services-banner {
    height: 40vh;
    min-height: 250px;
  }

  .banner-content h1 {
    font-size: 2rem;
  }

  .banner-content p {
    font-size: 1.1rem;
  }

  .services-container {
    padding: 40px 15px;
  }

  .service-header {
    flex-direction: column;
    text-align: center;
    padding: 25px 20px 15px;
  }

  .service-icon {
    font-size: 40px;
  }

  .service-title {
    font-size: 1.6rem;
  }

  .service-content {
    padding: 20px;
  }

  .intro-text {
    font-size: 1rem;
  }

  .intro-text:first-child {
    font-size: 1.1rem;
  }

  .features-section {
    padding: 20px;
  }

  .features-title {
    font-size: 1.2rem;
  }

  .feature-item {
    font-size: 1rem;
  }

  .cta-section h2 {
    font-size: 2rem;
  }

  .cta-section p {
    font-size: 1rem;
  }

  .service-link-button {
    font-size: 0.9rem;
    padding: 10px 20px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .banner-content h1 {
    font-size: 1.75rem;
  }

  .service-title {
    font-size: 1.4rem;
  }

  .cta-section h2 {
    font-size: 1.75rem;
  }
}
</style>
