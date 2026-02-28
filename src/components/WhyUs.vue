<script setup lang="ts">
const emit = defineEmits(['open-quote']);
</script>

<template>
  <div class="section why-us-section">
    <h2 class="section-title">Why Choose a Fully Insured & Accredited Company?</h2>
    <div class="insurance-content" data-aos="fade-up">
      <p class="headline" data-aos="fade-up">
        ✅
        <strong>
          Fully Insured &amp; Accredited Removals Company Serving the Midlands
        </strong>
      </p>
      <p data-aos="fade-up">
        At AMB Removals, we know how important it is to choose a reliable moving company —
        especially when you’re trusting someone with your home and belongings...
      </p>

      <h3 data-aos="fade-up">🛡️ Trusted Removals You Can Rely On</h3>
      <p>Whether you're moving across town or relocating to another city, your belongings are in safe hands...</p>

      <ul data-aos="fade-up">
        <li>🛠️ Public Liability Insurance</li>
        <li>📦 Goods in Transit Insurance</li>
      </ul>

      <h3>🎖️ Industry-Recognised Accreditation</h3>
      <ul>
        <li>👷 Trained and uniformed staff</li>
        <li>✅ Compliant with industry standards</li>
        <li>💬 Friendly, reliable customer support</li>
      </ul>

      <h3>🔒 Why Insurance and Accreditation Matter</h3>
      <ul>
        <li>✅ Peace of mind during the entire move</li>
        <li>📋 Professional handling of all items</li>
        <li>⚖️ Compliance with safety regulations</li>
        <li>🚚 Fast, secure and efficient service</li>
      </ul>

      <h3>📞 Ready to Move?</h3>
      <p>
        Looking for a trusted removals company in your area?<br />
        📲 Contact AMB Removals today for a free quote and move with peace of mind. We serve Leicester, Nottingham, Derby, Coventry, Northampton and beyond.
      </p>
    </div>

    <el-button class="quote-section" type="primary" size="large" @click="emit('open-quote')">
      GET FREE QUOTE
    </el-button>
  </div>
</template>

<style scoped>
.section-title {
  text-align: center;
  margin-bottom: 40px;
  color: #ffffff;
}
.why-us-section {
  background: linear-gradient(365deg, #0a376fa1, #818181);
  text-align: center;
  padding: 40px 20px;
  overflow: hidden;
}

.insurance-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  padding: 1rem;
  font-size: 16px;
  line-height: 1.7;
  color: #fffcfc;
}

.insurance-content .headline {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.insurance-content h3 {
  font-size: 1.15rem;
  margin-top: 1.5rem;
  color: #0a376f;
}

.insurance-content ul {
  margin: 0.5rem 0 1.5rem 1.2rem;
  padding-left: 1rem;
  list-style: none;
}

.insurance-content ul li {
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.2rem;
}

.insurance-content ul li::before {
  content: '✔️';
  position: absolute;
  left: 0;
  top: 0;
}
.quote-section {
  margin-top: 2rem;
  font-size: 20px;
}
</style>
