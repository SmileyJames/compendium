module.exports = (plop) => {
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
        path: 'app/src/stories/{{ camelCasedName }}/Host.stories.js',
        templateFile: 'templates/HostStory.js.hbs'
      },
      {
        type: 'add',
        path: 'app/src/stories/{{ camelCasedName }}/Guest.stories.js',
        templateFile: 'templates/GuestStory.js.hbs'
      },
      // Root game package
      {
        type: 'add',
        path: 'games/{{ packageName }}/README.md',
        templateFile: 'templates/game/README.md.hbs'
      },
      {
        type: 'add',
        path: 'games/{{ packageName }}/index.js',
        templateFile: 'templates/game/index.js.hbs'
      },
      {
        type: 'add',
        path: 'games/{{ packageName }}/package.json',
        templateFile: 'templates/game/package.json.hbs'
      },
      // Client package
      {
        type: 'add',
        path: 'games/{{ packageName }}/client/README.md',
        templateFile: 'templates/game/client/README.md.hbs'
      },
      {
        type: 'add',
        path: 'games/{{ packageName }}/client/package.json',
        templateFile: 'templates/game/client/package.json.hbs'
      },
      {
        type: 'add',
        path: 'games/{{ packageName }}/client/src/index.js',
        templateFile: 'templates/game/client/src/index.js.hbs'
      },
      {
        type: 'add',
        path: 'games/{{ packageName }}/client/babel.config.json',
        templateFile: 'templates/game/client/babel.config.json.hbs'
      },
      {
        type: 'add',
        path: 'games/{{ packageName }}/client/src/Host.js',
        templateFile: 'templates/game/client/src/Host.js.hbs'
      },
      {
        type: 'add',
        path: 'games/{{ packageName }}/client/src/Guest.js',
        templateFile: 'templates/game/client/src/Guest.js.hbs'
      },
      // Game rules package
      {
        type: 'add',
        path: 'games/{{ packageName }}/game/README.md',
        templateFile: 'templates/game/game/README.md.hbs'
      },
      {
        type: 'add',
        path: 'games/{{ packageName }}/game/package.json',
        templateFile: 'templates/game/game/package.json.hbs'
      },
      {
        type: 'add',
        path: 'games/{{ packageName }}/game/src/index.js',
        templateFile: 'templates/game/game/src/index.js.hbs'
      },
    ]
  });

  plop.setGenerator('component', {
    description: 'A re-usable React component and a story',
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
      // Story
      {
        type: 'add',
        path: 'app/src/stories/{{ camelCasedName }}/index.stories.js',
        templateFile: 'templates/ComponentStory.js.hbs'
      },
      // Component package
      {
        type: 'add',
        path: 'components/{{ packageName }}/README.md',
        templateFile: 'templates/component/README.md.hbs'
      },
      {
        type: 'add',
        path: 'components/{{ packageName }}/package.json',
        templateFile: 'templates/component/package.json.hbs'
      },
      {
        type: 'add',
        path: 'components/{{ packageName }}/babel.config.json',
        templateFile: 'templates/component/babel.config.json.hbs'
      },
      {
        type: 'add',
        path: 'components/{{ packageName }}/src/index.js',
        templateFile: 'templates/component/src/index.js.hbs'
      },
    ]
  });
}
