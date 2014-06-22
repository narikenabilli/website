var gulp   = require('gulp'),
  stacktic = require('stacktic'),
  connect  = require('gulp-connect'),
  clean    = require('gulp-clean');

gulp.on('err', function(e) {
  console.log(e.err.stack);
});

gulp.task('clean', function () {
  gulp.src('out', {read: false})
    .pipe(clean());
});

gulp.task('stacktic', ['clean'], function(done) {
  stacktic({
    src: 'src',
    dest: 'out',
    less: {
      paths: ['bower_components', '_site/assets/less'],
      compress: false
    }
  })
  .use('./src/models/page')
  .use('./src/models/vendor')
  .use('./src/models/asset')
  .use('./src/controllers/pages')
  .use('./src/controllers/assets')
  .build(done);
});

gulp.task('connect', function() {
  connect.server({
    root: 'out',
    livereload: true
  });
});

gulp.task('livereload', function () {
  gulp.src('./out/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./out/*.html'], ['livereload']);
  gulp.watch(['./src/**/*'], ['stacktic']);
});

gulp.task('default', ['connect', 'watch']);