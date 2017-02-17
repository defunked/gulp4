'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
// const combine = require('stream-combiner2').obj;
// const sass = require('gulp-sass');

// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {

    return function() {
        return gulp.src(options.src)
            .pipe($.pug({
                doctype: 'html',
                pretty: true,
            }))
            .pipe(gulp.dest('dist'))
    };
};
