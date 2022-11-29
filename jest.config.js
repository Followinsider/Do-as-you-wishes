module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: process.env.COVERAGE === "true",
  collectCoverageFrom: ["src/**/*.{js,vue}", "!**/node_modules/**"]
};
