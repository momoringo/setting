const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const prettify = require('gulp-html-prettify');
const sass = require('gulp-sass');
const data = require('gulp-data');
const nunjucks     = require('gulp-nunjucks-render');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const browserSync = require("browser-sync").create();
const webpackConfig = require("./webpack.config");
const njkFunc = require('./src/js/njkFunc.js');
const reload = browserSync.reload;

const autoprefixerSet = [
  'last 2 version',
  'ie >= 11',
  'iOS >= 8.4',
  'Android >= 4.4'
];

const path = {
  src: './src/**/',
  build: './build/'
};

gulp.task('njk', function() {
  gulp.src(['src/**/*.njk','!./src/**/_*.njk'])
      .pipe(data(njkFunc.njkFunc))
      .pipe(nunjucks({
          path: ['src/tmpl/']
      }))
 	    .pipe(prettify({indent_char: '', indent_size: 0}))
	    .pipe(plumber())
      .pipe(gulp.dest('build/html/'));
});


gulp.task("script", () => {
  return webpackStream(webpackConfig, webpack)
    .on('error', function handleError() {　
      this.emit('end');
    })
    .pipe(gulp.dest("./build/js/"));
});


gulp.task('sass', () => {
  gulp.src(['src/css/*.scss','src/css/**/*.scss','!./src/css/_*.scss'])
    .pipe(sass({
            outputStyle: 'expanded'
     }))
    .pipe(autoprefixer({
        browsers: autoprefixerSet,
        cascade: false
     }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('BrowserSyncOn', () => {
    browserSync.init({
        server: {
            baseDir: path.build
        }
    });
    gulp.watch(["./build/js/*.js","./src/**/*"]).on("change", reload);
});


gulp.task('watch', () => {
  gulp.watch([`${path.src}*.js`,`${path.src}*.jsx`,`${path.src}*.vue`,`${path.src}*.tag`], ['script']);
  gulp.watch([`${path.src}*.scss`], ['sass']);
  gulp.watch([`${path.src}*.njk`], ['njk']);

});

gulp.task('default', ['BrowserSyncOn','watch']);
