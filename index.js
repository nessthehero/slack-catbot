const Bot = require('slackbots');
const fs = require('fs');

const config = require('./bot.json');
const megahal = require('jsmegahal');

const bukkit = require('./modules/bukkit.js');
const pokemon = require('./modules/pokemon.js');
const github = require('./modules/github.js');
const doggos = require('./modules/doggo.js');
const spotify = require('./modules/spotify.js');
const weather = require('./modules/weather.js');

const Accessor = require('Accessor');

const fork = require('child_process').fork;
const cronrunner = fork(__dirname + '/cronrunner.js');

cronrunner.on('message', function (task) {

	switch (task.task) {

		case 'say':

			warmUp();
			say(task.args, task.groups);
			cooldown();

			break;
		case 'weather':

			warmUp();

			weather.get(config.config.weather.lat, config.config.weather.lon).then(function (weather) {
				say(weather, task.groups);
				cooldown();
			});

			break;
		case 'alerts':

			weather.getAlerts(config.config.weather.lat, config.config.weather.lon, false).then(function (alerts) {
				say(alerts, task.groups);
				cooldown();
			});

			break;
		default:
			break;

	}

});

let cooldownFlag = false;
let requestInMotionFlag = false;

// https://github.com/mishk0/slack-bot-api

// create a bot
const settings = config.env;
const bot = new Bot(settings);

let __channels = [];
let __groups = [];
let __users = [];

let markov = __dirname + '/markov.txt';

const hal = new megahal(4);

bot.on('start', function () {

	let _channels = bot.getChannels();
	let channels = _channels._value.channels;
	for (let i in channels) {
		if (channels.hasOwnProperty(i)) {
			__channels[channels[i]['id']] = channels[i]['name'];
		}
	}

	let _groups = bot.getGroups();
	let groups = _groups._value.groups;
	for (let i in groups) {
		if (groups.hasOwnProperty(i)) {
			__groups[groups[i]['id']] = groups[i]['name'];
		}
	}

	let _users = bot.getUsers();
	let users = _users._value.users;
	for (let i in users) {
		if (users.hasOwnProperty(i)) {
			__users[users[i]['id']] = users[i]['name'];
		}
	}

	fs.readFile(markov, 'utf8', function (err, data) {
		hal.addMass(data);
	});

	weather.prefillAlerts(config.config.weather.lat, config.config.weather.lon).then(function (weather) {
		cooldown();
	});

	debug('ping? pong!');

});

bot.on('message', function (data) {

	// console.log(data);

	if (typeof data.text !== 'undefined') {

		let message = data.text;
		let whom = data.user;
		let msg = message.split(' ');

		if (meetsCriteria('data', data)) {

		}

		if (meetsCriteria('weather', data)) {

			if (canDo()) {

				warmUp();

				let channel = data.channel;

				weather.getAlerts(config.config.weather.lat, config.config.weather.lon, true).then(function (weather) {
					say(weather, channel);
					cooldown();
				}, function (error) {
					say(error, channel);
					cooldown();
				});

			}

		}

		// Pokemon
		if (meetsCriteria('pokemon', data)) {
			if (msg[0] === 'pokemon' &&
				typeof msg[2] === 'undefined') {

				warmUp();

				if (msg[1] !== 'help') {
					say([':pikachu: Looking up: ' + msg[1]], data.channel);
				}

				pokemon.retrieve(msg[1]).then(function (res) {
					say(res, data.channel);

					cooldown();
				}.bind(this), function (error) {
					let rr = [':shrug: [whoopsie: ' + error + ']'];
					say(rr, data.channel);
					console.log(error);

					cooldown();
				}.bind(this));

			}
		}

		if (meetsCriteria('speak', data)) {

			if (canDo()) {

				warmUp();

				let msg = message.split(' ');

				let channel = data.channel;

				if (msg[0] === 'catbot' && (msg[1] === 'help' || msg[1] === '?')) {

					let response = [
						'I am catbot! You can talk to me and I might reply. I like hearing my name.',
						'Other commands: `pokemon`, `gh`, `bukkit`, `!doggo`, `!weather`'
					];

					say(response, channel);

				} else {

					let room = channelOrGroup(channel);

					let messageSansName = message.replace(/catbot/i, '');

					messageSansName = fixMessage(messageSansName);

					if (room === 'room') { // Only log public rooms

						writeToLog(__dirname + '/markov.txt', messageSansName);

						hal.addMass(messageSansName);

					}

					setTimeout(function () {

						say([hal.getReplyFromSentence(messageSansName)], data.channel);

					}.bind(this), 1500);

				}

				cooldown();

			}

		}

		if (meetsCriteria('github', data)) {

			if (canDo()) {

				warmUp();

				let channel = data.channel;

				let msg = message.split(' ');
				let clean = msg.shift();
				msg = msg.join(' ');

				github.call(msg).then(function (data) {
					say(data, channel);
					cooldown();
				}, function (error) {
					say(error, channel);
					cooldown();
				});

			}

		}

		if (meetsCriteria('doggo', data)) {

			if (canDo()) {

				warmUp();

				let channel = data.channel;

				doggos.get().then(function (res) {
					say(res, channel);
					cooldown();
				}, function (error) {
					say(error, channel);
					cooldown();
				});

			}

		}

		if (meetsCriteria('spotify', data)) {

			if (canDo()) {

				warmUp();

				let channel = data.channel;

				let msg = message.split(' ');
				let clean = msg.shift();
				msg = msg.join(' ');

				spotify.call(msg, whom).then(function (res) {
					say(res, channel);
					cooldown();
				}, function (error) {
					say(error, channel);
					cooldown();
				});

			}

		}

		if (meetsCriteria('bukkit', data)) {

			if (canDo()) {

				warmUp();

				let msg = message.split(' ');
				let channel = data.channel;

				let gif = '';

				if (message[0] === '!') {
					gif = msg[0].replace('!', '');
				} else {
					gif = msg[1];
				}

				if (gif === 'help' || gif === '?') {

					let response = [
						'Output a gif from Ians Bukkit site. https://bukkit.ianmoffitt.co',
						'Format: `!name.gif` or `bukkit name.gif`'
					];

					say(response, channel);
					cooldown();

				} else {

					bukkit.get(gif).then(function (data) {
						say(data, channel);
						cooldown();
					}, function (error) {
						cooldown();
					});

				}

			}

		}

		if (canDo()) {

			let msg = message.split(' ');

			if (msg[0] !== 'pokemon') {

				let channel = data.channel;

				let room = channelOrGroup(channel);

				if (room === 'room') { // Only log public rooms

					let messageSansName = message.replace(/catbot/i, '');

					messageSansName = fixMessage(messageSansName);

					writeToLog(__dirname + '/markov.txt', messageSansName);

					hal.addMass(messageSansName);

				}

			}

		}

	}

});

