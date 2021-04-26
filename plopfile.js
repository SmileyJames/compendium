module.exports = function (plop) {
  plop.setGenerator('game', {
    description: 'A game added to the compendium and storybook',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'Please enter the package name of your game. (lower-cased-kebab-sticked)'
      },
      {
        type: 'input',
        name: 'camelCasedName',
        message: 'Please enter the component name of your game. (CamelCased)'
      },
      {
        type: 'input',
        name: 'verboseName',
        message: 'Please enter the verbose name of your game. (Like a Title)'
      }
    ],
    actions: [
      // Stories
      {
        type: 'add',
        path: 'app/src/stories/games/{{ camelCasedName }}/Host.stories.js',
        templateFile: 'templates/HostStory.js.hbs'
      },
      {
        type: 'add',
        path: 'app/src/stories/games/{{ camelCasedName }}/Guest.stories.js',
        templateFile: 'templates/GuestStory.js.hbs'
      },
      // Root directory
      {
        type: 'add',
        path: 'app/src/games/{{ packageName }}/README.md',
        templateFile: 'templates/README.md.hbs'
      },
      {
        type: 'add',
        path: 'app/src/games/{{ packageName }}/index.js',
        templateFile: 'templates/index.js.hbs'
      },
      // Client
      {
        type: 'add',
        path: 'app/src/games/{{ packageName }}/client/README.md',
        templateFile: 'templates/client/README.md.hbs'
      },
      {
        type: 'add',
        path: 'app/src/games/{{ packageName }}/client/index.js',
        templateFile: 'templates/client/index.js.hbs'
      },
      {
        type: 'add',
        path: 'app/src/games/{{ packageName }}/client/Host.js',
        templateFile: 'templates/client/Host.js.hbs'
      },
      {
        type: 'add',
        path: 'app/src/games/{{ packageName }}/client/Guest.js',
        templateFile: 'templates/client/Guest.js.hbs'
      },
      // Game rules
      {
        type: 'add',
        path: 'app/src/games/{{ packageName }}/game/README.md',
        templateFile: 'templates/game/README.md.hbs'
      },
      {
        type: 'add',
        path: 'app/src/games/{{ packageName }}/game/index.js',
        templateFile: 'templates/game//index.js.hbs'
      },
      {
        type: 'add',
        path: 'app/src/games/{{ packageName }}/game/index.test.js',
        templateFile: 'templates/game/index.test.js.hbs'
      },
    ]
  });
}
