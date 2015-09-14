var gulp = require('gulp'),
    uncss = require('gulp-uncss'),
    zopfli = require("gulp-zopfli"),
    minifyhtml = require('gulp-minify-html'),
    inlinesource = require('gulp-inline-source'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    base64Images = require('gulp-base64');;


gulp.task('css', function() {
    return gulp.src('./src/css/*.css')
        .pipe( base64Images() )
        .pipe( autoprefixer() )
        .pipe( minifyCss() )
        .pipe( gulp.dest('./build/css') )
});

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe( uglify() )
        .pipe( gulp.dest('./build/js') )
});

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe( gulp.dest('./build') )
});


gulp.task('uncss', ['css', 'js', 'html'], function() {
    return gulp.src('./build/css/*.css')
        .pipe( uncss({
            html: ['./build/*.html'],
            ignore: ['.bold', '.bold a', '.active']
        }) )
        .pipe( gulp.dest('./build/css') )
});

gulp.task('minify', ['uncss'], function() {
    return gulp.src('./build/*.html')
        .pipe( inlinesource( {compress: true} ) )
        .pipe( minifyhtml() )
        .pipe( gulp.dest('./dist') )
});

gulp.task('compress', ['minify'], function() {
    return gulp.src('./dist/*.html')
        .pipe( zopfli() )
        .pipe( gulp.dest('./dist') )
});

gulp.task('default', function() {
    return gulp.start('compress');
});