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
  src: './app/styles/main.scss'
});

lazyRequireTask('pages-pug', './tasks/pages-pug', {
  src: './app/pages/pug/*.pug'
});

lazyRequireTask('pages-html', './tasks/pages-html', {
  src: './app/pages/html/*.html',
  dst: './dist/'
});

lazyRequireTask('clean', './tasks/clean', {
  dst: 'dist'
});

lazyRequireTask('assets', './tasks/assets', {
  src: './app/imgs/**/*.*',
  dst: './dist/assets/'
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'pages-pug', 'pages-html', 'assets')
));

lazyRequireTask('serve', './tasks/serve', {
  src: 'dist'
});

gulp.task('watch', function() {
  gulp.watch(['./app/styles/*.+(sass|scss)', './app/blocks/**/*.+(sass|scss)'], gulp.series('styles'));
  gulp.watch(['./app/pages/pug/*.pug', './app/blocks/**/*.pug'], gulp.series('pages-pug'));
  gulp.watch('./app/pages/html/*.html', gulp.series('pages-html'));
  gulp.watch('./app/imgs/**/*.*', gulp.series('assets'));
});

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);

lazyRequireTask('lint', './tasks/lint', {
  cacheFilePath: process.cwd() + './tmp/lintCache.json',
  src: '.app/scripts/**/*.js'
});

gulp.task('default', gulp.series('dev'));
