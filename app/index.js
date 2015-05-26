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

		var prompts = [{
			type: 'input',
			name: 'componentName',
			message: 'What is the name of the component?',
			default: 'NewComponent'
		}];

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
			this.template('client/jspm_packages/stash/CGSDP/base/_package.json', 'jspm_packages/stash/CGSDP/'+ this.componentKey +'/package.json');
		},

		clientfiles: function() {
			this.template('client/jspm_packages/stash/CGSDP/base/css/_style.scss', 'jspm_packages/stash/CGSDP/'+ this.componentKey +'/css/_style.scss');
			this.template('client/jspm_packages/stash/CGSDP/base/_.jspm.json', 'jspm_packages/stash/CGSDP/'+ this.componentKey +'/.jspm.json');
			this.template('client/jspm_packages/stash/CGSDP/_index.js', 'jspm_packages/stash/CGSDP/'+ this.componentKey +'.js');
			this.directory('client/jspm_packages/stash/CGSDP/base/lib', 'jspm_packages/stash/CGSDP/'+ this.componentKey +'/lib');

		}
	},

	install: function () {
		this.npmInstall();
	},

	end: function() {
		var chdir = this.createDirectory ? '"cd ' + this.componentKey + '" then ' : '';
		this.log(
			'\n' + chalk.green.underline('Your new React Component is ready!')
		);
	}

});

module.exports = ReactSDPGenerator;
