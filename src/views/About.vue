<script setup lang="ts">
import { ref } from 'vue';
import stickyButtons from '../components/stickyButtons.vue';
import AmbTeamImage from '@/assets/AMB_Removals_team.jpg';

const partnerLogos = ref([
  'https://www.pinlocal.com/front/images/pinlocal_logo.png',
  'https://prsubmissionsite.com/wp-content/uploads/2018/10/Removals-Index-Logo.jpg',
  ' https://www.comparemymove.com/assets/img/svg/logo.svg',
  'https://www.moveassured.com/img/MA-logo-header.png',
]);

//  SEO
import { useHead } from '@vueuse/head';

useHead({
  title: 'About Us - Trusted UK Movers',
  meta: [
    {
      name: 'description',
      content:
        'Discover the story behind AMB Removals, your trusted ambremovals team in the UK. Learn about our mission, values, and commitment to exceptional moving services.',
    },
    {
      name: 'keywords',
      content:
        'AMB Removals, ambremovals, about AMB Removals, UK removals company, professional movers, trusted relocation, family-run moving company',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'About Us - Trusted UK Movers | AMB Removals',
    },
    {
      property: 'og:description',
      content:
        'Get to know AMB Removals and the ambremovals team. Learn what makes us one of the most trusted moving companies in the UK.',
    },
    {
      property: 'og:image',
      content: 'https://ambremovals.com/AMB_Removals.jpg',
    },
    {
      property: 'og:url',
      content: 'https://ambremovals.com/about',
    },
    {
      property: 'og:type',
      content: 'website',
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
      content: 'About Us - Trusted UK Movers | AMB Removals',
    },
    {
      name: 'twitter:description',
      content:
        'Get to know AMB Removals and the ambremovals team. Learn what makes us one of the most trusted moving companies in the UK.',
    },
    {
      name: 'twitter:image',
      content: 'https://ambremovals.com/AMB_Removals.jpg',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://ambremovals.com/about',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ambremovals.com' },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://ambremovals.com/about' },
        ],
      }),
    },
  ],
});
</script>

