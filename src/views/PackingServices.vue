<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import { ElButton, ElInput, ElMessage, type FormInstance, type FormRules } from 'element-plus';
import stickyButtons from '@/components/stickyButtons.vue';

const router = useRouter();

const phoneNumber = '0 (116) 456-0653';
const phoneLink = 'tel:0 (116) 456-0653';

const sidebarFormRef = ref<FormInstance>();
const sidebarForm = reactive({
  name: '',
  phone: '',
  email: '',
  moveDate: '',
  fromPostcode: '',
  toPostcode: '',
  message: '',
});

const sidebarRules = reactive<FormRules>({
  name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }],
  phone: [{ required: true, message: 'Please enter your phone number', trigger: 'blur' }],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
  ],
  moveDate: [{ required: false }],
  fromPostcode: [{ required: true, message: 'Please enter postcode', trigger: 'blur' }],
  toPostcode: [{ required: true, message: 'Please enter postcode', trigger: 'blur' }],
  message: [{ required: false }],
});

// Convert date to DD-MM-YYYY format
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return '';
  }
};

// Split name into first_name and last_name
const splitName = (fullName: string): { first_name: string; last_name: string } => {
  if (!fullName) return { first_name: '', last_name: '' };
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { first_name: parts[0], last_name: '' };
  }
  return {
    first_name: parts[0],
    last_name: parts.slice(1).join(' '),
  };
};

// Transform sidebar form data to API schema format
const transformFormData = (formData: typeof sidebarForm) => {
  const { first_name, last_name } = splitName(formData.name);

  return {
    first_name: first_name || '',
    last_name: last_name || '',
    company_name: '',
    email: formData.email || '',
    phone: formData.phone || '',
    alt_phone: '',
    move_date: formatDate(formData.moveDate),
    move_date_app: '',
    // Moving From
    mf_add1: '',
    mf_add2: '',
    mf_city: '',
    mf_postcode: formData.fromPostcode || '',
    mfproptype: '',
    mf_floornumber: '',
    mf_bedroom: '',
    mf_lift: '',
    movingfrompostcodedata: {},
    // Moving To
    mt_add1: '',
    mt_add2: '',
    mt_city: '',
    mt_postcode: formData.toPostcode || '',
    mtproptype: '',
    mt_floornumber: '',
    mt_bedroom: '',
    mt_lift: '',
    movingtopostcodedata: {},
    // Additional fields
    packagename: '',
    source: '',
    // Comments
    comments: formData.message || '',
  };
};

const sendEmail = async (formData: typeof sidebarForm) => {
  try {
    const apiData = transformFormData(formData);
    const response = await fetch('https://api.app.i-mve.com/job/user/67bf59d16a3e7f36cbc45694', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error sending quote:', error);
    throw error;
  }
};

// Send email notification to /api/send-email
const sendEmailNotification = async (formData: typeof sidebarForm) => {
  try {
    const response = await fetch('/api/send-quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        altPhone: '',
        fromPostcode: formData.fromPostcode || '',
        fromAddress: '',
        fromCity: '',
        fromPropertyType: '',
        toPostcode: formData.toPostcode || '',
        toAddress: '',
        toCity: '',
        toPropertyType: '',
        pakage: '',
        details: formData.message || '',
        consent: false,
        promoCode: '',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email notification:', error);
    return null;
  }
};

const submitSidebarForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    const valid = await formEl.validate();
    if (valid) {
      await sendEmail(sidebarForm);
      await sendEmailNotification(sidebarForm);
      ElMessage({ message: 'Quote sent successfully!', type: 'success' });
      formEl.resetFields();
      setTimeout(() => {
        router.push('/thank-you');
      }, 1000);
    } else {
      ElMessage({ message: 'Please check the form for errors', type: 'error' });
    }
  } catch (error) {
    ElMessage({ message: 'Please complete required fields', type: 'error' });
  }
};

