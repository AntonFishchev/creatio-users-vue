<template>
	<div class="main">
		<div class="field">
			<el-text class="mx-1">Название</el-text>
			<el-input v-model="newName" placeholder="Название" />
		</div>
		<div class="field">
			<el-text class="mx-1">Активный</el-text>
			<br />
			<el-switch v-model="user.isActive" @change="this.changeActive" />
		</div>

		<el-button type="success" v-if="this.user.name !== this.newName" @click="onChangeUser">
			Сохранить
		</el-button>
	</div>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { ElLoading, ElMessageBox } from "element-plus";

export default {
	components: {},
	data() {
		return {
			id: this.$route.params.id,
			user: {},
			newName: "",
			loading: false,
		};
	},
	methods: {
		setNewInfo: function () {
			this.newName = this.user.name;
		},

		setCurrentInfo: function () {
			this.user.name = this.newName;
		},

		onChangeUser: function () {
			console.log(123);
			const loadingInstance = ElLoading.service({
				lock: true,
				text: "Загрузка",
			});

			const url = "https://localhost:7269/api/User";
			let data = {
				id: this.id,
				name: this.newName
			};

			axios
				.put(url, data)
				.then((response) => {
					console.log(response);
					this.setCurrentInfo();
					loadingInstance.close();
				})
				.catch((error) => {
					loadingInstance.close();
					ElMessageBox.alert(
						"При обращении к серверу произошла ошибка",
						"Ошибка",
						{
							confirmButtonText: "Назад",
							callback: () => {
								this.getUsers();
							},
						}
					);
				});

		},

		changeActive: function (value) {
			const deactivationUrl =
				"https://localhost:7269/api/User/Deactivation/" + this.id;
			const activationUrl =
				"https://localhost:7269/api/User/Activation/" + this.id;
			const url = value ? activationUrl : deactivationUrl;

			const loadingInstance = ElLoading.service({
				lock: true,
				text: "Загрузка",
			});

			axios
				.get(url)
				.then((response) => {
					console.log(response);
					loadingInstance.close();
				})
				.catch((error) => {
					loadingInstance.close();
					ElMessageBox.alert(
						"При обращении к серверу произошла ошибка",
						"Ошибка",
						{
							confirmButtonText: "Назад",
							callback: () => {
								router.back();
							},
						}
					);
				});
		},
	},
	mounted() {
		const url = `https://localhost:7269/api/User/${this.id}`;
		const loadingInstance = ElLoading.service({
			lock: true,
			text: "Загрузка",
		});

		axios
			.get(url)
			.then((response) => {
				this.user = response.data.values;
				this.setNewInfo();
				loadingInstance.close();
			})
			.catch((error) => {
				loadingInstance.close();
				ElMessageBox.alert(
					"При обращении к серверу произошла ошибка",
					"Ошибка",
					{
						confirmButtonText: "Назад",
						callback: () => {
							router.back();
						},
					}
				);
			});
	},
};
</script>

<style scoped>
.main {
	display: flex;
	flex-direction: column;
}

.field {
	margin: 10px 0;
}

button {
	margin: auto;
}
</style>
