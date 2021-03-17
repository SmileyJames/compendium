module.exports = (plop) => {
  plop.setGenerator('game', {
    description: 'A game added to the compendium and storybook',
    prompts: [
      {
        type: 'input',
        name: 'kebab-case',
        message: 'Please enter the name of your game. (lower-cased-kebab-sticked)'
      },
      {
        type: 'input',
        name: 'CamelCasedName',
        message: 'Please enter the name of your game. (CamelCased)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'compendium/{{kebab-case}}/src/index.js',
        templateFile: 'plop-templates/index.js.hbs'
      },
      {
        type: 'add',
        path: 'package.json',
        templateFile: 'plop-templates/package.json.hbs'
      },
      {
        type: 'add',
        path: 'package.json',
        templateFile: 'plop-templates/package.json.hbs'
      }
    ]
  });
}