const scrollToForm = () => {
  const formElement = document.getElementById('quote-form');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

useHead({
  title: 'Professional Packing Services & Fragile Item Moves | AMB Removals',
  meta: [
    {
      name: 'description',
      content:
        'Expert packing services in Leicester & Leicestershire. Professional packers for fragile items, pianos, antiques and full home packing. Quality materials and careful handling guaranteed.',
    },
    {
      name: 'keywords',
      content:
        'packing services Leicester, fragile item removals, piano movers Leicester, professional packers, AMB Removals, packing materials, fragile item handling, antique movers',
    },
    {
      property: 'og:title',
      content: 'Professional Packing Services & Fragile Item Moves | AMB Removals',
    },
    {
      property: 'og:description',
      content:
        'Expert packing services in Leicester & Leicestershire. Professional packers for fragile items, pianos, antiques and full home packing.',
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
      content: 'https://ambremovals.com/packing-services',
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
      content: 'Professional Packing Services & Fragile Item Moves | AMB Removals',
    },
    {
      name: 'twitter:description',
      content: 'Expert packing services in Leicester & Leicestershire. Professional packers for fragile items, pianos, antiques and full home packing.',
    },
    {
      name: 'twitter:image',
      content: 'https://ambremovals.com/AMB_Removals.jpg',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://ambremovals.com/packing-services',
    },
  ],
  script: [
    {
      src: 'https://elfsightcdn.com/platform.js',
      async: true,
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Packing Services',
        provider: {
          '@type': 'MovingCompany',
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
        },
        areaServed: ['Leicester', 'Leicestershire', 'Lutterworth', 'Blaby', 'South Leicestershire'],
        description: 'Professional packing services for home and office moves. Specialist handling for fragile items, pianos, antiques and valuables across Leicestershire.',
        serviceType: 'Packing Services',
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do you provide the packing materials?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — we supply all packing materials including boxes, bubble wrap, tissue paper, wardrobe cartons and tape. Everything is included in our packing service quote.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you move a piano or other heavy fragile items?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely. We have specialist equipment and trained staff for moving pianos, antiques, artwork and other heavy or delicate items safely.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you handle fragile items?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Each fragile item is individually wrapped using bubble wrap, tissue paper and custom padding. We use clearly labelled "fragile" boxes and ensure careful loading to prevent movement during transit.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much does a packing service cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Costs depend on the volume of items and level of service required. We offer free, no-obligation quotes — contact us with your details for an accurate price.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need to pack anything myself?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Not at all — we offer a full packing service where our team handles everything. Alternatively, you can choose partial packing if you prefer to pack some items yourself.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does the packing take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A typical 3-bedroom house takes around half a day to pack fully. Larger homes or those with many fragile items may take a full day. We can pack the day before your move or on the same day.',
            },
          },
        ],
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
          { '@type': 'ListItem', position: 3, name: 'Packing Services', item: 'https://ambremovals.com/packing-services' },
        ],
      }),
    },
  ],
});
</script>

