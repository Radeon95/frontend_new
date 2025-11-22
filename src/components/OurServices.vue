<script setup lang="ts">
import { ref } from 'vue';
import { Van, OfficeBuilding, Box } from '@element-plus/icons-vue';

const expandedCardIndex = ref<number | null>(null);
function toggleCard(index: number) {
  expandedCardIndex.value = expandedCardIndex.value === index ? null : index;
}
</script>

<template>
  <!-- Наши услуги -->
  <div class="section services-section">
    <h2 class="section-title">Our services</h2>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" v-for="(_, index) in 3" :key="index">
        <el-card
          class="service-card"
          role="button"
          tabindex="0"
          :aria-label="`Toggle service card: ${
            index === 0 ? 'House' : index === 1 ? 'Office' : 'Packing'
          }`"
          :aria-expanded="expandedCardIndex === index"
          @keyup.enter="toggleCard(index)"
          @click="toggleCard(index)"
          :class="{ expanded: expandedCardIndex === index }"
        >
          <el-icon v-if="index === 0"><Van /></el-icon>
          <el-icon v-else-if="index === 1"><OfficeBuilding /></el-icon>
          <el-icon v-else-if="index === 2"><Box /></el-icon>

          <h3 class="service-title" v-if="index === 0">House Moving Services</h3>
          <h3 class="service-title" v-else-if="index === 1">Office Moving</h3>
          <h3 class="service-title" v-else-if="index === 2">Packing Services</h3>

          <div :class="{ 'clamped-text': expandedCardIndex !== index }">
            <div v-if="index === 0">
              <p>
                🏠 House Removals in Leicestershire – Professional Home Moving Services Moving house
                in Leicester or the surrounding areas? Whether you’re upgrading to a larger home,
                relocating to another city, or downsizing, AMB Removals is here to make your house
                move smooth, stress-free, and efficient.
              </p>
              <p>
                As a trusted Leicester removals company, we specialise in residential moving
                services tailored to your exact needs. With years of experience, a reliable team,
                and great customer feedback, we take care of everything — so you don’t have to.
              </p>

              <h4>
                ✅ What’s Included in Our House Moving Service We provide everything you need for a
                successful home move:
              </h4>

              <ul>
                <li>📦 Fully trained and friendly movers with experience in house removals</li>
                <li>🛠 Disassembly and reassembly of furniture — beds, wardrobes, tables</li>
                <li>📅 Flexible scheduling to suit your timeline</li>
                <li>🔒 Secure packing using high-quality materials</li>
                <li>💬 Clear, upfront pricing with no hidden charges</li>
              </ul>
              <p>
                Whether you’re moving across Leicester or to another part of the UK, your belongings
                are safe in our hands.
              </p>
              <p>
                📞 Ready to Move? Let AMB Removals take the stress out of moving day. We’re proud to
                be one of the top-rated house removal companies in Leicester, known for care, speed,
                and customer satisfaction.
              </p>
              <p>👉 Get your FREE moving quote today – fast, friendly, and no obligation.</p>
            </div>

            <div v-else-if="index === 1">
              <p>
                🏢 Office Removals in Leicester – Business Relocation Made Simple Relocating your
                office in Leicester or nearby areas? At AMB Removals, we understand that time is
                money — and we make sure your office move is fast, efficient, and disruption-free.
              </p>
              <p>
                Whether you're a small business upgrading to a larger space or a company moving
                departments across the city, our professional office movers handle everything with
                minimal downtime.
              </p>
              <h4>✅ Our Office Moving Services Include:</h4>
              <ul>
                <li>📦 Packing and labelling of office equipment, files, and electronics</li>
                <li>🛠 Furniture disassembly and reassembly (desks, chairs, cabinets)</li>
                <li>👨‍💼 Coordination with building managers and out-of-hours moves</li>
                <li>🔐 Secure transport with GPS-tracked vehicles</li>
                <li>🧹 Optional post-move cleanup and waste disposal</li>
              </ul>
              <p>
                We serve businesses across Leicester, Loughborough, Hinckley, Wigston, and the wider
                East Midlands.
              </p>
              <p>
                📞 Book Your Office Move Today Keep your team focused — and let us handle the
                logistics. Contact AMB Removals for a free quote and expert advice on your upcoming
                business relocation.
              </p>
            </div>

            <div v-else-if="index === 2">
              <p>
                📦 Packing Services – Professional Packing for Home & Office Moves Don’t want the
                hassle of packing? Our professional packing service ensures your items are safely
                wrapped, boxed, and ready for transport — whether you’re moving house or relocating
                your office.
              </p>
              <h4>✅ What’s Included in Our Packing Services:</h4>
              <ul>
                <li>🧰 High-quality materials: boxes, bubble wrap, tape, wardrobe cartons</li>
                <li>👷‍♂️ Experienced packers trained to handle fragile or valuable items</li>
                <li>🗂 Labelling for organised unpacking at destination</li>
                <li>⏱️ Full or partial packing options – tailored to your needs</li>
                <li>🔐 Optional unpacking and setup service at your new location</li>
              </ul>
              <p>From kitchenware and books to monitors and printers, we pack it all with care.</p>
              <p>
                🚚 Book Your Packing Service Now Save time, reduce stress, and avoid damage. Let AMB
                Removals take care of the packing so you can focus on settling in.
              </p>
              <p>
                👉 Contact us today for a free quote or to combine packing with your removal
                service.
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
/* === Our Services Section === */
.services-section {
  background: linear-gradient(0deg, #818181, #0a376feb);
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  color: #303133;
}

.el-row {
  align-items: flex-start !important;
  flex-wrap: wrap !important;
  justify-content: space-evenly;
}

.service-card {
  cursor: pointer;
  transition: all 0.8s ease;
  overflow: hidden;
  height: auto !important;
  text-align: center;
  margin-top: 12px;
  max-height: 13em; /* collapsed state */
  line-height: 1.5em;
  font-size: 16px;
  position: relative;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card .el-icon {
  font-size: 40px;
  color: #409eff;
  margin-bottom: 15px;
}

/* Show more text when expanded */
.service-card.expanded {
  max-height: 1500px;
  padding-bottom: 10px;
}

.service-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5em;
  background: linear-gradient(to bottom, rgba(245, 247, 250, 0), #f5f7fa);
  transition: opacity 0.3s ease;
  opacity: 1;
  pointer-events: none;
}

.service-card.expanded::after {
  opacity: 0;
}
</style>
