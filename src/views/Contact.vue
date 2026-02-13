<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import stickyButtons from '../components/stickyButtons.vue';

const router = useRouter();
const isSubmitting = ref(false);
const recaptchaToken = ref('');

// Объявляем типы для глобального объекта window
declare global {
  interface Window {
    onRecaptchaVerify: (token: string) => void;
    onRecaptchaExpired: () => void;
  }
}

const formRef = ref<FormInstance>();
const form = reactive({
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
  agreement: false,
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please enter your name', trigger: 'blur' },
    { min: 2, message: 'Name must be at least 2 characters', trigger: 'blur' },
  ],
  phone: [
    {
      required: true,
      message: 'Please enter your phone number',
      trigger: 'blur',
    },
    {
      pattern: /^(\+44|0)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$/,
      message: 'Please enter a valid phone number',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
  ],
  service: [{ required: true, message: 'Please select a service', trigger: 'change' }],
  message: [
    { required: true, message: 'Please enter a message', trigger: 'blur' },
    {
      min: 10,
      message: 'Message must be at least 10 characters',
      trigger: 'blur',
    },
  ],
  agreement: [
    {
      type: 'boolean',
      required: true,
      message: 'You must agree to the terms',
      trigger: 'change',
    },
  ],
});

const serviceOptions = [
  { value: 'apartment', label: 'Residential Moving' },
  { value: 'office', label: 'Office Moving' },
  { value: 'packing', label: 'Packing Services' },
  { value: 'other', label: 'Other' },
];

// Load reCAPTCHA script with a Promise-based helper
const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[src="https://www.google.com/recaptcha/api.js"]'
    );
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
    document.head.appendChild(script);
  });
};

onMounted(async () => {
  try {
    await loadRecaptchaScript();

    // Set reCAPTCHA callbacks after script loads
    window.onRecaptchaVerify = (token: string) => {
      recaptchaToken.value = token;
    };

    window.onRecaptchaExpired = () => {
      recaptchaToken.value = '';
    };
  } catch (error) {
    console.error('reCAPTCHA failed to load:', error);
  }
});