<template>
  <div class="landing-page">
    <stickyButtons />
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-inner">
        <div class="hero-copy">
          <div class="google-badge">
            <!-- Elfsight Google Reviews | AMB Removals Badge -->
            <div
              class="elfsight-app-e4820a07-25c5-45ac-8988-3f71b17a6ad0"
              data-elfsight-app-lazy
            ></div>
          </div>
          <h1>Professional Packing & Fragile Item Services in Leicestershire</h1>
          <div class="hero-divider"></div>
          <p>Expert packing, careful handling and specialist fragile item moves across Leicester and South Leicestershire.</p>
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
            <el-form-item prop="message" label="Tell us about your packing needs">
              <el-input
                v-model="sidebarForm.message"
                type="textarea"
                :rows="3"
                placeholder="Fragile items, pianos, antiques, number of rooms..."
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

    <section class="exceptional-service">
      <div class="exceptional-shell">
        <div class="exceptional-copy">
          <p class="exceptional-eyebrow">Why Choose AMB Removals?</p>
          <h2 class="exceptional-title">Expert Packing For Every Move</h2>
          <p class="exceptional-lead">
            From full house packing to specialist fragile item handling, our trained packers use quality materials and proven techniques to keep your belongings safe throughout your move.
          </p>

          <div class="exceptional-list">
            <div class="exceptional-item">
              <div class="item-icon">✓</div>
              <div class="item-text">
                <h4>Trained Professional Packers</h4>
                <p>Our experienced team packs efficiently and carefully, ensuring every item is protected for transit.</p>
              </div>
            </div>
            <div class="exceptional-item">
              <div class="item-icon">✓</div>
              <div class="item-text">
                <h4>Quality Packing Materials</h4>
                <p>We use premium boxes, bubble wrap, tissue paper and wardrobe cartons — all included in our service.</p>
              </div>
            </div>
            <div class="exceptional-item">
              <div class="item-icon">✓</div>
              <div class="item-text">
                <h4>Fragile Item Specialists</h4>
                <p>Pianos, antiques, artwork and glassware — we have the expertise and equipment to move them safely.</p>
              </div>
            </div>
            <div class="exceptional-item">
              <div class="item-icon">✓</div>
              <div class="item-text">
                <h4>Fully Insured & Labelled</h4>
                <p>Every box is clearly labelled for organised unpacking, and all items are covered by our insurance.</p>
              </div>
            </div>
          </div>

          <div class="exceptional-cta">
            <button class="cta-solid" @click="scrollToForm">GET A FREE QUOTE</button>
            <a :href="phoneLink" class="cta-outline-blue">CALL US: {{ phoneNumber }}</a>
          </div>
        </div>

        <div class="exceptional-grid">
          <div class="tile tile-dark">
            <div class="tile-text">Quality Packing Materials Included</div>
          </div>
          <div class="tile tile-photo">
            <img src="/src/assets/photos/Packing_box_removals.jpg" alt="Professional packing service" />
          </div>
          <div class="tile tile-photo">
            <img src="/src/assets/photos/Living_removals.jpg" alt="Fragile items carefully packed" />
          </div>
          <div class="tile tile-dark">
            <div class="tile-text">Specialist Fragile Item Handling</div>
          </div>
        </div>
      </div>

      <!-- Elfsight Google Reviews | AMB Removals Carousel -->
      <div class="reviews-carousel-container">
        <div class="elfsight-app-700a1bb7-8408-4e4b-8213-e528f4768e56" data-elfsight-app-lazy></div>
      </div>
    </section>

    <section class="projects-section">
      <div class="projects-shell">
        <div class="projects-header">
          <p class="projects-eyebrow">Complete packing solutions for every type of move.</p>
          <h2 class="projects-title">Our Packing Services</h2>
          <p class="projects-lead">
            Whether you need us to pack your entire home or just handle the delicate items, we offer flexible packing options tailored to your needs and budget.
          </p>
          <div class="projects-cta">
            <button class="cta-solid" @click="scrollToForm">GET A FREE QUOTE</button>
            <a :href="phoneLink" class="cta-outline-blue">CALL US: {{ phoneNumber }}</a>
          </div>
        </div>

        <div class="projects-grid">
          <div class="project-card">
            <img src="/src/assets/photos/Packing_box_removals.jpg" alt="Full packing service" />
            <div class="project-body">
              <h3>Full Packing Service</h3>
              <p>We pack your entire home from top to bottom — every room, every item. Ideal if you want a completely hands-off moving experience.</p>
            </div>
          </div>
          <div class="project-card">
            <img src="/src/assets/photos/Living_removals.jpg" alt="Partial packing service" />
            <div class="project-body">
              <h3>Partial Packing</h3>
              <p>Pack what you can and leave the rest to us. We handle the tricky items like kitchenware, glassware and electronics while you take care of the easy stuff.</p>
            </div>
          </div>
          <div class="project-card">
            <img src="/src/assets/photos/TV_pictures_removals.jpg" alt="Fragile items and piano moving" />
            <div class="project-body">
              <h3>Fragile Items & Piano Moving</h3>
              <p>Specialist handling for pianos, antiques, artwork, mirrors and other delicate or heavy items. Custom wrapping and secure transport guaranteed.</p>
            </div>
          </div>
          <div class="project-card">
            <img src="/src/assets/photos/Furniture_removals.jpg" alt="Packing materials supply" />
            <div class="project-body">
              <h3>Packing Materials Supply</h3>
              <p>Need boxes and supplies for self-packing? We deliver quality packing materials including boxes, bubble wrap, tape and wardrobe cartons direct to your door.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="steps-section">
      <div class="steps-shell">
        <div class="steps-header">
          <p class="steps-eyebrow">A simple, stress-free process from enquiry to packing day.</p>
          <h2 class="steps-title">How Our Packing Service Works</h2>
          <p class="steps-lead">
            We make the packing process easy and efficient, so you can focus on the exciting parts of your move while we handle the hard work.
          </p>
          <div class="projects-cta">
            <button class="cta-solid" @click="scrollToForm">GET A FREE QUOTE</button>
            <a :href="phoneLink" class="cta-outline-blue">CALL US: {{ phoneNumber }}</a>
          </div>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <img src="/src/assets/svg/plan.svg" alt="Plan icon" class="step-icon-img" />
            <div class="step-text">
              <h3>1. Request Your Free Quote</h3>
              <p>Tell us about your packing needs — we'll provide a clear, accurate price with no hidden extras.</p>
            </div>
          </div>
          <div class="step-card">
            <img src="/src/assets/svg/request.png" alt="Request icon" class="step-icon-img1" />
            <div class="step-text">
              <h3>2. We Assess Your Needs</h3>
              <p>We discuss your requirements, identify fragile or specialist items, and plan the packing around your schedule.</p>
            </div>
          </div>
          <div class="step-card">
            <img src="/src/assets/svg/move.svg" alt="Move icon" class="step-icon-img" />
            <div class="step-text">
              <h3>3. Packing Day</h3>
              <p>Our team arrives with all materials, packs everything safely and labels each box for easy unpacking at your new home.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="guarantees-section">
      <div class="guarantees-shell">
        <div class="guarantees-image">
          <img src="/src/assets/AMB_Removals_team.jpg" alt="AMB Removals packing team" />
        </div>
        <div class="guarantees-copy">
          <p class="guarantees-eyebrow">Your belongings packed with care and total peace of mind.</p>
          <h2 class="guarantees-title">Our Packing Guarantees</h2>
          <p class="guarantees-lead">
            We're committed to protecting your belongings with professional packing techniques, quality materials and full insurance cover — giving you complete confidence in every box we pack.
          </p>
          <div class="guarantees-list">
            <div class="guarantee-row">
              <span class="guarantee-icon">✓</span>
              <span>Premium packing materials included</span>
            </div>
            <div class="guarantee-row">
              <span class="guarantee-icon">✓</span>
              <span>Careful handling of fragile and valuable items</span>
            </div>
            <div class="guarantee-row">
              <span class="guarantee-icon">✓</span>
              <span>Full insurance coverage on all packed items</span>
            </div>
            <div class="guarantee-row">
              <span class="guarantee-icon">✓</span>
              <span>Clear labelling system for organised unpacking</span>
            </div>
            <div class="guarantee-row">
              <span class="guarantee-icon">✓</span>
              <span>Specialist equipment for pianos and antiques</span>
            </div>
            <div class="guarantee-row">
              <span class="guarantee-icon">✓</span>
              <span>Transparent pricing with no hidden charges</span>
            </div>
          </div>
          <div class="projects-cta guarantees-cta">
            <button class="cta-solid" @click="scrollToForm">GET A FREE QUOTE</button>
            <a :href="phoneLink" class="cta-outline-blue">CALL US: {{ phoneNumber }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section">
      <div class="faq-shell">
        <div class="faq-header">
          <p class="faq-eyebrow">Common questions about our packing and fragile item services</p>
          <h2 class="faq-title">Frequently Asked Questions</h2>
          <p class="faq-lead">
            We've answered the most common questions about our packing services to help you understand what's included and how we can help make your move easier.
          </p>
          <div class="projects-cta">
            <button class="cta-solid" @click="scrollToForm">GET A FREE QUOTE</button>
            <a :href="phoneLink" class="cta-outline-blue">CALL US: {{ phoneNumber }}</a>
          </div>
        </div>

        <div class="faq-grid">
          <div class="faq-card">
            <img src="/src/assets/svg/move.svg" alt="Box icon" class="faq-icon" />
            <div class="faq-text">
              <h3>Do you provide the packing materials?</h3>
              <p>Yes — we supply all packing materials including boxes, bubble wrap, tissue paper, wardrobe cartons and tape. Everything is included in our packing service quote.</p>
            </div>
          </div>
          <div class="faq-card">
            <img src="/src/assets/svg/keys.svg" alt="Keys icon" class="faq-icon" />
            <div class="faq-text">
              <h3>Can you move a piano or other heavy fragile items?</h3>
              <p>Absolutely. We have specialist equipment and trained staff for moving pianos, antiques, artwork and other heavy or delicate items safely.</p>
            </div>
          </div>
          <div class="faq-card">
            <img src="/src/assets/svg/sheed.svg" alt="Shield icon" class="faq-icon" />
            <div class="faq-text">
              <h3>How do you handle fragile items?</h3>
              <p>Each fragile item is individually wrapped using bubble wrap, tissue paper and custom padding. We use clearly labelled "fragile" boxes and ensure careful loading.</p>
            </div>
          </div>
          <div class="faq-card">
            <img src="/src/assets/svg/request.svg" alt="Calendar icon" class="faq-icon" />
            <div class="faq-text">
              <h3>How much does a packing service cost?</h3>
              <p>Costs depend on the volume of items and level of service required. We offer free, no-obligation quotes — contact us with your details for an accurate price.</p>
            </div>
          </div>
          <div class="faq-card">
            <img src="/src/assets/svg/recycle.svg" alt="Recycle icon" class="faq-icon" />
            <div class="faq-text">
              <h3>Do I need to pack anything myself?</h3>
              <p>Not at all — we offer a full packing service where our team handles everything. Alternatively, choose partial packing if you prefer to pack some items yourself.</p>
            </div>
          </div>
          <div class="faq-card">
            <img src="/src/assets/svg/moon.svg" alt="Clock icon" class="faq-icon" />
            <div class="faq-text">
              <h3>How long does the packing take?</h3>
              <p>A typical 3-bedroom house takes around half a day to pack fully. Larger homes or those with many fragile items may take a full day. We can pack the day before or on moving day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="final-cta">
      <div class="final-overlay"></div>
      <div class="final-shell">
        <h2>Ready To Get Your Packing Sorted?</h2>
        <p>Get a free, no-obligation quote today and let AMB Removals handle your packing professionally and carefully.</p>
        <div class="projects-cta">
          <button class="cta-solid" @click="scrollToForm">GET A FREE QUOTE</button>
          <a :href="phoneLink" class="cta-outline-white">CALL US: {{ phoneNumber }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing-page {
  width: 100%;
  color: #1f1f1f;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  background: #f6f7fb;
  overflow-x: hidden;
}

.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: #1f1f1f;
}

.section-header p {
  margin: 0;
  color: #606060;
  font-size: 0.95rem;
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
  color: #ffffff;
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
  background: #ffffff;
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
  background: #ffffff;
  margin: 6px 0 4px;
}

.hero p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #ffffff;
  font-weight: 800;
  max-width: 580px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 8px;
}

