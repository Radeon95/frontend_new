<script setup lang="ts">
import { ref, onMounted } from 'vue';

const faqs = [
  {
    question: 'How quickly can you organize a move?',
    answer:
      'Depending on the complexity and volume of work, we can organize a move within 1–3 days from the order confirmation.',
  },
  {
    question: 'Do you work on weekends and holidays?',
    answer:
      'Yes, we work without days off, including holidays. However, a surcharge may apply on holidays.',
  },
  {
    question: 'Do you provide guarantees for your services?',
    answer:
      'Yes, we provide guarantees for all our services. In case of damage to items during the move, we compensate for the damage according to the contract.',
  },
];

const openIndex = ref<number | null>(null);
const hydrated = ref(false);

onMounted(() => {
  hydrated.value = true;
});

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <div class="section faq-section">
    <h2 class="section-title">Frequently Asked Questions</h2>
    <div class="faq-list">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <button
          class="faq-question"
          :aria-expanded="!hydrated || openIndex === index"
          :aria-controls="`faq-answer-${index}`"
          @click="toggle(index)"
        >
          <span>{{ faq.question }}</span>
          <i
            class="faq-arrow"
            :class="{ 'is-open': openIndex === index }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="14" height="14">
              <path
                fill="currentColor"
                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
              />
            </svg>
          </i>
        </button>
        <div
          :id="`faq-answer-${index}`"
          class="faq-answer"
          :class="{ collapsed: hydrated && openIndex !== index }"
        >
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
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

.faq-list {
  border-top: 1px solid #e4e7ed;
}

.faq-item {
  border-bottom: 1px solid #e4e7ed;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  text-align: left;
}

.faq-question:hover {
  color: #409eff;
}

.faq-arrow {
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-arrow.is-open {
  transform: rotate(90deg);
}

.faq-answer {
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.collapsed {
  max-height: 0;
}

.faq-answer p {
  padding: 0 0 16px;
  margin: 0;
  color: #606266;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .faq-question {
    font-size: 22px;
  }

  .faq-answer p {
    font-size: 19px;
  }
}
</style>
