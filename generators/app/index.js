'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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
      'Welcome to the awesome ' + chalk.red('WireDot WordPress') + ' Generator!'
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
      this.templatePath('skeleton/**/*'),
      this.destinationPath('')
    );

    this.fs.copy(
      this.templatePath('theme/**/*'),
      this.destinationPath('public/content/themes/' + this.props.themeDir)
    );

    this.fs.copyTpl(
      this.templatePath('skeleton/_gitignore'),
      this.destinationPath('.gitignore'),
      {
        themeDir: this.props.themeDir
      }
    );

    this.fs.delete('_gitignore');

    this.fs.copyTpl(
      this.templatePath('skeleton/bower.json'),
      this.destinationPath('bower.json'),
      {
        themeName: this.props.themeName
      }
    );

    this.fs.copyTpl(
      this.templatePath('skeleton/wp-config.php'),
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
      this.templatePath('skeleton/.bowerrc'),
      this.destinationPath('.bowerrc'),
      {
        themeDir: this.props.themeDir
      }
    );

    this.fs.copyTpl(
      this.templatePath('skeleton/.env'),
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
      this.templatePath('theme/style.css'),
      this.destinationPath('public/content/themes/' + this.props.themeDir + '/style.css'),
      {
        themeName: this.props.themeName,
        themeDescription: this.props.themeDescription,
        themeUrl: this.props.themeUrl
      }
    );

    this.fs.copyTpl(
      this.templatePath('theme/src/scss/style.scss'),
      this.destinationPath('public/content/themes/' + this.props.themeDir + '/src/scss/style.scss'),
      {
        themeName: this.props.themeName
      }
    );
  },

  install: function () {
    this.spawnCommand('composer', ['install']);
    this.spawnCommand('bower', ['update']);
    if (this.props.gitInit) {
      this.spawnCommand('git', ['init']);
    }
    this.bowerInstall();
  }
});
