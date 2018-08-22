const util = require('util');
const request = require('request');
const https = require('https');

module.exports = {

	puppers: 'http://reddit.com/r/rarepuppers.json',

	get: function () {

		let res = [];
		let puppers = {};
		let end = this.puppers;

		return new Promise(function (resolve, reject) {

			request(end, function (error, response, body) {

				puppers = JSON.parse(body);
				let p = [];

				if (typeof puppers.data.children !== 'undefined') {
					for (let i in puppers.data.children) {
						if (puppers.data.children.hasOwnProperty(i)) {

							if (!puppers.data.children[i].data.over_18) {

								if (!puppers.data.children[i].data.is_video) {

									if (typeof puppers.data.children[i].data.preview.images[0].source.url !== 'undefined') {
										p.push(puppers.data.children[i].data.preview.images[0].source.url);
									}

									// if (typeof puppers.data.children[i].data.url !== 'undefined') {
									// 	p.push(puppers.data.children[i].data.url);
									// }

								}

							}

						}
					}
				}

				if (p.length > 0) {
					let rando = p[Math.floor(Math.random()*p.length)];

					// console.log('rando is ', rando);

					res.push(rando);

				} else {
					res.push("I couldn't find any puppers =(");
				}

				if (error) {
					return reject(new Error(error));
				}

				if (response.statusCode !== 200) {
					return reject(new Error('bad status code'));
				}

				resolve(res);

			});

			// let options = {
			// 	method: 'HEAD',
			// 	host: this.bukkit,
			// 	port: 443,
			// 	path: '/' + gif
			// };
			//
			// let req = https.get(options, function (r) {
			//
			// 	console.log(r.statusCode);
			//
			// 	if (r.statusCode === 200) {
			// 		response.push('https://' + options.host + '/' + gif);
			// 		resolve(response);
			// 	} else {
			// 		reject(response);
			// 	}
			//
			// });
			//
			// req.on('error', function (e) {
			// 	reject(response);
			// 	console.error('problem with request: ', e);
			// });

		}.bind(this));

	}

};
