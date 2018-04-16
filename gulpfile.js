var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');

gulp.task('pug', function buildHTML() {
    return gulp.src('src/assets/pug/pages/*.pug')
            .pipe(pug({
                basedir: 'src/assets/pug/pages',
                pretty: true
            }))
            .pipe(gulp.dest('./src'))
});

gulp.task('sass', function () {
    return gulp.src('src/assets/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            grid: true
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('src/assets/css'));
});  
 
gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        port: 8080
    });
});

gulp.task('default', function() {
    gulp.run('pug')
    gulp.run('sass')
})