// Submit form function
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  try {
    isSubmitting.value = true;
    // Validate form
    const valid = await formEl.validate();
    if (valid) {
      // Check if reCAPTCHA is verified
      if (!recaptchaToken.value) {
        await new Promise(resolve => setTimeout(resolve, 400)); // adjust timing if needed
      }

      // Re-check token after brief wait
      if (!recaptchaToken.value) {
        ElMessage({
          message: 'Please verify that you are not a robot',
          type: 'error',
        });
        return;
      }

      // Send email with form data
      await sendEmail(form);

      // Success message
      ElMessage({
        message: 'Your request has been successfully submitted! We will contact you shortly.',
        type: 'success',
      });

      // Reset the form after success
      formEl.resetFields();

      // Redirect to thank you page after a short delay
      setTimeout(() => {
        router.push('/thank-you');
      }, 1000);
    } else {
      // Error message if validation fails
      ElMessage({
        message: 'Please check the form for errors',
        type: 'error',
      });
    }
  } catch (error) {
    // Catch and log errors
    ElMessage({
      message: 'Sorry, there was an error sending your message. Please try again.',
      type: 'error',
    });
    console.error('Error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// Reset form function
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// Send email to /api/send-email endpoint
const sendEmail = async (formData: typeof form) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// SEO
import { useHead } from '@vueuse/head';

useHead({
  title: 'Contact Us | AMB Removals - Get in Touch Today',
  meta: [
    {
      name: 'description',
      content:
        'Contact AMB Removals for expert moving services in the UK. Our ambremovals team is here to help with local and nationwide removals.',
    },
    {
      name: 'keywords',
      content:
        'contact AMB Removals, ambremovals, moving company UK, removal services, office move, packing, relocation experts',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Contact AMB Removals | UK Moving Experts' },
    {
      property: 'og:description',
      content:
        'Reach out to the ambremovals team for professional relocation and removal assistance across the UK.',
    },
    { property: 'og:url', content: 'https://ambremovals.com/contact' },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:image',
      content: 'https://ambremovals.com/AMB_Removals.jpg',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://ambremovals.com/contact' }],
});
</script>

<template>
  <div class="contact-container">
    <stickyButtons />
    <!-- Banner -->
    <div class="contact-banner">
      <div class="banner-content">
        <h1>Contact Us</h1>
        <p>We are ready to answer all your questions and help with organizing your move</p>
      </div>
    </div>

    <div class="section contact-section">
      <el-row :gutter="30">
        <el-col :xs="24" :md="10">
          <div class="contact-info">
            <h2>Contact Information</h2>
            <div class="info-item">
              <el-icon><Location /></el-icon>
              <div>
                <h3>Address</h3>
                <p>Leicestershire, United Kingdom</p>
              </div>
            </div>
            <div class="info-item">
              <el-icon><Phone /></el-icon>
              <div>
                <h3>Phone</h3>
                <p>0 (116) 456-0653</p>
                <p>+44 (785) 345-1275</p>
              </div>
            </div>
            <div class="info-item">
              <el-icon><Message /></el-icon>
              <div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:info@ambremovals.com"> info@ambremovals.com</a>
                </p>
                <p>
                  <a href="mailto:support@ambremovals.com">support@ambremovals.com</a>
                </p>
                <p>
                  <a href="mailto:sales@ambremovals.com">sales@ambremovals.com</a>
                </p>
              </div>
            </div>
            <div class="info-item">
              <el-icon><Clock /></el-icon>
              <div>
                <h3>Working Hours</h3>
                <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                <p>Sat-Sun: 8:00 AM - 4:00 PM</p>
              </div>
            </div>
            <div class="social-links">
              <h3>Follow Us</h3>
              <div class="social-icons">
                <el-button circle>
                  <a
                    href="https://www.facebook.com/ambremovalslimited"
                    title="Facebook"
                    target="_blank"
                    class="social-icons"
                  >
                    <i class="fab fa-facebook-f"></i></a
                ></el-button>
                <el-button circle>
                  <a
                    href="https://www.instagram.com/ambremovals/"
                    target="_blank"
                    title="Instagram"
                    class="social-icons"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                </el-button>
                <el-button circle>
                  <a
                    href="https://t.me/ambremovals"
                    title="Telegram"
                    target="_blank"
                    class="social-icons"
                    ><i class="fab fa-telegram-plane"></i></a
                ></el-button>
                <el-button circle
                  ><a
                    href="https://wa.me/message/CHLGJLYSNVZLE1"
                    title="WatsApp"
                    target="_blank"
                    class="social-icons"
                  >
                    <i class="fab fa-whatsapp"></i
                  ></a>
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :md="14">
          <div class="contact-form">
            <h2>Submit a Request</h2>
            <p>Fill out the form below, and we will contact you shortly</p>
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="top"
              require-asterisk-position="right"
            >
              <el-form-item label="Your Name" prop="name">
                <el-input v-model="form.name" placeholder="Enter your name"></el-input>
              </el-form-item>
              <el-form-item label="Phone" prop="phone">
                <el-input v-model="form.phone" placeholder="+44 (___) ___-____"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input v-model="form.email" placeholder="example@email.com"></el-input>
              </el-form-item>
              <el-form-item label="Select Service" prop="service">
                <el-select
                  v-model="form.service"
                  placeholder="Select a service"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in serviceOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Message" prop="message">
                <el-input
                  v-model="form.message"
                  type="textarea"
                  :rows="4"
                  placeholder="Describe your request in detail"
                ></el-input>
              </el-form-item>
              <el-form-item prop="agreement">
                <el-checkbox v-model="form.agreement">
                  I agree to the processing of personal data
                </el-checkbox>
              </el-form-item>
              <el-form-item>
                <div
                  class="g-recaptcha"
                  data-sitekey="6Ley_t8qAAAAAMEC_NXvJ_fTDtZp1yxtD-spbLVa"
                  data-callback="onRecaptchaVerify"
                  data-expired-callback="onRecaptchaExpired"
                ></div>
                <div class="recaptcha-note"></div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  :loading="isSubmitting"
                  :disabled="isSubmitting"
                  @click="submitForm(formRef)"
                >
                  Submit Request
                </el-button>
                <el-button @click="resetForm(formRef)">Reset</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Map -->
    <!-- <div class="map-section">
      <h2 class="section-title">Find Us on the Map</h2>
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d268442.914637112!2d-1.614417196211072!3d52.53376236482253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d4ae70306a7fed%3A0xbfcfb2d2858c6b73!2sAMB%20Removals%20Limited!5e0!3m2!1sen!2s!4v1740991540006!5m2!1sen!2s"
          width="1200"
          height="600"
          style="border: 0"
          allowfullscreen="false"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div> -->

    <!-- FAQ -->
    <div class="section faq-section">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <el-collapse>
        <el-collapse-item title="How quickly can you organize a move?" name="1">
          <p>
            Depending on the complexity and volume of work, we can organize a move within 1-3 days
            from the order confirmation.
          </p>
        </el-collapse-item>
        <el-collapse-item title="Do you work on weekends and holidays?" name="2">
          <p>
            Yes, we work without days off, including holidays. However, a surcharge may apply on
            holidays.
          </p>
        </el-collapse-item>
        <el-collapse-item title="Do you provide guarantees for your services?" name="3">
          <p>
            Yes, we provide guarantees for all our services. In case of damage to items during the
            move, we compensate for the damage according to the contract.
          </p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
  <div style="position: absolute; left: -9999px; top: -9999px" aria-hidden="true">
    AMB Removals - ambremovals contact and support information
  </div>
</template>

<style scoped>
.contact-container {
  width: 100%;
}

.contact-banner {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80');
  background-size: cover;
  background-position: center;
  height: 60vh;
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

.contact-section {
  padding-top: 80px;
}

.contact-info {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  height: 100%;
}

.contact-info h2 {
  margin-top: 0;
  margin-bottom: 30px;
  color: #303133;
}

.info-item {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.info-item .el-icon {
  font-size: 24px;
  color: #409eff;
  margin-right: 15px;
  margin-top: 5px;
}

.info-item h3 {
  margin: 0 0 5px 0;
  color: #303133;
}

.info-item p {
  margin: 0 0 5px 0;
  color: #606266;
}

.social-links {
  margin-top: 30px;
}

.social-links h3 {
  margin-bottom: 15px;
  color: #303133;
}

.social-icons {
  display: flex;
  gap: 10px;
  color: #606266;
  font-size: 1.2rem;
}

.contact-form {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  height: 100%;
}

.contact-form h2 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #303133;
}

.contact-form p {
  margin-bottom: 30px;
  color: #606266;
}

.map-section {
  padding: 0 0 60px 0;
}

.map-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
}

.faq-section {
  background-color: #f5f7fa;
}

.recaptcha-note {
  font-size: 0.85rem;
  color: #606266;
  margin-top: 5px;
}

.g-recaptcha {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .contact-banner {
    height: 50vh;
  }

  .banner-content h1 {
    font-size: 2rem;
  }

  .section {
    padding: 40px 20px;
  }

  .contact-info {
    margin-bottom: 30px;
  }
}
@media (min-width: 768px) {
  .faq-section ::v-deep(.el-collapse-item__header) {
    font-size: 22px; /* Adjust the value as needed */
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .faq-section ::v-deep(.el-collapse-item__content) {
    font-size: 19px; /* Optional: for answer text */
  }
}
</style>
