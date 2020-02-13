const util = require('util');
const request = require('request');
const config = require('../bot.json');
const _ = require('lodash');

module.exports = {

	playingEndpoint: 'https://spotify.ianmoffitt.dev/now.php',
	skipEndpoint: 'https://spotify.ianmoffitt.dev/skip.php',

	password: config.config.spotify.password,
	timeout: config.config.spotify.timeout,

	skippers: [],

	call: function () {

		let args = arguments;
		let res = [];

		return new Promise(function (resolve, reject) {

			if (args.length > 0) {

				let params = args[0].split(' ');

				let method = params.shift();

				let user = '';
				if (typeof args[1] !== 'undefined') {
					user = args[1];
				}

				switch (method) {
					case '?':
					case 'playing':
					case 'song':
					default:

						let end = this.playingEndpoint;

						request(end, function (error, response, body) {

							if (typeof body !== 'undefined') {
								if (body !== '') {
									res.push(body);
								}
							}

							if (error) {
								return reject(new Error(error));
							}

							if (response.statusCode !== 200) {
								return reject(new Error('bad status code'));
							}

							resolve(res);

						});

						break;
					case 'skip':

						let timecode = new Date().getTime();

						let spoilsport = _.filter(this.skippers, x => x.user = user);

						if (spoilsport.length === 0 || user === config.boss[0]) {

							this.skippers.push({
								'user': user,
								'time': timecode
							});

							let end = this.skipEndpoint + '?p=' + this.password;

							request(end, function (error, response, body) {

								if (typeof body !== 'undefined') {
									if (body !== '') {
										res.push(body);
									}
								}

								if (error) {
									return reject(new Error(error));
								}

								if (response.statusCode !== 200) {
									return reject(new Error('bad status code'));
								}

								resolve(res);

							});

						} else {
							
							// Figure out if it expired...
							
							let jerk = spoilsport[0];
							let now = new Date().getTime();

							let diff = now - jerk.time;

							if (diff >= this.timeout) {

								this.skippers = _.remove(this.skippers, x => x.user = user);

								let end = this.skipEndpoint + '?p=' + this.password;

								request(end, function (error, response, body) {

									if (typeof body !== 'undefined') {
										if (body !== '') {
											res.push(body);
										}
									}

									if (error) {
										return reject(new Error(error));
									}

									if (response.statusCode !== 200) {
										return reject(new Error('bad status code'));
									}

									resolve(res);

								});

							} else {

								resolve(['cool your jets, man. wait a few minutes and try again.']);

							}
							
						}

						break;
				}

			} else {

				let end = this.playingEndpoint;

				request(end, function (error, response, body) {

					if (typeof body !== 'undefined') {
						if (body !== '') {
							res.push(body);
						}
					}

					if (error) {
						return reject(new Error(error));
					}

					if (response.statusCode !== 200) {
						return reject(new Error('bad status code'));
					}

					resolve(res);

				});

			}

		}.bind(this));

	}

};
