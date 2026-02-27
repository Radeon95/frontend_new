<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

const router = useRouter();

const formRef = ref<FormInstance>();
const form = reactive({
  name: '',
  phone: '',
  email: '',
  fromPostcode: '',

  fromCity: '',
  fromPropertyType: '',
  toPostcode: '',

  toCity: '',
  toPropertyType: '',
  moveDate: '',
  message: '',
  promoCode: '',
  agreement: false,
  consent: false,
  package: '',
  details: '',
});

const personalFields: {
  model: keyof typeof form;
  label: string;
  placeholder: string;
  type?: string;
}[] = [
  { model: 'name', label: 'Name', placeholder: 'Enter your name', type: 'text' },
  { model: 'phone', label: 'Phone', placeholder: 'Enter your phone number', type: 'tel' },
  { model: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
];

const propertyTypes = [
  'House',
  'Apartment',
  'Studio',
  'Maisonette',
  'Bungalow',
  'Storage',
  'Office',
  'Industrial',
];
const packageOptions = ['Move', 'Move with packing', 'Unsure'];

const rules = reactive<FormRules>({
  name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }],
  phone: [{ required: true, message: 'Please enter your phone number', trigger: 'blur' }],
  email: [{ required: true, message: 'Please enter your email', trigger: 'blur' }],
  fromPostcode: [{ required: true, message: 'Enter the postcode', trigger: 'blur' }],
  toPostcode: [{ required: true, message: 'Enter the postcode', trigger: 'blur' }],
  fromPropertyType: [{ required: true, message: 'Select a property type', trigger: 'change' }],
  toPropertyType: [{ required: true, message: 'Select a property type', trigger: 'change' }],
  message: [{ required: false }],
  agreement: [{ type: 'boolean', required: false }],
  promoCode: [{ required: false }],
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

// Transform form data to API schema format
const transformFormData = (formData: typeof form) => {
  const { first_name, last_name } = splitName(formData.name);
  
  return {
    first_name: first_name || '',
    last_name: last_name || '',
    company_name: '',
    email: formData.email || '',
    phone: formData.phone || '',
    alt_phone: '',
    move_date: formatDate(formData.moveDate),
    // Moving From
    mf_add1: '',
    mf_add2: '',
    mf_city: formData.fromCity || '',
    mf_postcode: formData.fromPostcode || '',
    mfproptype: formData.fromPropertyType || '',
    mf_floornumber: '',
    mf_bedroom: '',
    mf_lift: '',
    // Moving To
    mt_add1: '',
    mt_add2: '',
    mt_city: formData.toCity || '',
    mt_postcode: formData.toPostcode || '',
    mtproptype: formData.toPropertyType || '',
    mt_floornumber: '',
    mt_bedroom: '',
    mt_lift: '',
    // Comments - combine details, message, package, and promoCode if needed
    comments: [
      formData.details,
      formData.message,
      formData.package ? `Package: ${formData.package}` : '',
      formData.promoCode ? `Promo Code: ${formData.promoCode}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  };
};

const sendEmail = async (formData: typeof form) => {
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
const sendEmailNotification = async (formData: typeof form) => {
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
        altPhone: '', // Not available in form
        fromPostcode: formData.fromPostcode || '',

        fromCity: formData.fromCity || '',
        fromPropertyType: formData.fromPropertyType || '',
        toPostcode: formData.toPostcode || '',
        toCity: formData.toCity || '',
        toPropertyType: formData.toPropertyType || '',
        pakage: formData.package || '', // Backend expects 'pakage' (typo)
        details: formData.details || '',
        consent: formData.consent || false,
        promoCode: formData.promoCode || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw error - email notification failure shouldn't block the main flow
    return null;
  }
};

const scrollToFirstInvalidField = () => {
  if (!formRef.value) return;
  const formEl = formRef.value.$el as HTMLElement;
  const firstErrorItem = formEl.querySelector('.el-form-item.is-error');
  if (firstErrorItem) {
    firstErrorItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    const valid = await formEl.validate();
    if (valid) {
      await sendEmail(form);
      // Also send email notification
      await sendEmailNotification(form);
      ElMessage({ message: 'Quote sent successfully!', type: 'success' });
      formEl.resetFields();
      // Redirect to thank you page after a short delay
      setTimeout(() => {
        router.push('/thank-you');
      }, 1000);
    } else {
      scrollToFirstInvalidField();
      ElMessage({ message: 'Please check the form for errors', type: 'error' });
    }
  } catch (error) {
    ElMessage({ message: 'Please complete required fields (*)', type: 'error' });
  }
};
</script>

<template>
  <div style="position: absolute; left: -9999px; top: -9999px" aria-hidden="true">
    AMB Removals - ambremovals professional moving quote
  </div>
  <div class="quote-container">
    <el-form
      class="quote-form"
      :model="form"
      :rules="rules"
      ref="formRef"
      label-position="top"
      @submit.prevent="submitForm(formRef)"
    >
      <!-- Personal Details -->
      <div class="form-block">
        <div class="form-group" v-for="field in personalFields" :key="field.model">
          <el-form-item :label="field.label" :prop="field.model">
            <span class="input">
              <el-input
                v-model="form[field.model]"
                :type="field.type || 'text'"
                :placeholder="field.placeholder"
              />
              <span></span>
            </span>
          </el-form-item>
        </div>
      </div>

      <!-- Moving From -->
      <div class="form-block">
        <h3>Moving From...</h3>
        <div class="form-group">
          <el-form-item label="Postcode *" prop="fromPostcode">
            <span class="input">
              <el-input v-model="form.fromPostcode" placeholder="Search your postcode" />
              <span></span>
            </span>
          </el-form-item>
        </div>
        <div class="form-group"></div>
        <div class="form-group">
          <el-form-item label="City" prop="fromCity">
            <span class="input">
              <el-input v-model="form.fromCity" placeholder="City" />
              <span></span>
            </span>
          </el-form-item>
        </div>
        <div class="form-group">
          <el-form-item label="Property Type *" prop="fromPropertyType">
            <span class="selection">
              <el-select v-model="form.fromPropertyType" placeholder="Select type">
                <el-option
                  v-for="option in propertyTypes"
                  :key="option"
                  :label="option"
                  :value="option"
                />
              </el-select>
              <span></span>
            </span>
          </el-form-item>
        </div>
      </div>

      <!-- Moving To -->
      <div class="form-block">
        <h3>Moving To...</h3>
        <div class="form-group">
          <el-form-item label="Postcode *" prop="toPostcode">
            <span class="input">
              <el-input v-model="form.toPostcode" placeholder="Search your postcode" />
              <span></span>
            </span>
          </el-form-item>
        </div>
        <div class="form-group"></div>
        <div class="form-group">
          <el-form-item label="City" prop="toCity">
            <span class="input">
              <el-input v-model="form.toCity" placeholder="City" />
              <span></span>
            </span>
          </el-form-item>
        </div>
        <div class="form-group">
          <el-form-item label="Property Type *" prop="toPropertyType">
            <span class="selection">
              <el-select v-model="form.toPropertyType" placeholder="Select type">
                <el-option
                  v-for="option in propertyTypes"
                  :key="option"
                  :label="option"
                  :value="option"
                />
              </el-select>
              <span></span>
            </span>
          </el-form-item>
        </div>
      </div>

      <!-- Package and Details -->
      <div class="form-block">
        <div class="form-group">
          <el-form-item label="Package" prop="package">
            <span class="selection">
              <el-select v-model="form.package" placeholder="Select package">
                <el-option
                  v-for="option in packageOptions"
                  :key="option"
                  :label="option"
                  :value="option"
                  class="custom-option"
                />
              </el-select>
              <span></span>
            </span>
          </el-form-item>
        </div>
        <div class="form-group">
          <el-form-item label="Any other details" prop="details">
            <span class="input1">
              <el-input
                type="textarea"
                v-model="form.details"
                placeholder="Any other details, e.g., parking or access notes for AMB Removals team"
              />
              <span></span>
            </span>
          </el-form-item>
          <el-form-item label="Promo Code" prop="promoCode">
            <span class="input1">
              <el-input v-model="form.promoCode" placeholder="Enter promo or discount code" />
              <span></span>
            </span>
          </el-form-item>
        </div>
      </div>

      <!-- Consent -->
      <el-form-item prop="consent">
        <el-checkbox v-model="form.consent" class="custom-el-checkbox">
          I agree to be contacted and my data processed.
        </el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.quote-container {
  padding: 2rem;
  max-width: 900px;
  margin: auto;
}
.quote-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
@media (max-width: 768px) {
  .quote-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

@media (min-width: 768px) and (max-width: 1025px) {
  .quote-form {
    padding-top: 10vh;
  }
}

.form-block {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  font-weight: 600;
  color: #333;
  font-size: 40px;
}

el-input {
  border-radius: 2px;
}
:deep(.el-input__wrapper),
:deep(.el-textarea__inner),
:deep(.el-select .el-input__wrapper) {
  border-radius: 1rem;
  --el-input-border-radius: 1rem;
  overflow: hidden;
  box-shadow: none !important;
  background-color: #fff !important;
}

.input {
  position: relative;
  font-size: 1.1em;
  background: linear-gradient(235deg, #eff47df7, #0a07b0);
  padding: 3px;
  display: inline-block;
  border-radius: 1rem;
  width: 100%;
}
.input1 {
  position: relative;
  font-size: 1.1em;
  background: linear-gradient(235deg, #eff47df7, #0a07b0);
  padding: 3px;
  display: inline-block;
  border-radius: 1rem;
  width: 100%;
}
.selection {
  position: relative;
  font-size: 1.1em;
  background: linear-gradient(235deg, #eff47df7, #0a07b0);
  padding: 3px;
  display: inline-block;
  /* border-radius: 1rem; */
  width: 100%;
}
.input input,
.input select,
.input textarea {
  position: relative;
  display: inherit;
  border-radius: inherit;
  margin: 0;
  border: none;
  outline: none;
  padding: 0.5em 0.75em;
  width: 96.5%;
  z-index: 1;
  background: #fff;
  font-family: inherit;
  font-size: 2em;
  color: #2e3750;
}
.input input:focus + span,
.input select:focus + span,
.input textarea:focus + span {
  opacity: 1;
  transform: scale(1);
}
.input span {
  transform: scale(0.993, 0.94);
  transition: transform 0.5s, opacity 0.25s;
  opacity: 0;
  position: absolute;
  z-index: 0;
  margin: 4px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: inset 0 0 0 3px #fff, 0 0 0 4px #fff, 3px -3px 30px #1beabd, -3px 3px 30px #10abff;
}
.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
}
button {
  background: #10abff;
  color: white;
  padding: 12px 24px;
  font-size: 1.4em;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease;
  align-self: center;
}
button:hover {
  background: #1beabd;
}
::placeholder {
  color: #cbd0d5;
}

.input1 input,
.input1 select,
.input1 textarea {
  position: relative;
  display: inherit;
  border-radius: inherit;
  margin: 0;
  border: none;
  outline: none;
  padding: 0.5em 0.75em;
  width: 96.5%;
  z-index: 1;
  background: #fff;
  font-family: inherit;
  font-size: 1em;
  color: #2e3750;
}
.input1 input:focus + span,
.input1 select:focus + span,
.input1 textarea:focus + span {
  opacity: 1;
  transform: scale(1);
}
.input1 span {
  transform: scale(0.993, 0.94);
  transition: transform 0.5s, opacity 0.25s;
  opacity: 0;
  position: absolute;
  z-index: 0;
  margin: 4px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: inset 0 0 0 3px #fff, 0 0 0 4px #fff, 3px -3px 30px #1beabd, -3px 3px 30px #10abff;
}
textarea {
  max-width: 874px;
}
input[type='checkbox'] {
  width: 20px;
  height: 20px;
  accent-color: #10abff; /* Optional: changes the checkbox color */
  cursor: pointer;
}

.quote-container {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}

:deep(.el-input__wrapper),
:deep(.el-textarea__inner),
:deep(.el-select .el-input__wrapper) {
  --el-input-border-radius: 1rem;
  border-radius: 1rem !important;
  overflow: hidden;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
}

.checkbox-label {
  font-size: 1rem;
  color: #2e3750;
}

:deep(.el-form-item__content) {
  justify-content: space-around;
}
</style>
