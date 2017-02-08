'use strict';

const gulp = require('gulp');

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

lazyRequireTask('styles', './tasks/styles', {
  src: 'app/sass/main.scss'
});

lazyRequireTask('clean', './tasks/clean', {
  dst: 'public'
});

lazyRequireTask('assets', './tasks/assets', {
  src: 'app/img/**',
  dst: 'dist/assets'
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'assets'))
);

lazyRequireTask('serve', './tasks/serve', {
  src: 'dist'
});

gulp.task('watch', function() {
  gulp.watch('app/sass/**/*.+(sass|scss)', gulp.series('styles'));
  gulp.watch('app/img/**/*.*', gulp.series('assets'));
});

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);

lazyRequireTask('lint', './tasks/lint', {
  cacheFilePath: process.cwd() + '/tmp/lintCache.json',
  src: 'frontend/**/*.js'
});
