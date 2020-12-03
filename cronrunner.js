const cron = require('./modules/cron.js');

let cronInterval = null;

clearInterval(cronInterval);
cronInterval = setInterval(function () {

	let tasks = cron.init();

	for (let i in tasks) {
		if (tasks.hasOwnProperty(i)) {

			let task = tasks[i];

			process.send(task);

		}
	}

}, 10000);
