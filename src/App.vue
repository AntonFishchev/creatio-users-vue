<template>
	<nav>
		<div>
			<router-link to="/">Home</router-link> | 
			<router-link to="/UserSection">Пользователи</router-link>
		</div>
		<weater-widget />
	</nav>
	<router-view />
</template>

<script>
import WeaterWidget from "@/components/WeaterWidget.vue";

export default {
	name: "App",
	components: {
		WeaterWidget,
	},
};
</script>

<style>
#app {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
		"Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

nav {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
</style>
