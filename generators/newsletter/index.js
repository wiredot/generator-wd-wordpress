'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var rename = require("gulp-rename");

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the awesome ' + chalk.red('WireDot WordPress') + ' Generator! v1.1.1'
		));

		var prompts = [{
			name: 'themeDir',
			message: 'Theme directory',
			default : replaceAll(this.appname, ' ', '.')
		}];

		this.prompt(prompts, function (props) {
			this.props = props;
			done();
		}.bind(this));
	},

	writing: function () {
		this.fs.copy(
			this.templatePath('**/*'),
			this.destinationPath('public/content/themes/' + this.props.themeDir + '/')
		);
	},

	install: function () {
		this.spawnCommand('composer', ['require', 'drewm/mailchimp-api']);
	}
});
