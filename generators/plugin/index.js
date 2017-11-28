'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var rename = require("gulp-rename");

function installPlugin(plugin, that) {
	var done = that.async();
	that.tarball('http://downloads.wordpress.org/plugin/' + plugin + '.zip', that.destinationPath('public/content/plugins/'), done);
}

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async(),
			me = this;

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the awesome ' + chalk.red('WireDot WordPress') + ' Plugin Downloader!'
		));

		var prompts = [{
			type: 'confirm',
			name: 'security',
			message: 'Install iThemes Security?',
			default : true
		},{
			type: 'confirm',
			name: 'ninja',
			message: 'Install Ninja Forms?',
			default : true
		},{
			type: 'confirm',
			name: 'userswitching',
			message: 'Install User Switching?',
			default : true
		},{
			type: 'confirm',
			name: 'order',
			message: 'Install Simple Page Ordering?',
			default : true
		},];

		this.prompt(prompts, function (props) {
			this.props = props;

			done();
		}.bind(this));
	},

	writing: function () {
	},

	install: function () {
		if (this.props.security) {
			installPlugin('better-wp-security', this);
		}
		
		if (this.props.ninja) {
			installPlugin('ninja-forms', this);
		}
		
		if (this.props.order) {
			installPlugin('simple-page-ordering', this);
		}

		if (this.props.userswitching) {
			installPlugin('user-switching', this);
		}
	}
});
