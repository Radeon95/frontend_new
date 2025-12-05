<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Van, OfficeBuilding, Box } from '@element-plus/icons-vue';

const router = useRouter();

const goToServices = () => {
  router.push('/services');
};
</script>

<template>
  <!-- Наши услуги -->
  <div class="section services-section">
    <h2 class="section-title">Our services</h2>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" v-for="(_, index) in 3" :key="index">
        <el-card class="service-card">
          <el-icon v-if="index === 0"><Van /></el-icon>
          <el-icon v-else-if="index === 1"><OfficeBuilding /></el-icon>
          <el-icon v-else-if="index === 2"><Box /></el-icon>

          <h3 class="service-title" v-if="index === 0">House Moving Services</h3>
          <h3 class="service-title" v-else-if="index === 1">Office Moving</h3>
          <h3 class="service-title" v-else-if="index === 2">Packing Services</h3>

          <div class="service-content">
            <p v-if="index === 0">
              🏠 House Removals in Leicestershire – Professional Home Moving Services Moving house
              in Leicester or the surrounding areas? Whether you're upgrading to a larger home,
              relocating to another city, or downsizing, AMB Removals is here to make your house
              move smooth, stress-free, and efficient.
            </p>
            <p v-else-if="index === 1">
              🏢 Office Removals in Leicester – Business Relocation Made Simple Relocating your
              office in Leicester or nearby areas? At AMB Removals, we understand that time is money
              — and we make sure your office move is fast, efficient, and disruption-free.
            </p>
            <p v-else-if="index === 2">
              📦 Packing Services – Professional Packing for Home & Office Moves Don't want the
              hassle of packing? Our professional packing service ensures your items are safely
              wrapped, boxed, and ready for transport — whether you're moving house or relocating
              your office.
            </p>
          </div>

          <el-button type="primary" class="read-more-btn" @click="goToServices">
            Read More
          </el-button>
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
  color: #ffffff;
}

.el-row {
  align-items: flex-start !important;
  flex-wrap: wrap !important;
  justify-content: space-evenly;
}

.service-card {
  transition: all 0.3s ease;
  height: auto !important;
  text-align: center;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  background-color: snow;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.service-card .el-icon {
  font-size: 40px;
  color: #409eff;
  margin-bottom: 15px;
}

.service-title {
  margin: 0 0 20px 0;
  color: #303133;
  font-size: 1.3rem;
}

.service-content {
  flex: 1;
  margin-bottom: 20px;
}

.service-content p {
  line-height: 1.6;
  color: #606266;
  font-size: 16px;
  text-align: justify;
}

.read-more-btn {
  margin-top: auto;
  width: 100%;
}
</style>
