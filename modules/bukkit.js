const util = require('util');
const request = require('request');
const https = require('https');
const config = require('../bot.json');

module.exports = {

	bukkit: config.config.bukkit.bukkit,

	get: function (gif) {

		let response = [];

		return new Promise(function (resolve, reject) {

			let options = {
				method: 'HEAD',
				host: this.bukkit,
				port: 443,
				path: '/' + gif
			};

			let req = https.get(options, function (r) {

				console.log(r.statusCode);

				if (r.statusCode === 200) {
					response.push('https://' + options.host + '/' + gif);
					resolve(response);
				} else {
					reject(response);
				}

			});

			req.on('error', function (e) {
				reject(response);
				console.error('problem with request: ', e);
			});

		}.bind(this));

	}

};
