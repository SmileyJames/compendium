yarn lint-staged
yarn build:ci
find components games peer-party -name dist -exec git add -f {} +
