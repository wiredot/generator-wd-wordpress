'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const rename = require("gulp-rename");

module.exports = class extends Generator {
  prompting() {
	// Have Yeoman greet the user.
	this.log(
	  yosay(`Welcome to the kryptonian ${chalk.red('generator-wp-wordpress')} generator!`)
	);

	const prompts = [{
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
			name: 'themeLangDomain',
			message: 'Theme Language Domain',
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
		}];

	return this.prompt(prompts).then(props => {
	  // To access props later use this.props.someAnswer;
	  this.props = props;
	});
  }

  writing() {
	const THAT = this;
	this.registerTransformStream(
		rename(function(path) {
			path.basename = path.basename.replace(/(copernicus-blank)/g, THAT.props.themeDir);
			path.dirname = path.dirname.replace(/(copernicus-blank)/g, THAT.props.themeDir);
		})
	);

	this.fs.copyTpl(
			this.templatePath('**/*'),
			this.destinationPath(''), {
				themeName: this.props.themeName,
				themeDir: this.props.themeDir,
				themeDescription: this.props.themeDescription,
				themeUrl: this.props.themeUrl,
				themeLangDomain: this.props.themeLangDomain,
				authKey: makeSalt(),
				secureAuthKey: makeSalt(),
				loggedInKey: makeSalt(),
				nonceKey: makeSalt(),
				authSalt: makeSalt(),
				secureAuthSalt: makeSalt(),
				loggedInSalt: makeSalt(),
				nonceSalt: makeSalt(),
				dbDatabase: this.props.dbDatabase,
				dbUsername: this.props.dbUsername,
				dbPassword: this.props.dbPassword,
				dbHost: this.props.dbHost,
				dbPrefix: this.props.dbPrefix,
				error_message: '%= error.message %'
			}
		);

		this.fs.copyTpl(
			this.templatePath('_gitignore'),
			this.destinationPath('.gitignore'),
			{
				themeDir: this.props.themeDir
			}
		);

		this.fs.delete('_gitignore');

		this.fs.copy(
			this.templatePath('public/_htaccess'),
			this.destinationPath('public/.htaccess')
		);
		
		this.fs.delete('public/_htaccess');

		this.fs.copy(
			this.templatePath('public/content/themes/copernicus-blank/assets/.yarnrc'),
			this.destinationPath('public/content/themes/' + THAT.props.themeDir + '/assets/.yarnrc')
		);

		this.fs.delete('public/content/themes/' + THAT.props.themeDir + '/gulpfile.js');

		this.fs.copy(
			this.templatePath('public/content/themes/' + THAT.props.themeDir + '/_gulpfile.js'),
			this.destinationPath('public/content/themes/' + THAT.props.themeDir + '/gulpfile.js')
		);

		this.fs.delete('public/content/themes/' + THAT.props.themeDir + '/_gulpfile.js');

		this.fs.copyTpl(
			this.templatePath('.env'),
			this.destinationPath('.env'),
			{
				dbDatabase: this.props.dbDatabase,
				dbUsername: this.props.dbUsername,
				dbPassword: this.props.dbPassword,
				dbHost: this.props.dbHost,
				dbPrefix: this.props.dbPrefix
			}
		);
  }

  install() {
	this.spawnCommand('git', ['init']);
	this.spawnCommand('composer', ['install']);
	this.spawnCommand('yarn', ['install', '--cwd', './public/content/themes/' + this.props.themeDir + '/assets']);
	this.spawnCommand('yarn', ['install', '--cwd', './public/content/themes/' + this.props.themeDir]);
  }

  end() {
	// this.spawnCommand('gulp');
  }
};

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
