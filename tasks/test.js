var mocha = require('gulp-mocha');
require('babel-register');
require('../test/utils/dom.js');

module.exports = function(gulp, config) {
  gulp.task('test', ['build:lib'], function() {
    var reporterPos = process.argv.indexOf('--reporter');
    var reporter = reporterPos > -1 ? process.argv[reporterPos + 1] : null;

    return gulp.src(config.paths.test, {read: false})
      .pipe(mocha({reporter: reporter}))
      .on('error', function(err) {
        this.emit('end');
      });
  });

  gulp.task('watch:tests', ['test'], function() {
    gulp.watch([config.paths.src, config.paths.test], ['test']);
  });
};
