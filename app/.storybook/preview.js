import rebassPreset from "@rebass/preset";
import { withThemesProvider } from "themeprovider-storybook";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const themes = [
  {
    name: "Rebass Preset",
    ...rebassPreset,
  }
]

export const decorators = [withThemesProvider(themes)]
