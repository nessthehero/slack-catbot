const crontab = require('../cron.json');
const parser = require('cron-parser');

module.exports = {

	init: function () {

		let now = new Date();

		let isHappening = crontab.tasks.filter(item => {
			let occ = parser.parseExpression(item.interval);
			let diff = occ.next().getTime() - now.getTime();
			let seconds = Math.floor(diff / 1000 % 60);
			return item.active && (seconds <= 11);
		});

		return isHappening;

	}

};
