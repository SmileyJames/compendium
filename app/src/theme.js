import base from '@rebass/preset'
import merge from "lodash/merge";

merge(base, {
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Roboto', sans-serif",
  }
})
export default base;
