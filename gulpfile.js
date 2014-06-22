var gulp   = require('gulp'),
  stacktic = require('../stacktic'),
  connect  = require('gulp-connect'),
  rimraf   = require('rimraf'),
  deploy = require("gulp-gh-pages");

gulp.on('err', function(e) {
  console.log(e.err.stack);
});

gulp.task('clean', function (cb) {
  rimraf('./out', cb);
});

gulp.task('stacktic', ['clean'], function(done) {
  stacktic({
    src: 'src',
    dest: 'out',
    root: '/stacktic',
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

gulp.task('deploy', function () {
    gulp.src("./out/stacktic/**/*")
        .pipe(deploy({
          remoteUrl: 'git@github.com:stackticjs/stacktic.git'
        }));
});

gulp.task('default', ['connect', 'watch']);