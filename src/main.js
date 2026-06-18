import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import App from './1-tela_feriados/App.vue/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
createApp(App).use(VueAxios, axios).mount('#app')