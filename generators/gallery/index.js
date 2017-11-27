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
			'Welcome to the awesome ' + chalk.red('WireDot WordPress') + ' Gallery Generator!'
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

		this.fs.copy(
			this.destinationPath('public/content/themes/' + this.props.themeDir + '/config/css.config.php'), 
			this.destinationPath('public/content/themes/' + this.props.themeDir + '/config/css.config.php'), 
			{
				process: function(content) {
					var regEx = new RegExp('\'style\' => \'assets/css/style.css\',', 'g');
					var newContent = content.toString().replace(regEx, '\'fancybox\' => \'assets/bower/fancybox/dist/jquery.fancybox.css\',' + 
						'\n\t\t' +
						'\'style\' => \'assets/css/style.css\','
						);
					return newContent;
				}
			}
		);

		this.fs.copy(
			this.destinationPath('public/content/themes/' + this.props.themeDir + '/config/js.config.php'), 
			this.destinationPath('public/content/themes/' + this.props.themeDir + '/config/js.config.php'), 
			{
				process: function(content) {
					var regEx = new RegExp('\'script\' => \'assets/js/script.js\',', 'g');
					var newContent = content.toString().replace(regEx, '\'fancybox\' => \'assets/bower/fancybox/dist/jquery.fancybox.js\',' + 
						'\n\t\t' +
						'\'script\' => \'assets/js/script.js\','
						);
					return newContent;
				}
			}
		);
	},

	install: function () {
		this.bowerInstall('fancybox --save');
	}
});
