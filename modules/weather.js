const util = require('util');
const request = require('request');
const config = require('../bot.json');

module.exports = {

	endpoint: 'https://api.openweathermap.org/data/2.5/onecall',

	icons: {
		"01d": ":sunny:",
		"02d": ":sun_small_cloud:",
		"03d": ":sun_behind_cloud:",
		"04d": ":cloud:",
		"09d": ":rain_cloud:",
		"10d": ":partly_sunny_rain:",
		"11d": ":thunder_cloud_and_rain:",
		"13d": ":snowflake:",
		"50d": ":fog:",
		"01n": ":sunny:",
		"02n": ":sun_small_cloud:",
		"03n": ":sun_behind_cloud:",
		"04n": ":cloud:",
		"09n": ":rain_cloud:",
		"10n": ":partly_sunny_rain:",
		"11n": ":thunder_cloud_and_rain:",
		"13n": ":snowflake:",
		"50n": ":fog:",
	},

	get: function (lat, lon) {

		return new Promise(function (resolve, reject) {

			let response = [];

			this.apiGet(lat, lon).then(function (weather) {

				let daily = this.formatDay(weather);

				let hours = this.formatHours(weather);

				response.push('Good morning!');
				response.push(daily);
				response.push(hours);

				resolve(response);

			}.bind(this), function (error) {

				response.push(error);

				return reject(response);

			}.bind(this));

		}.bind(this));

	},

	apiGet: function (lat, lon) {

		let apikey = config.config.weather.apikey;
		let endp = this.endpoint;
		let weather = {};

		if (lat !== '' && lon !== '') {

			 endp += '?lat=' + lat + '&lon=' + lon + '&exclude=minutely&units=imperial&appid=' + apikey;

			 return new Promise(function (resolve, reject) {

			 	request(endp, function (error, response, body) {

			 		// console.log(response);

					if (error) {
						return reject(new Error(error));
					}

					if (response.statusCode !== 200) {
						return reject(new Error('bad status code'));
					}

					weather = JSON.parse(body);

					resolve(weather);

				});

			 });

		} else {

			return new Promise(function (resolve, reject) {
				resolve(['Invalid location provided']);
			});

		}

	},

	formatDay: function (weather) {

		if (typeof weather.daily !== 'undefined') {

			let today = weather.daily[0];

			let d = new Date();

			d.setTime(today.dt * 1000);

			let high = Math.ceil(today.temp.max);
			let low = Math.floor(today.temp.min);

			return (d.getMonth() + 1) + '/' + d.getDate() + ' - :thermometer: ' + low + ' / ' + high;

		} else {

			return '';

		}

	},

	formatHours: function (weather) {

		let res = '';

		if (typeof weather.hourly !== 'undefined') {

			let hours = [];
			let flip = true;

			for (let i in weather.hourly) {
				if (weather.hourly.hasOwnProperty(i)) {

					if (flip) {
						hours.push(weather.hourly[i]);
						flip = false;
					} else {
						flip = true;
					}

				}
			}

			if (hours.length > 0) {

				let hIcons = hours.slice(0, 6).map(x => x.weather[0].icon);

				for (let j in hIcons) {
					if (hIcons.hasOwnProperty(j)) {
						res += this.icons[hIcons[j]] + ' ';
					}
				}

			}

		}

		return res;

	}

};
