const { src, dest, watch, series, task } = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulpPug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var del = require('del');
var tiny = require('gulp-tinypng-nokey');


function buildHTML() {
    return src('src/pug/pages/*.pug')
            .pipe(gulpPug({
                basedir: 'src/pug/pages',
                pretty: true
            }))
            .pipe(dest('./src'))
            .pipe(browserSync.stream({ stream: true  }))
}

function gulpSass() {
    return src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false,
            grid: true
        }))
        .pipe(dest('src/css'))
        .pipe(browserSync.reload({ stream: true }));
}
 
function server() {
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        port: 8080,
        notify: false
    });
    watch(['src/pug/pages/*.pug'], { events: 'change' }, buildHTML).on('change', function() {
        browserSync.reload({ match: "**/*.html" });
    });
    watch(['src/scss/**/*.scss'], { events: 'change' }, gulpSass).on('change', function() {
        browserSync.reload({ match: "**/*.css" });
    });
}

function build(done) {
    del.sync('../static_src/fe_build', { force: true });
    done();
    src('src/fonts/**/*.{woff,css}').pipe(dest("../static_src/fe_build/fonts"));
    src('src/css/**/main.css').pipe(dest("../static_src/fe_build/css"));
    src('src/js/**/*.js').pipe(dest("../static_src/fe_build/js"));
    src('src/img/**/*.{png,jpg,gif}')
        .pipe(tiny())
        .pipe(dest("../static_src/fe_build/img"));
}

exports.default = series(buildHTML, gulpSass, server);
exports.build = series(build);
