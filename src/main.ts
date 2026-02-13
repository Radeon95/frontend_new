import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import { createHead } from '@vueuse/head'; //SEO
import App from './App.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';
import Galery from './views/Galery.vue';
import Quote from './views/Quote.vue';
import OurService from './views/OurService.vue';
import BusinessMoving from './views/BusinessMoving.vue';
import HouseRemoval from './views/HomeRemoval.vue';
import ThankYou from './views/ThankYou.vue';

// Определение маршрутов
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/galery', component: Galery },
  { path: '/quote', name: 'Quote', component: Quote },
  { path: '/services', component: OurService },
  { path: '/business-moving', component: BusinessMoving },
  { path: '/house-removal', component: HouseRemoval },
  { path: '/thank-you', name: 'ThankYou', component: ThankYou },
];

// Создание маршрутизатора
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.options.scrollBehavior = () => ({ top: 0 });

const app = createApp(App);
const head = createHead(); // SEO

// Регистрация всех иконок Element Plus
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// Использование плагинов
app.use(ElementPlus);
app.use(router);
app.use(head); // SEO

app.mount('#app');

const fallback = document.getElementById('hero-fallback');
if (fallback) fallback.remove();


