<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useRouter } from 'vue-router';


const router = useRouter();

useHead({
  title: 'Thank You | AMB Removals',
  meta: [
    {
      name: 'description',
      content:
        'Thank you for contacting AMB Removals. We have received your request and will contact you shortly.',
    },
    {
      name: 'keywords',
      content: 'AMB Removals, thank you, quote submitted, contact confirmation',
    },
    { name: 'robots', content: 'noindex, follow' },
  ],
});

const goHome = () => {
  router.push('/');
};

const goToQuote = () => {
  router.push('/quote');
};
</script>

<template>
  <div class="thank-you-container">
    <div class="thank-you-hero">
      <div class="hero-overlay"></div>
      <div class="thank-you-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h1 class="thank-you-title">Thank You!</h1>
        <p class="thank-you-subtitle">
          We've received your request and appreciate you choosing AMB Removals
        </p>
        <div class="thank-you-message">
          <p>
            Our team will review your information and get back to you as soon as possible, usually
            within 24 hours.
          </p>
          <p>
            If you have any urgent questions, please don't hesitate to call us at
            <a href="tel:01164560653" class="phone-link">0 (116) 456-0653</a>
          </p>
        </div>
        <div class="thank-you-actions">
          <el-button type="primary" size="large" @click="goHome">Return to Home</el-button>
          <el-button type="default" size="large" @click="goToQuote">Request Another Quote</el-button>
        </div>
        <div class="next-steps">
          <h3>What happens next?</h3>
          <div class="steps-list">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Review</h4>
                <p>We'll review your moving requirements</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Contact</h4>
                <p>Our team will contact you to discuss details</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Quote</h4>
                <p>You'll receive a personalized quote</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.thank-you-container {

  width: 100%;
  min-height: calc(100vh - 120px);
}

.thank-you-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/AMB_Removals.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 120px 20px 60px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(84, 92, 100, 0.85) 0%,
    rgba(10, 7, 176, 0.75) 100%
  );
  z-index: 0;
}

.thank-you-content {
  margin-top: 2rem;
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  margin-bottom: 30px;
  animation: scaleIn 0.5s ease-out 0.2s both;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.success-icon i {
  font-size: 100px;
  color: #67c23a;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.thank-you-title {
  font-size: 3rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 20px;
  font-family: 'Inter', sans-serif;
}

.thank-you-subtitle {
  font-size: 1.5rem;
  color: #606266;
  margin-bottom: 30px;
  font-weight: 500;
}

.thank-you-message {
  margin: 40px 0;
  padding: 30px;
  background-color: #f5f7fa;
  border-radius: 12px;
  text-align: left;
}

.thank-you-message p {
  font-size: 1.1rem;
  color: #606266;
  line-height: 1.8;
  margin-bottom: 15px;
}

.thank-you-message p:last-child {
  margin-bottom: 0;
}

.phone-link {
  color: #409eff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.phone-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.thank-you-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 40px 0;
  flex-wrap: wrap;
}

.thank-you-actions .el-button {
  padding: 15px 40px;
  font-size: 1.1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.thank-you-actions .el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}

.thank-you-actions .el-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
}

.next-steps {
  margin-top: 50px;
  padding-top: 40px;
  border-top: 2px solid #ebeef5;
}

.next-steps h3 {
  font-size: 1.8rem;
  color: #303133;
  margin-bottom: 30px;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
  text-align: left;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  border-left: 4px solid #409eff;
  transition: all 0.3s ease;
}

.step-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.step-number {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.step-content h4 {
  font-size: 1.3rem;
  color: #303133;
  margin-bottom: 8px;
}

.step-content p {
  font-size: 1rem;
  color: #606266;
  margin: 0;
}

@media (max-width: 768px) {
  .thank-you-hero {
    padding: 100px 15px 40px;
    min-height: auto;
  }

  .thank-you-content {
    padding: 40px 25px;
    border-radius: 15px;
  }

  .success-icon i {
    font-size: 80px;
  }

  .thank-you-title {
    font-size: 2.2rem;
  }

  .thank-you-subtitle {
    font-size: 1.2rem;
  }

  .thank-you-message {
    padding: 20px;
  }

  .thank-you-message p {
    font-size: 1rem;
  }

  .thank-you-actions {
    flex-direction: column;
    width: 100%;
  }

  .thank-you-actions .el-button {
    width: 100%;
  }

  .next-steps h3 {
    font-size: 1.5rem;
  }

  .step-item {
    padding: 15px;
  }

  .step-number {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .step-content h4 {
    font-size: 1.1rem;
  }

  .step-content p {
    font-size: 0.95rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .thank-you-content {
    padding: 50px 35px;
  }

  .thank-you-title {
    font-size: 2.5rem;
  }
}
</style>
