/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

module.exports = function (plop) {
    plop.setGenerator('controller', {
        description: 'Add a container component Action',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Controller Name, What should it be called?',
            default: "sample"
        },
        {
            type: 'input',
            name: 'action',
            message: 'Action Name, What should it be called?',
            default: "action"
        },
        {
            type: 'confirm',
            name: 'wantDb',
            default: false,
            message: 'Do you want db?',
        },
        ],
        actions: [{
            type: 'add',
            path: '../src/controllers/{{camelCase name}}/{{camelCase action}}.js',
            templateFile: 'templates/controller.js',
            abortOnFail: true,
        }]
    });
};