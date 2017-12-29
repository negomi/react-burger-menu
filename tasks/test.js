const mocha = require('gulp-mocha');

module.exports = function(gulp, config) {
  gulp.task('test', ['build:lib'], function() {
    var reporterPos = process.argv.indexOf('--reporter');
    var reporter = reporterPos > -1 ? process.argv[reporterPos + 1] : null;

    return gulp
      .src(config.paths.test, { read: false })
      .pipe(
        mocha({
          reporter: reporter,
          require: ['babel-core/register', 'jsdom-global/register']
        })
      )
      .on('error', function(err) {
        if (process.argv.includes('watch:tests')) {
          this.emit('end');
        } else {
          process.exit(1);
        }
      });
  });

  gulp.task('watch:tests', ['test'], function() {
    gulp.watch([config.paths.src, config.paths.test], ['test']);
  });
};
