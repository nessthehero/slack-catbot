const util = require('util');
const request = require('request');
const config = require('../bot.json');
const breiutil = require('brei-util');

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

	alerts: [],
	sentAlerts: [],

	get: function (lat, lon) {

		return new Promise(function (resolve, reject) {

			let response = [];

			this.apiGet(lat, lon).then(function (weather) {

				let daily = this.formatDay(weather);

				let hours = this.formatHours(weather);

				response.push('Good morning!');
				response.push(daily);
				response.push(hours);

				if (this.alerts.length > 0) {
					response.push('*' + this.alerts.length + '* Active Weather Alert(s). *!weather* to see.');
				}

				resolve(response);

			}.bind(this), function (error) {

				response.push(error);

				return reject(response);

			}.bind(this));

		}.bind(this));

	},

	getAlerts: function (lat, lon, allAlerts) {

		if (typeof allAlerts === 'undefined' || allAlerts === null) {
			allAlerts = false;
		}

		return new Promise(function (resolve, reject) {

			let response = [];

			this.apiGet(lat, lon).then(function (weather) {

				if (allAlerts) {
					let daily = this.formatDay(weather);

					let hours = this.formatHours(weather);

					response.push(daily);
					response.push(hours);
				}

				let alerts = this.alerts.filter(x => {
					let currDate = new Date();
					let alertDate = new Date(x.start * 1000);

					let diff = (currDate.getTime() - alertDate.getTime()) / 1000 / 60; // Minutes

					let recent = (diff > 10);

					const key = breiutil.slugify(x['start'] + '-' + x['end'] + '-' + x['event']);

					let spentAlert = this.sentAlerts.filter(y => y === key);

					return (recent && spentAlert.length === 0) || allAlerts; // More than 10 minute difference
				});

				if (alerts.length > 0) {

					for (var i in alerts) {
						if (alerts.hasOwnProperty(i)) {
							response.push('*' + alerts[i]['sender_name'] + '*: ' + alerts[i]['description']);
						}
					}

					this.sentAlerts = [];

					for (var j in this.alerts) {
						if (this.alerts.hasOwnProperty(j)) {
							this.sentAlerts.push(breiutil.slugify(this.alerts[j]['start'] + '-' + this.alerts[j]['end'] + '-' + this.alerts[j]['event']))
						}
					}

				}

				resolve(response);

			}.bind(this), function (error) {

				response.push(error);

				return reject(response);

			}.bind(this));

		}.bind(this));

	},

	prefillAlerts: function (lat, lon) {

		return new Promise(function (resolve, reject) {

			let response = false;

			this.apiGet(lat, lon).then(function (weather) {

				response = true;

				resolve(response);

			}.bind(this), function (error) {

				return reject(response);

			}.bind(this));

		}.bind(this));

	},

	apiGet: function (lat, lon) {

		let _this = this;

		let apikey = config.config.weather.apikey;
		let endp = this.endpoint;
		let weather = {};

		if (lat !== '' && lon !== '') {

			 endp += '?lat=' + lat + '&lon=' + lon + '&exclude=minutely&units=imperial&appid=' + apikey;

			 return new Promise(function (resolve, reject) {

			 	request(endp, function (error, response, body) {

					if (error) {
						return reject(new Error(error));
					}

					if (response.statusCode !== 200) {
						return reject(new Error('bad status code'));
					}

					weather = JSON.parse(body);

					if (typeof weather.alerts !== 'undefined') {
						_this.alerts = weather.alerts;

						_this.sentAlerts = [];

						for (var j in _this.alerts) {
							if (_this.alerts.hasOwnProperty(j)) {
								_this.sentAlerts.push(breiutil.slugify(_this.alerts[j]['start'] + '-' + _this.alerts[j]['end'] + '-' + _this.alerts[j]['event']))
							}
						}
					}

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
