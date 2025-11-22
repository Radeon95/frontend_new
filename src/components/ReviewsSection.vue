<script setup lang="ts">
// No special logic needed
</script>

<template>
  <div class="section reviews-section">
    <h2 class="section-title">Customer Reviews</h2>
    <div class="reviews-container">
      <!-- TrustBox widget - Review Collector -->
      <div class="review-widget trustpilot-container">
        <div
          class="trustpilot-widget"
          data-locale="en-GB"
          data-template-id="56278e9abfbbba0bdcd568bc"
          data-businessunit-id="67b0b4c53abf0d2eed0d6c25"
          data-style-height="52px"
          data-style-width="100%"
        >
          <a href="https://uk.trustpilot.com/review/ambremovals.com" target="_blank" rel="noopener">
            Trustpilot
          </a>
        </div>
      </div>

      <!-- Google Reviews Link -->
      <div class="review-widget google-container">
        <a
          href="https://g.co/kgs/sb1j7Y4"
          target="_blank"
          rel="noopener"
          class="google-review-button"
        >
          <div class="review-content">
            <div class="google-branding">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                class="google-logo"
                loading="lazy"
              />
            </div>
            <div class="rating">
              <span class="review-text">Rating</span>
              <div class="stars">★★★★★</div>
              <div class="score">5.0/5</div>
            </div>
            <div class="review-cta">
              Review Us on Google
              <svg class="arrow-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reviews-section {
  padding: 60px 0;
  background-color: #f9f9f9;
  text-align: center;
}

.reviews-section .section-title {
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333;
}

.reviews-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.review-widget {
  flex: 1;
  max-width: 380px;
  align-items: center;
  background: white;
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.google-branding {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: -6px;
}

.google-logo {
  height: 20px;
  width: auto;
}

.review-text {
  color: #5f6368;
  font-size: 14px;
}

.rating {
  margin-bottom: 5px;
}

.stars {
  color: #fbbc05;
  font-size: 15px;
  line-height: 1;
  letter-spacing: 1px;
}

.score {
  color: #5f6368;
  font-size: 14px;
  margin-top: 4px;
}

.review-cta {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #1a73e8;
  font-size: 14px;
  font-weight: 500;
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.google-review-button:hover .arrow-icon {
  transform: translateX(4px);
}

.trustpilot-widget {
  margin-top: 25px;
}
@media (max-width: 768px) {
  .trustpilot-widget {
    margin: 0;
    margin-top: 40px;
  }
}
</style>
