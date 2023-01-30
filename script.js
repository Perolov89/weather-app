import { Location } from "./location.js";

let jarvso = new Location("jarvso", 61.717, 16.167)
let are = new Location("are",63.401, 13.082)
let salen = new Location("salen", 61.258, 13.880)

const location_array= [jarvso, are, salen]

let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;
const API_KEY = "0ca6039b71bf8d730d7bbe35fa8c914d";

window.onload = (event) => {
	console.log("window loaded")
	location_array.forEach( location => fetchLocationData(location) )
};

function fetchLocationData(location) {
	let lat = location.latitude
	let lon = location.longitude

	const url =
	`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
	`lon=${lon}&appid=${API_KEY}`;

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			temperature.textContent =
				Math.floor(data.main.temp - kelvin) + "°C";
			summary.textContent = data.weather[0].description;
			loc.textContent = data.name + "," + data.sys.country;
			let icon1 = data.weather[0].icon;
			icon.innerHTML =
				`<img src="http://openweathermap.org/img/wn/${icon1}@2x.png" style= 'height:10rem'/>`;
		});
}


