import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserPage from "../views/UserPage.vue";
import UserSection from "../views/UserSection.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/UserSection",
		name: "UserSection",
		component: UserSection,
	},
	{
		path: "/UserPage/:id",
		name: "UserPage",
		component: UserPage,
		props: true,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
