import { createRouter, createWebHashHistory } from 'vue-router'

import Tela_Login from '../views/Tela_Login.vue'
import Tela_Feriados from '../views/Tela_Feriados.vue'
import CadastrarUsuario from '../views/Cadastro_Feriado.vue'

const routes = [
  { path: '/', component: Tela_Login },
  { path: '/feriados', component: Tela_Feriados },
  { path: '/cadastroUsuario', component: CadastrarUsuario },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router  