.cta-phone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #1f7bc9;
  color: #ffffff;
  text-decoration: none;
  padding: 14px 18px;
  border-radius: 6px;
  font-weight: 800;
  letter-spacing: 0.2px;
  min-width: 240px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  text-transform: uppercase;
  font-size: 1.05rem;
}

.cta-phone:hover {
  background: #1966a8;
}

.btn-primary {
  background: #1f7bc9;
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1966a8;
}

.form-card {
  margin-top: 12vh;
  background: #ffffff;
  border-radius: 10px;
  padding: 18px 18px 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.form-card h3 {
  margin: 0 0 8px;
  font-size: 1.15rem;
  font-weight: 700;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

:deep(.el-form-item) {
  margin-bottom: 12px;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

:deep(.el-input__wrapper),
:deep(.el-textarea__inner) {
  background: rgba(0, 0, 0, 0.09);
  border-radius: 6px;
}

:deep(.el-input__wrapper) {
  padding: 10px 12px;
}

:deep(.el-input__inner::placeholder) {
  color: #9ca3af;
}

.submit-button {
  width: 100%;
  justify-content: center;
}

.exceptional-service {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 24px 50px;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
}

.exceptional-shell {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 60px;
  width: 100%;
  max-width: 1080px;
}

.exceptional-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  max-width: 510px;
  width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.exceptional-eyebrow {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: #666666;
  font-weight: 400;
}

.exceptional-title {
  margin: 0;
  font-size: 38px;
  line-height: 42px;
  font-weight: 700;
  color: #c9a24a;
  text-transform: capitalize;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.exceptional-lead {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: #666666;
  max-width: 508px;
}

.exceptional-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 0 10px;
  width: 100%;
}

.exceptional-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
}

.item-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #c9a24a;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 20px;
  font-weight: 700;
  flex: none;
}

.item-text {
  min-width: 0;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.item-text h4 {
  margin: 0 0 4px;
  font-size: 18px;
  line-height: 18px;
  color: #333333;
  font-weight: 700;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.item-text p {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: #666666;
}

.exceptional-cta {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  flex-wrap: wrap;
  width: 100%;
}

.cta-solid {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 19px;
  background: #2c7cc9;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: 0.2px;
  cursor: pointer;
  white-space: nowrap;
  max-width: 100%;
}

.cta-solid:hover {
  background: #2466a5;
}

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
  line-height: 20px;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-decoration: none;
  white-space: nowrap;
  max-width: 88%;
}

.cta-outline-blue:hover {
  background: #e6f0fb;
}

.exceptional-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 510px;
  max-width: 100%;
  height: 617px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
}

.reviews-carousel-container {
  width: 100%;
  max-width: 1080px;
  margin-top: 60px;
}

.tile {
  position: relative;
  width: 100%;
  height: 100%;
}

.tile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tile-dark {
  background: #545c64;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
  box-sizing: border-box;
  overflow: hidden;
}

.tile-text {
  color: #ffffff;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

.projects-section {
  background: rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  padding: 100px 24px;
}

.projects-shell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  max-width: 1080px;
  width: 100%;
}

.projects-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 800px;
  text-align: center;
}

