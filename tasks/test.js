var mocha = require('gulp-mocha');
require('babel-register');
require('../test/utils/dom.js');

module.exports = function(gulp, config) {
  gulp.task('test', ['build:lib'], function() {
    var reporter = process.argv[process.argv.indexOf('--reporter') + 1];

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
