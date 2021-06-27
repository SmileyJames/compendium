import Router from "./Router";
import { createGlobalStyle } from "styled-components"

const NormaliseStyles = createGlobalStyle`
  body, html, #root {
    margin: 0;
    height: 100%;
  }
`

const App = () =>
  <>
    <Router/>
    <NormaliseStyles/>
  </>

export default App;