.projects-eyebrow {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #000000;
}

.projects-title {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 38px;
  line-height: 42px;
  text-transform: capitalize;
  color: #c9a24a;
}

.projects-lead {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;
  color: #666666;
  max-width: 800px;
}

.projects-cta {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  padding-top: 20px;
  flex-wrap: wrap;
  width: 100%;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
  width: 100%;
}

.project-card {
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.08);
}

.project-card img {
  width: 100%;
  height: 334px;
  object-fit: cover;
}

.project-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 24px;
}

.project-body h3 {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 21px;
  line-height: 21px;
  color: #00334a;
}

.project-body p {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  color: #777777;
}

.steps-section {
  background: #ffffff;
  padding: 81px 24px;
}

.steps-shell {
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: 1180px;
  margin: 0 auto;
}

.steps-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.steps-eyebrow {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #666666;
}

.steps-title {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 38px;
  line-height: 42px;
  text-transform: capitalize;
  color: #c9a24a;
}

.steps-lead {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;
  color: #777777;
  max-width: 790px;
  text-align: center;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 15px;
  row-gap: 60px;
  width: 100%;
}

.step-card {
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start;
  height: auto;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.08);
}

.step-icon-img {
  width: 65px;
  height: 65px;
  object-fit: contain;
  flex-shrink: 0;
  margin: 0 auto;
}

