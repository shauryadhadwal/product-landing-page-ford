const gulp = require('gulp');
const { parallel } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
//Compile scss to css

function style() {
    return gulp.src('./styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/styles'))
        .pipe(browserSync.stream());
}
function script() {
    return gulp.src('./scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/scripts'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        port: 3000
    });
    gulp.watch('./styles/**/*.scss', style);
    gulp.watch('./scripts/**/*.js', script);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./scripts/**/*.js').on('change', browserSync.reload);
}

exports.build = parallel(style, script)
exports.script = script;
exports.style = style;
exports.watch = watch;