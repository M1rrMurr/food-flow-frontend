import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DemandVuew from "@/views/DemandVuew.vue";
import OfferView from "@/views/OfferView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import CreateView from "@/views/demand/CreateView.vue";

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
    { path: "/belepes", name: "belepes", component: LoginView },
    {
      path: "/kereslet/uj",
      name: "demandCreate",
      component: CreateView,
    },
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
  //if (!authStore.isAuthenticated && to.name === "demandCreate") {
  //  return { name: "belepes" };
  // }
});
export default router;