.step-icon-img1 {
  width: 100px;
  height: 100px;
  object-fit: contain;
  flex-shrink: 0;
  margin: -12px auto;
  margin-bottom: -22px;
}

.step-text h3 {
  margin: 0 0 8px;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  color: #333333;
}

.step-text p {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #686868;
}

.guarantees-section {
  background: rgba(0, 0, 0, 0.04);
  padding: 100px 24px;
  display: flex;
  justify-content: center;
}

.guarantees-shell {
  display: flex;
  flex-direction: row;
  gap: 60px;
  max-width: 1080px;
  width: 100%;
  align-items: flex-start;
}

.guarantees-image img {
  width: 510px;
  max-width: 100%;
  height: 539px;
  object-fit: cover;
  border-radius: 5px;
}

.guarantees-copy {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 510px;
}

.guarantees-eyebrow {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #666666;
}

.guarantees-title {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 38px;
  line-height: 42px;
  text-transform: capitalize;
  color: #c9a24a;
}

.guarantees-lead {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;
  color: #777777;
}

.guarantees-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 0 10px;
}

.guarantee-row {
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #666666;
}

.guarantee-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #c9a24a;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 20px;
}

.guarantees-cta {
  margin-top: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
}

.faq-section {
  background: #ffffff;
  padding: 100px 24px;
}

.faq-shell {
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
  text-align: center;
}

.faq-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: 800px;
}

.faq-eyebrow {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #666666;
}

.faq-title {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 38px;
  line-height: 42px;
  text-transform: capitalize;
  color: #c9a24a;
}

.faq-lead {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;
  color: #777777;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
  width: 100%;
}

.faq-card {
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.08);
}

