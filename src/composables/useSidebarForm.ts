import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

export function useSidebarForm() {
  const router = useRouter();

  const sidebarFormRef = ref<FormInstance>();
  const sidebarForm = reactive({
    name: '',
    phone: '',
    email: '',
    moveDate: '',
    fromPostcode: '',
    toPostcode: '',
    message: '',
  });

  const sidebarRules = reactive<FormRules>({
    name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }],
    phone: [{ required: true, message: 'Please enter your phone number', trigger: 'blur' }],
    email: [
      { required: true, message: 'Please enter your email', trigger: 'blur' },
      { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
    ],
    moveDate: [{ required: false }],
    fromPostcode: [{ required: true, message: 'Please enter postcode', trigger: 'blur' }],
    toPostcode: [{ required: true, message: 'Please enter postcode', trigger: 'blur' }],
    message: [{ required: false }],
  });

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

  const transformFormData = (formData: typeof sidebarForm) => {
    const { first_name, last_name } = splitName(formData.name);

    return {
      first_name: first_name || '',
      last_name: last_name || '',
      company_name: '',
      email: formData.email || '',
      phone: formData.phone || '',
      alt_phone: '',
      move_date: formatDate(formData.moveDate),
      move_date_app: '',
      mf_add1: '',
      mf_add2: '',
      mf_city: '',
      mf_postcode: formData.fromPostcode || '',
      mfproptype: '',
      mf_floornumber: '',
      mf_bedroom: '',
      mf_lift: '',
      movingfrompostcodedata: {},
      mt_add1: '',
      mt_add2: '',
      mt_city: '',
      mt_postcode: formData.toPostcode || '',
      mtproptype: '',
      mt_floornumber: '',
      mt_bedroom: '',
      mt_lift: '',
      movingtopostcodedata: {},
      packagename: '',
      source: '',
      comments: formData.message || '',
    };
  };

  const sendEmail = async (formData: typeof sidebarForm) => {
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

  const sendEmailNotification = async (formData: typeof sidebarForm) => {
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
          altPhone: '',
          fromPostcode: formData.fromPostcode || '',
          fromAddress: '',
          fromCity: '',
          fromPropertyType: '',
          toPostcode: formData.toPostcode || '',
          toAddress: '',
          toCity: '',
          toPropertyType: '',
          pakage: '',
          details: formData.message || '',
          consent: false,
          promoCode: '',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email notification:', error);
      return null;
    }
  };

  const submitSidebarForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    try {
      const valid = await formEl.validate();
      if (valid) {
        await sendEmail(sidebarForm);
        await sendEmailNotification(sidebarForm);
        ElMessage({ message: 'Quote sent successfully!', type: 'success' });
        formEl.resetFields();
        setTimeout(() => {
          router.push('/thank-you');
        }, 1000);
      } else {
        ElMessage({ message: 'Please check the form for errors', type: 'error' });
      }
    } catch (error) {
      ElMessage({ message: 'Please complete required fields', type: 'error' });
    }
  };

  const scrollToForm = () => {
    if (typeof document !== 'undefined') {
      const formElement = document.getElementById('quote-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return {
    sidebarFormRef,
    sidebarForm,
    sidebarRules,
    submitSidebarForm,
    scrollToForm,
  };
}
