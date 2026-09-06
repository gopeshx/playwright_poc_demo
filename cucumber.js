module.exports = {
  default: {
    require: ['src/steps/**/*.js', 'src/support/**/*.js'],
    paths: ['features/**/*.feature'],
    format: ['progress', 'html:test-results/cucumber-report.html'],
    publishQuiet: true,
    timeout: 30000
  }
};