.faq-icon {
  width: 65px;
  height: 65px;
  object-fit: contain;
  border-radius: 50%;
  padding: 10px;
}

.faq-text h3 {
  margin: 0 0 8px;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
}

.faq-text p {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #686868;
}

.final-cta {
  position: relative;
  background: url('/AMB_Removals.jpg') center/cover no-repeat;
  padding: 81px 24px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.final-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.final-shell {
  position: relative;
  max-width: 1080px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
}

.final-shell h2 {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 36px;
  line-height: 40px;
  font-weight: 700;
  text-transform: capitalize;
}

.final-shell p {
  margin: 0;
  font-family: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 27px;
  font-weight: 400;
  color: #ffffff;
}

.cta-outline-white {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 19px;
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 5px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-decoration: none;
  white-space: nowrap;
  max-width: 88%;
}

.cta-outline-white:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 960px) {
  .hero {
    justify-content: center;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    justify-items: center;
  }

  .hero-copy {
    padding-top: 100px;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    text-align: center;
    align-items: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .form-card {
    width: 100%;
    max-width: 100%;
    margin-top: 20px;
  }

  .intro-content,
  .cards-grid,
  .steps-grid,
  .guarantees-shell,
  .faq-layout {
    grid-template-columns: 1fr;
  }

  .projects-shell {
    gap: 40px;
  }

  .projects-cta {
    flex-direction: column;
    width: 100%;
  }

  .projects-cta .cta-solid,
  .projects-cta .cta-outline-blue,
  .projects-cta .cta-outline-white,
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .steps-shell {
    gap: 40px;
  }

  .steps-grid {
    grid-template-columns: 1fr;
  }

  .step-card {
    height: auto;
    align-items: flex-start;
  }

  .exceptional-service {
    padding: 60px 16px 40px;
  }

  .exceptional-shell {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }

  .exceptional-copy {
    max-width: 100%;
    width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .exceptional-title {
    font-size: 28px;
    line-height: 32px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
  }

  .exceptional-lead {
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .exceptional-item {
    gap: 12px;
  }

  .item-text {
    min-width: 0;
    flex: 1;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .item-text h4 {
    font-size: 16px;
    line-height: 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .item-text p {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .exceptional-cta {
    flex-direction: column;
    width: 100%;
  }

  .cta-solid,
  .cta-outline-blue,
  .cta-outline-white {
    width: 100%;
    min-width: 0;
  }

  .exceptional-grid {
    width: 100%;
    height: auto;
    grid-auto-rows: 260px;
  }

  .tile-dark {
    padding: 20px;
  }

  .tile-text {
    font-size: 20px;
    line-height: 26px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .hero {
    padding-top: 60px;
  }

  .hero h1 {
    font-size: 2.2rem;
  }

  .intro-text h2 {
    font-size: 1.2rem;
  }

  .cards-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 22px 14px 32px;
    justify-content: center;
  }

  .hero-inner {
    gap: 16px;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    justify-items: center;
  }

  .hero-copy {
    width: 100%;
    max-width: 100%;
    text-align: center;
    align-items: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .form-card {
    width: 100%;
    max-width: 100%;
    margin-top: 20px;
  }

  .steps-grid {
    grid-template-columns: 1fr;
  }

  .steps-title {
    font-size: 30px;
    line-height: 34px;
    text-align: left;
    width: 100%;
  }

  .steps-lead {
    text-align: left;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .guarantees-shell {
    flex-direction: column;
    gap: 30px;
  }

  .guarantees-image img {
    width: 100%;
    height: auto;
  }

  .exceptional-service {
    padding: 40px 14px 30px;
  }

  .exceptional-title {
    font-size: 24px;
    line-height: 28px;
  }

  .exceptional-eyebrow {
    font-size: 13px;
    line-height: 20px;
  }

  .exceptional-lead {
    font-size: 13px;
    line-height: 20px;
  }

  .item-text h4 {
    font-size: 15px;
    line-height: 18px;
  }

  .item-text p {
    font-size: 13px;
    line-height: 20px;
  }

  .exceptional-grid {
    grid-template-columns: 1fr;
  }

  .tile-dark {
    padding: 16px;
  }

  .tile-text {
    font-size: 18px;
    line-height: 24px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }

  .final-cta {
    text-align: left;
  }
}

@media (max-width: 960px) {
  .faq-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
