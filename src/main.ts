import { ViteSSG } from 'vite-ssg';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './style.css';
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
import PackingServices from './views/PackingServices.vue';
import ManWithVan from './views/ManWithVan.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/galery', component: Galery },
  { path: '/quote', name: 'Quote', component: Quote },
  { path: '/services', component: OurService },
  { path: '/business-moving', component: BusinessMoving },
  { path: '/house-removal', component: HouseRemoval },
  { path: '/packing-services', component: PackingServices },
  { path: '/man-with-van', component: ManWithVan },
  { path: '/thank-you', name: 'ThankYou', component: ThankYou },
];

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior: () => ({ top: 0 }),
  },
  ({ app }) => {
    app.use(ElementPlus);

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
);
