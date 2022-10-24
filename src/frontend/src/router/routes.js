import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: { layout: "AppLayoutDefault" },
    children: [
      {
        path: "login",
        meta: { middlewares: [isLoggedIn] },
        component: () => import("../views/Login.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayoutDefault" },
    children: [
      {
        path: "login",
        meta: { middlewares: [isLoggedIn] },
        component: () => import("../views/Login.vue"),
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: { layout: "AppLayoutMain", middlewares: [auth] },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: "AppLayoutMain", middlewares: [auth] },
  },
];
