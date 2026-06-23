import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import App from '../src/views/Tela_Feriados.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
createApp(App).use(VueAxios, axios).mount('#app')