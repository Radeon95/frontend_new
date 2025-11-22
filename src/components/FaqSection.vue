<template>
  <div class="section faq-section">
    <h2 class="section-title">Frequently Asked Questions</h2>
    <el-collapse>
      <el-collapse-item title="How quickly can you organize a move?" name="1">
        <p role="region" aria-live="polite">
          Depending on the complexity and volume of work, we can organize a move within 1–3 days
          from the order confirmation.
        </p>
      </el-collapse-item>
      <el-collapse-item title="Do you work on weekends and holidays?" name="2">
        <p role="region" aria-live="polite">
          Yes, we work without days off, including holidays. However, a surcharge may apply on
          holidays.
        </p>
      </el-collapse-item>
      <el-collapse-item title="Do you provide guarantees for your services?" name="3">
        <p role="region" aria-live="polite">
          Yes, we provide guarantees for all our services. In case of damage to items during the
          move, we compensate for the damage according to the contract.
        </p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.faq-section {
  background-color: white;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  color: #303133;
}

@media (min-width: 768px) {
  ::v-deep(.el-collapse-item__header) {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  ::v-deep(.el-collapse-item__content) {
    font-size: 19px;
  }
}
::v-deep(.el-collapse-item__content) {
  transition: all 0.3s ease-in-out;
}
</style>
