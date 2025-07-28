import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DemandVuew from "@/views/DemandVuew.vue";
import OfferView from "@/views/OfferView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";

import useAuthStore from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/kereslet",
      name: "demand",
      component: DemandVuew,
    },
    { path: "/kinalat", name: "kinalat", component: OfferView },
    { path: "/regisztracio", name: "regisztracio", component: RegisterView },
    { path: "/bejelentkezes", name: "bejelentkezes", component: LoginView },
  ],
});

// nav guard
router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated && to.name === "regisztracio") {
    return false;
  }
  if (authStore.isAuthenticated && to.name === "bejelentkezes") {
    return false;
  }
});
export default router;
