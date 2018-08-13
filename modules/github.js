const GitHubApi = require('@octokit/rest');
const config = require('../bot.json');

module.exports = {

	github: new GitHubApi(),

	aliases: [
		{
			'key': 'scss',
			'repo': 'brei-sass-boilerplate'
		},
		{
			'key': 'mixins',
			'repo': 'brei-sass-mixins'
		},
		{
			'key': 'helpers',
			'repo': 'brei-assemble-helpers'
		},
		{
			'key': 'hbs',
			'repo': 'brei-assemble-structure'
		},
		{
			'key': 'grunt',
			'repo': 'brei-grunt-config'
		},
		{
			'key': 'gen',
			'repo': 'generator-brei-app'
		},
		{
			'key': 'meta',
			'repo': 'meta-repository'
		}
	],

	auth: function () {

		this.github.authenticate({
			type: 'basic',
			username: config.config.github.username,
			password: config.config.github.password
		});

	},

	call: function () {

		let args = arguments;
		let response = [];

		return new Promise(function (resolve, reject) {

			if (args.length > 0) {

				// console.log(args);

				let params = args[0].split(' ');

				// console.log('params', params);

				let method = params.shift();

				// console.log('method', method);

				switch (method) {
					case '?':
					default:

						response.push("gh issue <repo or alias> <issue title>");

						let aliases = [];
						for (let j in this.aliases) {
							aliases.push(this.aliases[j].key);
						}

						if (aliases.length > 0) {
							response.push("Repo Aliases: " + aliases.join(' / '));
						}

						resolve(response);

						break;
					case 'issue':

						// console.log('issue?');

						let repo = this.getAlias(params.shift());

						let title = params.join(' ');

						// console.log(repo);
						// console.log(title);

						this.auth();

						this.github.issues.create({
							owner: 'BarkleyREI',
							repo: repo,
							title: title
						}).then(function (data) {

							// console.log('success');
							// console.log(data);

							response.push('Repo: ' + repo + '; Created issue: "' + title + '"');

							resolve(response);

						}, function (err) {

							let code = err.code;

							switch (code) {

								case 404:

									response.push('That repo does not exist. Could not create a ticket.');

									break;
								default:

									response.push('Unhandled error: ' + code);

									break;

							}

							reject(response);

						});

						break;
				}

			} else {
				response.push('(shrug)');
				console.error('problem with arguments');
				reject(response);
			}

		}.bind(this));

	},

	getAlias: function (alias) {

		for (let j in this.aliases) {
			if (alias === this.aliases[j].key) {
				return this.aliases[j].repo;
			}
		}

		return alias;

	}

};
