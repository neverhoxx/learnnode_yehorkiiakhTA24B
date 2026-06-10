import { createApp } from 'vue';
import { createMemoryHistory, createWebHashHistory, createWebHistory, createRouter } from 'vue-router';

import ToDo from './pages/ToDo.vue';
import Modals from './pages/Modals.vue';
import Messages from './pages/Messages.vue';
import ChuckNorris from './pages/ChuckNorris.vue';
import RickAndMorty from './pages/RickAndMorty.vue';
import KeyboardDemo from './pages/KeyboardDemo.vue'
const routes = [
  { path: '/', component: ToDo, name: 'ToDo' },
  { path: '/modals', component: Modals, name: 'Modals' },
  { path: '/messages', component: Messages, name: 'Messages' },
  { path: '/chuck', component: ChuckNorris, name: 'Chuck Norris' },
  { path: '/rickandmorty', component: RickAndMorty, name: 'Rick And Morty' },
  { path: '/keyboard', component: KeyboardDemo, name: 'Keyboard demo' }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});


import App from './App.vue';

const app = createApp(App).use(router).mount('#app');