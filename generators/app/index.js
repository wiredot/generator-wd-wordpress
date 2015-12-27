'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the hunky-dory ' + chalk.red('generator-wd-wordpress') + ' generator!'
    ));

    var prompts = [{
      name: 'themeName',
      message: 'Theme name',
      default : this.appname
    },
    {
      name: 'themeDir',
      message: 'Theme directory',
      default : this.appname
    },
    {
      name: 'themeUrl',
      message: 'Theme Url',
      default : this.appname
    },
    {
      name: 'dbDatabase',
      message: 'Database name',
      default : this.appname
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
    }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('main'),
      this.destinationPath('')
    );

    this.fs.copy(
      this.templatePath('theme'),
      this.destinationPath('public/content/themes/' + this.props.themeName)
    );

     this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      {themeName: this.props.themeName}
    );

     this.fs.copyTpl(
      this.templatePath('style.css'),
      this.destinationPath('public/content/themes/' + this.props.themeName + '/style.css'),
      {themeName: this.props.themeName}
    );

     this.fs.copyTpl(
      this.templatePath('.bowerrc'),
      this.destinationPath('.bowerrc'),
      {themeName: this.props.themeName}
    );

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
  },

  install: function () {
    //this.spawnCommand('composer', ['install']);
    if (this.props.gitInit) {
      this.spawnCommand('git', ['init']);
    }
    //this.bowerInstall();
  }
});