function channelOrGroup(channel) {

	let ret = '';

	if (typeof channel !== 'undefined') {

		if (typeof __channels[channel] !== 'undefined') {
			ret = 'channel';
		} else if (typeof __groups[channel] !== 'undefined') {
			ret = 'group';
		} else if (typeof __users[channel] !== 'undefined') {
			ret = 'user';
		} else {
			console.log('what is this?', channel);
		}

	}

	return ret;

}

function meetsCriteria(tool, data) {

	let toolConfig = config['config'][tool];
	let validMatch = false;
	let validRoom = false;
	let validGroup = false;
	let type = channelOrGroup(data.channel);
	let message = data.text;

	if (typeof type === 'undefined') {
		type = 'room';
	}

	if (typeof toolConfig !== 'undefined' && toolConfig !== '' && toolConfig !== null) {

		if (typeof toolConfig['room'] !== 'undefined') {

			let rooms = toolConfig['room'];

			for (let i in rooms) {
				if (rooms.hasOwnProperty(i)) {

					if (rooms[i] === __channels[channel]) {
						validRoom = true;
					}

				}
			}

			for (let i in groups) {
				if (groups.hasOwnProperty(i)) {

					if (groups[i] === __groups[channel]) {
						validGroup = true;
					}

				}
			}

		} else {
			validRoom = true;
		}

		if (typeof toolConfig['regex'] !== 'undefined') {
			let regex = new RegExp(toolConfig['regex'], 'i');

			if (message.match(regex) !== null) {
				validMatch = true;
			}
		}
	}

	return (validMatch && validRoom);

}

function validRegex(regex, message) {
	let rgx = new RegExp(regex, 'i');

	return message.match(rgx) !== null;
}

function sayMulti(response, channels) {

	if (channels.length > 0) {

		for (let i in channels) {
			if (channels.hasOwnProperty(i)) {
				say(response, channels[i]);
			}
		}

	}

}

function say(response, channel) {

	if (typeof channel === 'object') {

		sayMulti(response, channel);

	} else {

		let room = channelOrGroup(channel);

		// const message = response.reverse();

		if (room === 'channel') {
			sayChannel(response, __channels[channel]);
		}

		if (room === 'group') {
			sayGroup(response, __groups[channel]);
		}

		if (room === 'user') {
			sayUser(response, __users[channel]);
		}

	}

}

function sayGroup(response, channel) {
	bot.postMessageToGroup(channel, response.join('\n'));
}

function sayChannel(response, channel) {
	bot.postMessageToChannel(channel, response.join('\n'));
}

function sayUser(response, channel) {
	bot.postMessageToUser(channel, response.join('\n'));
}

function canDo() {
	return !requestInMotionFlag && !cooldownFlag;
}

function warmUp() {
	requestInMotionFlag = true;
}

function cooldown() {

	requestInMotionFlag = false;
	cooldownFlag = true;

	setTimeout(function () {
		cooldownFlag = false;
	}, 2000);

}

function fixMessage(message) {

	if (message.search(/[.!?,;:]$/) === -1) {
		message += '.';
	}

	message.replace(' .', '.');

	return message;

}

function writeToLog(file, text) {

	text = fixMessage(text);

	fs.appendFile(file, text + '\r\n', function (err) {
		if (err) return console.log(err);
	});

}

function debug(message) {
	if (config.debug.length > 0) {
		say([message], config.debug);
	}
}