<template>
  <div class="about-container">
    <stickyButtons />
    <!-- Banner -->
    <div class="about-banner">
      <div class="banner-content">
        <h1>About Our Removals Company</h1>
        <p>Learn more about AMB Removals and our team of professionals</p>
      </div>
    </div>

    <!-- About Company -->
    <div class="section company-section">
      <el-row :gutter="30">
        <el-col :xs="24" :md="12">
          <div class="company-image">
            <el-image :src="AmbTeamImage" fit="cover" :preview-src-list="[AmbTeamImage]"></el-image>
          </div>
        </el-col>
        <el-col :xs="24" :md="12">
          <div class="company-info">
            <h2>AMB Removals Limited: Your Trusted Family-Run Moving Company</h2>
            <p>
              Welcome to AMB Removals Limited, your dedicated local moving company in Leicestershire
              and the surrounding areas! As a family-run business, we understand that moving can be
              a significant life event, and our mission is to make your relocation as smooth,
              stress-free, and hassle-free as possible.
            </p>
            <p>
              Why Choose AMB Removals for Your Move? At AMB Removals, we specialize in both
              residential moves and commercial relocations, offering personalized moving services
              tailored to your unique needs. Our team of experienced moving professionals is
              committed to providing reliable, efficient, and affordable moving solutions while
              ensuring the utmost safety of your belongings.
            </p>
            <p>
              We know that every move is unique, which is why we take the time to understand your
              specific requirements and develop a customized moving plan just for you. From expert
              packing services and careful loading to secure transportation and efficient unpacking,
              we handle every detail with precision and professionalism.
            </p>
            <p>
              Quality, Trust, and Community As a local, family-operated moving company, we pride
              ourselves on our unwavering commitment to customer satisfaction. We value trust,
              community, and building long-term relationships with our clients. You can count on us
              to treat your move with the same attention and care we would give our own family.
            </p>
            <p>
              When you choose AMB Removals, you're choosing a company that not only provides
              high-quality moving services but also offers complete peace of mind. We are fully
              insured and accredited in the relocation industry, ensuring that your move is handled
              with the highest standards of care and professionalism.
            </p>
            <p>
              Your Stress-Free Move Starts Here Trust AMB Removals Limited to make your next move a
              positive and seamless experience. Contact us today for a free, no-obligation quote and
              let our family help yours with a smooth transition to your new home or office.
            </p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Our Values -->
    <div class="section values-section">
      <h2 class="section-title">Our Values</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="8" v-for="(_, index) in 3" :key="index">
          <el-card class="value-card">
            <el-icon v-if="index === 0"><Star /></el-icon>
            <el-icon v-else-if="index === 1"><UserFilled /></el-icon>
            <el-icon v-else><Opportunity /></el-icon>

            <h3 v-if="index === 0">Quality</h3>
            <h3 v-else-if="index === 1">Customer Focus</h3>
            <h3 v-else>Development</h3>

            <p v-if="index === 0">
              We strive for excellence in everything we do and guarantee high quality of our
              services.
            </p>
            <p v-else-if="index === 1">
              We put the customer's interests first and do everything possible to exceed
              expectations.
            </p>
            <p v-else>
              We are constantly developing, implementing new technologies, and improving our
              processes.
            </p>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- Our Achievements -->
    <div class="section achievements-section">
      <h2 class="section-title">Our Achievements</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" v-for="(_, index) in 3" :key="index">
          <div class="stat-card">
            <h3 v-if="index === 0">100+</h3>
            <h3 v-else-if="index === 1">98%</h3>
            <h3 v-else>5+</h3>

            <p v-if="index === 0">Successful Moves</p>
            <p v-else-if="index === 1">Satisfied Clients</p>
            <p v-else>Years in Business</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Our Partners -->
    <div class="section partners-section">
      <h2 class="section-title">Our Partners</h2>
      <div class="partners-logos">
        <el-image
          v-for="(logo, i) in partnerLogos"
          :key="i"
          style="width: 120px; height: 80px"
          :src="logo"
          fit="contain"
          :alt="`AMB Removals partner ${i + 1}`"
        ></el-image>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-section">
      <h2>Ready to Become Our Client?</h2>
      <p>Contact us today and find out how we can help with your move</p>
      <el-button type="primary" size="large" @click="$router.push('/contact')">
        Contact Us
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  width: 100%;
}

.about-banner {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('/src/assets/AMB_Removals_team.jpg');
  background-size: cover;
  background-position: center;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.banner-content {
  max-width: 800px;
  padding: 0 20px;
}

.banner-content h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
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

.company-section {
  padding-top: 80px;
}

.company-image {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.company-info {
  padding: 0 20px;
}

.company-info h2 {
  margin-top: 0;
  color: #303133;
}

.values-section {
  background-color: #f5f7fa;
}

.value-card {
  height: 100%;
  text-align: center;
  padding: 20px;
}

.value-card .el-icon {
  font-size: 40px;
  color: #409eff;
  margin-bottom: 15px;
}

.achievements-section {
  background-color: #545c64;
  color: white;
}

.stat-card {
  text-align: center;
  padding: 20px;
}

.stat-card h3 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
}

.partners-section {
  background-color: white;
}

.partners-logos {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.cta-section {
  background-color: #545c64;
  color: bisque;
  text-align: center;
  padding: 60px 20px;
}

.cta-section h2 {
  margin-top: 0;
}

.cta-section .el-button {
  background-color: #444a51;
  color: bisque;
  border: none;
  margin-top: 20px;
}

.achievements-section .section-title {
  color: #d3e1f0;
}

@media (max-width: 768px) {
  .about-banner {
    height: 50vh;
  }

  .banner-content h1 {
    font-size: 2rem;
  }

  .section {
    padding: 40px 20px;
  }

  .company-image {
    margin-bottom: 30px;
  }

  .stat-card h3 {
    font-size: 2rem;
  }
}
</style>
