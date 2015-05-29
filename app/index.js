'use strict';
var chalk = require('chalk'),
	yeoman = require('yeoman-generator');

var ReactSDPGenerator = yeoman.generators.Base.extend({

	initializing: function() {
		this.pkg = require('../package.json');
	},

	prompting: function() {
		var done = this.async();

		this.log(
			'\n' + chalk.bold.underline('Welcome to the React SDP Component Generator')
		);

		var prompts = [
		{
			type: 'input',
			name: 'projectName',
			message: 'What is the name of the project?',
			store: true,
			default: 'MyApp'
		},
		{
			type: 'input',
			name: 'componentName',
			message: 'What is the name of the component?',
			store: true,
			default: 'NewComponent'
		}
		];

		this.prompt(prompts, function (props) {
			this.log('\n');
			this._.extend(this, props);
			this.componentKey = this._.slugify(this.componentName).toLowerCase();
			if (props.createDirectory) {
				this.destinationRoot(this.componentKey);
			}
			done();
		}.bind(this));
	},

	writing: {
		project: function () {
			this.template('client/base/_package.json', 'package.json');
			this.template('client/base/_config.js', 'config.js');
			this.template('client/base/.gitignore', '.gitignore');
			this.directory('client/base/_git', '.git');
		},

		clientfiles: function() {
			this.template('client/base/css/_style.scss', 'lib/css/_style.scss');
			this.template('client/base/lib/_main.js', 'lib/main.js');
			this.template('client/base/__tests__/_test.js', '__tests__/'+this.componentKey+'-test.js');
			this.template('client/_index.js', 'index.js');
		}
	},

	install: function () {
		this.npmInstall();
	},

	end: function() {
		/*
		this.spawnCommand('jspm', ['install']);
		if(this.repoType == 'stash'){
			this.spawnCommand('jspm', ['registry create stash jspm-git']);
			this.spawnCommand('jspm', ['registry config stash']);
			this.spawnCommand('jspm', ['install stash:' + this.projectName +'/' + this.componentKey]);
		}
		*/
		var chdir = this.createDirectory ? '"cd ' + this.componentKey + '" then ' : '';
		this.log(
			'\n' + chalk.green.underline('Your new React Component is ready!')
		);
	}

});

module.exports = ReactSDPGenerator;
