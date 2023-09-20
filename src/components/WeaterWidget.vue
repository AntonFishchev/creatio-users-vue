<template>
	<div class="main">
		<div><strong>Текущее местоположение:</strong> {{ currentLocation }}</div>
		<div>
			<h3>Погода</h3>
			<p>{{ condition }}</p>
			<p>Температура: {{ temp_c }} C</p>
			<p>Влажность: {{ humidity }}%</p>
			<p>Скорость ветра: {{ wind_mph }} м\с</p>
		</div>
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
			latitude: 0,
			longitude: 0,
			currentLocation: "",
			condition: "",
			temp_c: "",
			humidity: "",
			wind_mph: "",
		};
	},
	methods: {
		setInfo: function (scope) {
			const key = "68ba1cd53f184ed9913125632232405";
			const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${scope.latitude},${scope.longitude}&lang=ru`;

			axios.get(url).then((response) => {
				console.log(response);
				scope.currentLocation = `${response.data.location.name}, ${response.data.location.country}`;
				scope.condition = response.data.current.condition.text;
				scope.temp_c = response.data.current.temp_c;
				scope.humidity = response.data.current.humidity;
				scope.wind_mph = response.data.current.wind_mph;
			});
		},
	},
	mounted() {
		let scope = this;

		navigator.geolocation.getCurrentPosition(function (position) {
			scope.latitude = position.coords.latitude;
			scope.longitude = position.coords.longitude;

			scope.setInfo(scope);
		});
	},
};
</script>

<style scoped>
.main {
	border: 1px black solid;
	border-radius: 5px;
	padding: 5px;

	font-size: 12px;
	display: block;
}

h3 {
	margin: 5px 0 0 0;
}

p {
	margin: 0;
}

</style>