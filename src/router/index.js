// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Usuarios from "../components/Usuarios.vue";
import Productos from "../components/Productos.vue";
import Pedidos from "../components/Pedidos.vue";

const routes = [
  {
    path: "/",
    redirect: "/usuarios",
  },
  {
    path: "/usuarios",
    component: Usuarios,
  },
  {
    path: "/productos",
    component: Productos,
  },
  {
    path: "/pedidos",
    component: Pedidos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
