# Compendium Games

### 🎲 [Play Games](https://www.compendium.games/)
### 📚 [Documentation](https://www.compendium.games/docs)
### 💅 [Storybook](https://www.compendium.games/storybook)
### 📸 [Chromatic](https://www.chromatic.com/builds?appId=60a93df61f3f79003b2be148)

## Getting Started

First install NodeJS on your system. This will likely include npm.

This repository uses Yarn to manage packages and dependencies of the mono-repo. Yarn can be installed on your machine using npm.

```
npm install --global yarn
```

With Yarn installed you can run yarn to setup the repo.

```
cd compendium # root of git repo
yarn # equivalent to yarn install
```

The app package contains the application, that's where the server can be started.

```
cd app
yarn start # yarn start will start the development server
yarn start-storybook # Render game's React components in given example states
```

The app README has helpful commands listed also.

## Creating a New Game

A compendium has many games! Let's make another!

```
yarn generate
# Answer prompts for the plop template generator

cd app
yarn storybook
# Your newly generated game's components will we run by storybook
```
