/**
 * Custom Gulpfile for Full Stack MERN Development
 *
 * gulp static
 *      -- copies static resources from /client/static to /public/static
 * gulp html
 *      -- copies html files from /client/html to /public/html
 * gulp styles
 *      -- compiles SCSS style sheets and places minified output in /public/css
 * gulp react-redux-dev
 *      -- transpiles client side JS code w/ webpack using dev settings
 * gulp react-redux-production
 *      -- transpiles client side JS code w/ webpack using production settings
 * gulp clean
 *      -- cleans /public folder of old files
 * gulp default
 *      -- runs static, html, styles, react-redux-dev
 * gulp watch
 *      -- runs static, html, styles, react-redux-dev, and starts nodemon
 * gulp build
 *      -- runs clean, static, html, styles, react-redux-production
 */

const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const del = require('del');

const rollup = require('rollup-stream');
const babel = require('rollup-plugin-babel');
const source = require('vinyl-source-stream');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WEBPACK_DEV = require('./webpack.config.dev.js');
const WEBPACK_PROD = require('./webpack.config.production.js');

// File Paths
const CLIENT = './client/';
const SERVER = './server/';
const DIST = './public/';
const HTML = CLIENT + 'html/*.html';
const REACT_REDUX = CLIENT + '/**/*.jsx';
const STYLES = CLIENT + 'styles/';
const JS_BUNDLE = 'bundle.min.js';

// SCSS fonts
const FONTS = {
  in: [
    CLIENT + 'static/fonts/*.*',
    'node_modules/font-awesome/fonts/*.*',
  ],
  out: DIST + 'fonts/',
};

const IMG = {
  in: [CLIENT + 'static/img/*.*'],
  out: DIST + 'img/',
};

const SCSS = {
  in: STYLES,
  out: DIST + 'css/',
  watch: STYLES + '**/*.scss',
  sassOpts: {
    outputStyle: 'compressed',
    precison: 3,
    errLogToConsole: true,
    includePaths: [
      'node_modules/bootstrap-sass/assets/stylesheets/',
      'node_modules/font-awesome/css',
      STYLES + 'base/',
      STYLES + 'components/',
    ],
  },
};

// Copy static resources to public folder
gulp.task('static', [
  'fonts', 'img',
], () => {});

gulp.task('fonts', () => {
  return gulp
    .src(FONTS. in)
    .pipe(gulp.dest(FONTS.out));
});

gulp.task('img', () => {
  return gulp
    .src(IMG. in)
    .pipe(gulp.dest(IMG.out));
});

gulp.task('html', () => {
  return gulp
    .src(HTML)
    .pipe(gulp.dest(DIST))
    .pipe(livereload());
});

gulp.task('styles', () => {
  return gulp
    .src(SCSS. in + 'main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(SCSS.sassOpts))
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(SCSS.out))
    .pipe(livereload());
});

// Scripts
gulp.task('react-redux-dev', () => {
  return gulp
    .src(CLIENT + 'react/react-app.jsx')
    .pipe(sourcemaps.init())
    .pipe(webpackStream(WEBPACK_DEV, webpack))
    .pipe(concat(JS_BUNDLE))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST))
    .pipe(livereload());
});

gulp.task('react-redux-production', () => {
  return gulp
    .src(CLIENT + 'react/react-app.jsx')
    .pipe(sourcemaps.init())
    .pipe(webpackStream(WEBPACK_PROD, webpack))
    .pipe(concat(JS_BUNDLE))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST))
    .pipe(livereload());
});

gulp.task('clean', function() {
  return del.sync([DIST + '/**/*']);
});

gulp.task('default', [
  'static', 'html', 'styles', 'react-redux-dev', 'build-server'
], () => {});

gulp.task('watch', [
  'default',
], () => {
  livereload.listen();
  gulp.watch(HTML, ['html']);
  gulp.watch(REACT_REDUX, ['react-redux-dev']);
  gulp.watch(STYLES + '**/*.scss', ['styles']);
  gulp.watch(SERVER + '**/*js', ['build-server']);
  nodemon({
    script: './server.js',
    ext: 'js json',
    ignore: ['*.scss', '*.jsx', './public/', 'gulpfile.js'],
  });
});

gulp.task('build-server', () => {
  return rollup({
    entry: 'server/server.js',
    format: 'cjs',
    plugins: [
      babel({
        'presets': [
          [
            'es2015',
            {
              'modules': false
            }
          ],
          ['stage-0'],
        ],
        'plugins': [
          'external-helpers'
        ],
        'exclude': 'node_modules/**'
      })
    ],
  })
  .pipe(source('server.js'))
  .pipe(gulp.dest('./'));
});

gulp.task('build', [
  'clean',
  'static',
  'html',
  'styles',
  'react-redux-production',
  'build-server',
], () => {});
