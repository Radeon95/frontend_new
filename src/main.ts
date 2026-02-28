import { ViteSSG } from 'vite-ssg';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {
  Phone,
  Message,
  Van,
  OfficeBuilding,
  Box,
  Star,
  UserFilled,
  Opportunity,
  Location,
  Clock,
} from '@element-plus/icons-vue';
import './style.css';
import App from './App.vue';

const Home = () => import('./views/Home.vue');
const About = () => import('./views/About.vue');
const Contact = () => import('./views/Contact.vue');
const Gallery = () => import('./views/Galery.vue');
const Quote = () => import('./views/Quote.vue');
const OurService = () => import('./views/OurService.vue');
const BusinessMoving = () => import('./views/BusinessMoving.vue');
const HouseRemoval = () => import('./views/HomeRemoval.vue');
const ThankYou = () => import('./views/ThankYou.vue');
const PackingServices = () => import('./views/PackingServices.vue');
const ManWithVan = () => import('./views/ManWithVan.vue');
const LocationPage = () => import('./views/LocationPage.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/gallery', component: Gallery },
  { path: '/galery', redirect: '/gallery' },
  { path: '/quote', name: 'Quote', component: Quote },
  { path: '/services', component: OurService },
  { path: '/business-moving', component: BusinessMoving },
  { path: '/house-removal', component: HouseRemoval },
  { path: '/packing-services', component: PackingServices },
  { path: '/man-with-van', component: ManWithVan },
  { path: '/thank-you', name: 'ThankYou', component: ThankYou },
  { path: '/removals-leicester', component: LocationPage, props: { city: 'leicester' } },
  { path: '/removals-nottingham', component: LocationPage, props: { city: 'nottingham' } },
  { path: '/removals-derby', component: LocationPage, props: { city: 'derby' } },
  { path: '/removals-coventry', component: LocationPage, props: { city: 'coventry' } },
  { path: '/removals-northampton', component: LocationPage, props: { city: 'northampton' } },
  { path: '/removals-loughborough', component: LocationPage, props: { city: 'loughborough' } },
  { path: '/removals-market-harborough', component: LocationPage, props: { city: 'market-harborough' } },
  { path: '/removals-lutterworth', component: LocationPage, props: { city: 'lutterworth' } },
  { path: '/removals-hinckley', component: LocationPage, props: { city: 'hinckley' } },
  { path: '/removals-rugby', component: LocationPage, props: { city: 'rugby' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior: (to) => {
      if (to.hash) {
        return undefined;
      }
      return { top: 0 };
    },
  },
  ({ app }) => {
    app.use(ElementPlus);

    // Register only the icons that are actually used
    app.component('Phone', Phone);
    app.component('Message', Message);
    app.component('Van', Van);
    app.component('OfficeBuilding', OfficeBuilding);
    app.component('Box', Box);
    app.component('Star', Star);
    app.component('UserFilled', UserFilled);
    app.component('Opportunity', Opportunity);
    app.component('Location', Location);
    app.component('Clock', Clock);
  },
);
