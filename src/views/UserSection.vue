<template>
	<el-button @click="createUserDialogVisible = true">Добавить пользователя</el-button>
	<el-table :data="filteredUser" style="width: 100%" @row-click="rowclick">
		<el-table-column label="Название" prop="name" />
		<el-table-column align="right">
			<template #header>
				<el-input
					v-model="search"
					size="small"
					placeholder="Type to search"
					@input="filterUsers"
				/>
			</template>
			<template #default="scope">
				<el-button size="small" @click="handleEdit(scope.row)">
					Открыть
				</el-button>
				<el-button
					size="small"
					type="danger"
					@click="handleDelete(scope.row)"
				>
					X
				</el-button>
			</template>
		</el-table-column>
	</el-table>

	<el-dialog v-model="createUserDialogVisible" title="Добавить пользователя">
		<el-form :model="newUser" label-width="150px">
			<el-form-item label="Имя пользователя">
				<el-input v-model="newUser.name" />
			</el-form-item>
			<el-form-item label="Контакт">
				<el-select
					v-model="newUser.contact"
					placeholder="Выберите контакт"
					width="100%"
				>
					<el-option
						v-for="contact in contacts"
						:label="contact.name"
						:value="contact.id"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="Пароль">
				<el-input
					v-model="newUser.password"
					type="password"
					show-password
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="createUserDialogVisible = false"
					>Отмена</el-button
				>
				<el-button type="primary" @click="handleCreateUserButton">
					Добавить
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
import { toRaw } from "vue";
import router from "@/router";
import axios from "axios";
import { ElLoading, ElMessageBox, ElMessage } from "element-plus";

export default {
	props: {},

	data() {
		return {
			search: "",
			createUserDialogVisible: false,
			newUser: {
				name: "",
				contact: "",
				password: "",
			},
			users: [],
			contacts: [],
			filteredUser: [],
			availableСontacts: [],
		};
	},

	methods: {
		filterUsers: function () {
			this.filteredUser = this.users.filter(
				(data) =>
					!this.search ||
					data.name.toLowerCase().includes(this.search.toLowerCase())
			);
		},

		handleEdit: function (row) {
			router.push({ name: "UserPage", params: { id: toRaw(row).id } });
		},

		handleDelete: function (row) {
			this.deleteUser(toRaw(row).id);
		},

		deleteUser: function (userId) {
			const loadingInstance = ElLoading.service({
				lock: true,
				text: "Загрузка",
			});

			const url = "https://localhost:7269/api/User/" + userId;

			axios
				.delete(url)
				.then((response) => {
					console.log(response);
					loadingInstance.close();
					this.getUsers();
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

		handleCreateUserButton: function () {
			if (
				this.newUser.name === "" ||
				this.newUser.contact === "" ||
				this.newUser.password === ""
			) {
				ElMessage("Заполните все поля");
				return;
			}

			this.createUser();
		},

		createUser: function () {
			const loadingInstance = ElLoading.service({
				lock: true,
				text: "Загрузка",
			});

			const url = "https://localhost:7269/api/User";
			let data = {
				name: this.newUser.name,
				contactId: this.newUser.contact,
				userPassword: this.newUser.password,
			};

			axios
				.post(url, data)
				.then((response) => {
					console.log(response);
					loadingInstance.close();
					this.createUserDialogVisible = false;
					this.getUsers();
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
					this.createUserDialogVisible = false;
				});
		},

		getEntinies: function (url, isUsers = true) {
			const loadingInstance = ElLoading.service({
				lock: true,
				text: "Загрузка",
			});

			axios
				.get(url)
				.then((response) => {
					if (isUsers) {
						this.users = response.data.values;
						this.filteredUser = this.users;
					} else {
						this.contacts = response.data.values;
					}
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

		getUsers: function () {
			const url = `https://localhost:7269/api/User`;
			this.getEntinies(url);
		},

		getContacts: function () {
			const url = `https://localhost:7269/api/Contact`;
			this.getEntinies(url, false);
		},
	},

	mounted() {
		this.getUsers();
		this.getContacts();
	},
};
</script>

<style></style>
