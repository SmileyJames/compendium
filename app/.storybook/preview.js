import theme from "../src/theme";
import { MemoryRouter } from "react-router-dom";
import { withThemesProvider } from "themeprovider-storybook";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const themes = [
  {
    name: "Rebass Preset",
    ...theme,
  }
]

export const decorators = [
  withThemesProvider(themes),
  (Story) => (<MemoryRouter><Story/></MemoryRouter>),
]
