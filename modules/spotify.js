const util = require('util');
const request = require('request');
const config = require('../bot.json');

module.exports = {

	endpoint: 'https://spotify.ianmoffitt.dev/now.php',

	get: function () {

		let res = [];
		let playing = '';
		let end = this.endpoint;

		return new Promise(function (resolve, reject) {

			request(end, function (error, response, body) {

				playing = body;

				if (typeof playing !== 'undefined') {
					if (playing !== '') {
						res.push(playing);
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

		}.bind(this));

	}

};
