<script setup lang="ts">
import { ref, onMounted } from 'vue';

const faqs = [
  {
    question: 'How quickly can you organise a move?',
    answer:
      'Depending on the complexity and volume of work, we can organise a move within 1–3 days from the order confirmation. For urgent same-day moves, please call us directly.',
  },
  {
    question: 'Do you work on weekends and bank holidays?',
    answer:
      'Yes, we work 7 days a week including bank holidays. Our hours are Monday–Friday 8am–6pm and Saturday–Sunday 8am–4pm. A small surcharge may apply on bank holidays.',
  },
  {
    question: 'Are you fully insured?',
    answer:
      'Yes, AMB Removals carries full Public Liability Insurance and Goods in Transit Insurance. Every item we handle is covered from the moment we pick it up until it is placed in your new home or office.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'We cover the entire Midlands region including Leicester, Nottingham, Derby, Coventry, Northampton, Loughborough, Market Harborough, Hinckley, Rugby, Milton Keynes, and surrounding areas. No matter where you are moving from or to, we can help.',
  },
  {
    question: 'Do you offer packing services?',
    answer:
      'Yes, we offer a full packing and unpacking service. Our team brings all necessary materials — boxes, bubble wrap, tape, and wardrobe cartons. You can choose full packing, partial packing, or fragile-items-only packing.',
  },
  {
    question: 'Can you move pianos or other fragile items?',
    answer:
      'Absolutely. We have experience moving pianos, antiques, artwork, and other delicate items. We use specialist wrapping and handling techniques to ensure safe transport. Please mention fragile items when requesting your quote so we can prepare accordingly.',
  },
  {
    question: 'How much does a removal cost?',
    answer:
      'Every move is different, so we provide free, no-obligation quotes tailored to your needs. The cost depends on the volume of items, distance, access requirements, and any additional services like packing or storage. Request a free quote through our website or call us for an instant estimate.',
  },
  {
    question: 'Do you provide storage services?',
    answer:
      'Yes, we can arrange short-term and long-term storage solutions if there is a gap between your move-out and move-in dates. All storage facilities are secure, dry, and monitored. Contact us for storage rates.',
  },
  {
    question: 'What is the difference between local and long-distance removals?',
    answer:
      'Local removals typically cover moves within the same city or up to 50 miles. Long-distance removals cover moves across the UK. Both services include the same care and professionalism — the main difference is pricing and scheduling. We handle both with equal attention to detail.',
  },
  {
    question: 'What should I do to prepare for moving day?',
    answer:
      'We recommend labelling your boxes by room, keeping valuables and documents with you, ensuring parking is available for our van, and notifying us of any access restrictions (stairs, narrow hallways, parking permits). Our team will handle the heavy lifting — you just need to be ready to hand over the keys!',
  },
  {
    question: 'Can you help with office and business relocations?',
    answer:
      'Yes, we specialise in commercial and office moves. We work around your schedule — including evenings and weekends — to minimise downtime. Our team handles IT equipment, desks, filing cabinets, and all office furniture with care.',
  },
  {
    question: 'What happens if something gets damaged during the move?',
    answer:
      'While damage is extremely rare thanks to our professional handling, we are fully insured. If any item is damaged during transit, you can file a claim and we will compensate you in accordance with our insurance policy and terms of service.',
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
