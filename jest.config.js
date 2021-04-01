module.exports = {
  transform: {
    "\\.js$": ['babel-jest', {rootMode: "upward"}],
    "\\.(svg|jpg|png)$": "<rootDir>/fileTransformer.js",
  }
}
