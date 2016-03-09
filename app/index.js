'use strict';

// required dependencies
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    prompting: function() {
        var done = this.async();

        var messages = [
            {
                type: 'input',
                name: 'appName',
                message: 'What is your application\'s name ?',
                // Default to the project's folder name
                default: this.appname
            }, {
                type: 'input',
                name: 'version',
                message: 'version ?',
                default: '1.0.0'
            }
        ];

        this.prompt(messages, function (answers) {
            this.props = answers;
            done();
        }.bind(this));
    },
    
    writing: {
        // Copy the configuration files
        config: function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), {
                    name: this.props.name,
                    version: this.props.version
                }
            );
            this.fs.copyTpl(
                this.templatePath('_tsconfig.json'),
                this.destinationPath('tsconfig.json')
            );
            this.fs.copyTpl(
                this.templatePath('_typings.json'),
                this.destinationPath('typings.json')
            );
            this.fs.copyTpl(
                this.templatePath('_README.md'),
                this.destinationPath('README.md'), {
                    name: this.props.name,
                }
            );
        },
        
        // Copy application files
        app: function() {
            // TODO update bootstrap with name (as CamelCase)
            this.fs.copyTpl(
                this.templatePath('app/_main.ts'),
                this.destinationPath('app/main.ts')
            );
            this.fs.copyTpl(
                this.templatePath('app/_app.component.ts'),
                this.destinationPath('app/app.component.ts')
            );
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('index.html')
            );
        },
        // Install dependencies
        install: function() {
            this.installDependencies();
        }
    }
});