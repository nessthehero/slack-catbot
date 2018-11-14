const request = require('request');

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
				let t = [];

				if (typeof puppers.data.children !== 'undefined') {
					for (let i in puppers.data.children) {
						if (puppers.data.children.hasOwnProperty(i)) {

							if (!puppers.data.children[i].data.over_18) { // No bad things

								if (!puppers.data.children[i].data.is_video) { // No straight up videos

									if (!puppers.data.children[i].data.stickied) { // Ignore sticky threads (likely announcements)

										if (typeof puppers.data.children[i].data.preview !== 'undefined') {

											let url = puppers.data.children[i].data.url;
											let title = puppers.data.children[i].data.title;

											t.push(title);

											if (url.indexOf('.gifv') > -1) {
												p.push(url);
											} else {

												if (typeof puppers.data.children[i].data.preview.images[0].variants.gif !== 'undefined') {
													p.push(puppers.data.children[i].data.preview.images[0].variants.gif.source.url);
												} else {
													if (typeof puppers.data.children[i].data.preview.images[0].source.url !== 'undefined') {
														p.push(puppers.data.children[i].data.preview.images[0].source.url);
													}
												}

											}

										}

									}

								}

							}

						}
					}
				}

				if (p.length > 0) {
					let rnum = Math.floor(Math.random() * p.length)
					let rando = p[rnum];
					let rtitle = t[rnum];

					res.push(rando);
					res.push(rtitle);
				} else {
					res.push('I couldn\'t find any puppers =(');
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
