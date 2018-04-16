var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var del = require('del');
var tiny = require('gulp-tinypng-nokey');


gulp.task('pug', function buildHTML() {
    return gulp.src('src/assets/pug/pages/*.pug')
            .pipe(pug({
                basedir: 'src/assets/pug/pages',
                pretty: true
            }))
            .pipe(gulp.dest('./src'))
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function () {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            grid: true
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('src/assets/css'))
        .pipe(browserSync.reload({stream: true}));
});  
 
gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        port: 8080,
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.run('pug:watch')
    gulp.run('sass:watch')
})

gulp.task('pug:watch', function() {
    gulp.watch('src/assets/pug/**/*.pug', ['pug'])
})

gulp.task('sass:watch', function() {
    gulp.watch('src/assets/scss/**/*.scss', ['sass'])
})

gulp.task('default', function() {
    gulp.run('pug')
    gulp.run('sass')
    gulp.run('webserver')
    gulp.run('watch')
})

gulp.task("delete", ['delete'], function() {
    return del("build");
});

gulp.task('build', function() {
    gulp.src('src/**/*.html').pipe(gulp.dest("build/"));  
    gulp.src('src/assets/css/**/*.css').pipe(gulp.dest("build/assets/css"));
    gulp.src('src/assets/img/**/*.{png,jpg,gif}')
        .pipe(tiny())
        .pipe(gulp.dest("build/assets/img"));
})
