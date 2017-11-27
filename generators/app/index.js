'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var rename = require("gulp-rename");

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function makeSalt() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-;:<>,./?|";

	for ( var i=0; i < 64; i++ ) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the awesome ' + chalk.red('WireDot WordPress') + ' Generator! v1.1.1'
		));

		var prompts = [{
			name: 'themeName',
			message: 'Theme name',
			default : replaceAll(this.appname, ' ', '.')
		},
		{
			name: 'themeDir',
			message: 'Theme directory',
			default : replaceAll(this.appname, ' ', '.')
		},
		{
			name: 'themeDescription',
			message: 'Theme description',
			default : 'Theme for ' + replaceAll(this.appname, ' ', '.')
		},
		{
			name: 'themeUrl',
			message: 'Theme Url',
			default : replaceAll(this.appname, ' ', '.')
		},
		{
			name: 'dbDatabase',
			message: 'Database name',
			default : replaceAll(this.appname, ' ', '_')
		},
		{
			name: 'dbUsername',
			message: 'Database Username',
			default : 'admin'
		},
		{
			name: 'dbPassword',
			message: 'Database Password',
			default : 'pass'
		},
		{
			name: 'dbHost',
			message: 'Database Host',
			default : 'localhost'
		},
		{
			name: 'dbPrefix',
			message: 'Database Prefix',
			default : 'wp' + ( Math.floor( Math.random() * 999 ) + 1 ) + '_'
		},
		{
			type: 'confirm',
			name: 'gitInit',
			message: 'Init Git?',
			default : true
		},
		{
			type: 'confirm',
			name: 'npmInit',
			message: 'Init npm packages?',
			default : true
		}];

		this.prompt(prompts, function (props) {
			this.props = props;

			done();
		}.bind(this));
	},

	writing: function () {
		var THAT = this;
		this.registerTransformStream(
			rename(function(path) {
				path.basename = path.basename.replace(/(copernicus-blank)/g, THAT.props.themeDir);
				path.dirname = path.dirname.replace(/(copernicus-blank)/g, THAT.props.themeDir);
			})
		);

		this.fs.copy(
			this.templatePath('copernicus-blank/**/*'),
			this.destinationPath(''), {
				themeDir: this.props.themeDir
			}
		);

		this.fs.copyTpl(
			this.templatePath('copernicus-blank/_gitignore'),
			this.destinationPath('.gitignore'),
			{
				themeDir: this.props.themeDir
			}
		);

		this.fs.delete('_gitignore');

		this.fs.copyTpl(
			this.templatePath('copernicus-blank/bower.json'),
			this.destinationPath('bower.json'),
			{
				themeName: this.props.themeName
			}
		);

		this.fs.copyTpl(
			this.templatePath('copernicus-blank/package.json'),
			this.destinationPath('package.json'),
			{
				themeName: this.props.themeName,
				themeDescription: this.props.themeDescription
			}
		);

		this.fs.copyTpl(
			this.templatePath('copernicus-blank/wp-config.php'),
			this.destinationPath('wp-config.php'),
			{
				authKey: makeSalt(),
				secureAuthKey: makeSalt(),
				loggedInKey: makeSalt(),
				nonceKey: makeSalt(),
				authSalt: makeSalt(),
				secureAuthSalt: makeSalt(),
				loggedInSalt: makeSalt(),
				nonceSalt: makeSalt()
			}
		);

		this.fs.copyTpl(
			this.templatePath('copernicus-blank/.bowerrc'),
			this.destinationPath('.bowerrc'),
			{
				themeDir: this.props.themeDir
			}
		);

		this.fs.copyTpl(
			this.templatePath('copernicus-blank/.env'),
			this.destinationPath('.env'),
			{
				dbDatabase: this.props.dbDatabase,
				dbUsername: this.props.dbUsername,
				dbPassword: this.props.dbPassword,
				dbHost: this.props.dbHost,
				dbPrefix: this.props.dbPrefix
			}
		);

		this.fs.copyTpl(
			this.templatePath('copernicus-blank/public/content/themes/copernicus-blank/style.css'),
			this.destinationPath('public/content/themes/' + this.props.themeDir + '/style.css'),
			{
				themeName: this.props.themeName,
				themeDescription: this.props.themeDescription,
				themeUrl: this.props.themeUrl
			}
		);

		this.fs.copyTpl(
			this.templatePath('copernicus-blank/public/content/themes/copernicus-blank/src/scss/style.scss'),
			this.destinationPath('public/content/themes/' + this.props.themeDir + '/src/scss/style.scss'),
			{
				themeName: this.props.themeName
			}
		);
	},

	install: function () {
		if (this.props.gitInit) {
			this.spawnCommand('git', ['init']);
		}
		this.spawnCommand('composer', ['install']);
		this.bowerInstall();
		if (this.props.npmInit) {
			this.npmInstall();
		}
	}
});
