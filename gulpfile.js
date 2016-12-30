const gulp = require( 'gulp' );
const livereload = require( 'gulp-livereload' );
const concat = require( 'gulp-concat' );
const autoprefixer = require( 'gulp-autoprefixer' );
const plumber = require( 'gulp-plumber' );
const sourcemaps = require( 'gulp-sourcemaps' );
const sass = require( 'gulp-sass' );
const webpack = require( 'gulp-webpack' );
const env = require( 'gulp-env' );
const nodemon = require( 'gulp-nodemon' );
const del = require( 'del' );

// File Paths
const CLIENT = './client/';
const DIST = './public/';
const HTML = CLIENT + 'html/*.html';
const REACT_REDUX = CLIENT + '/**/*.jsx';
const STYLES = CLIENT + 'styles/';

// SCSS

// fonts
const FONTS = {
  in: [CLIENT + 'static/fonts/*.*'],
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
    includePaths: [],
  },
};

// Copy static resources to public folder
gulp.task('static', ['fonts', 'img'], () => {
  return;
});
gulp.task('fonts', () => {
  return gulp
    .src(FONTS.in)
    .pipe(gulp.dest( FONTS.out ));
});
gulp.task('img', () => {
  return gulp
    .src(IMG.in)
    .pipe(gulp.dest( IMG.out ));
});

gulp.task('html', () => {
  return gulp
    .src(HTML)
    .pipe(gulp.dest(DIST))
    .pipe(livereload());
});

gulp.task( 'styles', () => {
  return gulp
    .src(SCSS.in + 'main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(SCSS.sassOpts))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(SCSS.out))
    .pipe(livereload());
});

// Scripts
gulp.task( 'react-redux', () => {
  return gulp
    .src(CLIENT + 'react/index.jsx')
    .pipe(sourcemaps.init())
    .pipe(webpack(require('./webpack.config.client.js')))
    .pipe(concat( 'bundle.js' ))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST))
    .pipe(livereload());
});

gulp.task( 'clean', function( ) {
  return del.sync([DIST + '/**/*']);
});

gulp.task( 'default', ['static', 'html', 'styles', 'react-redux'], () => {
  return;
});


gulp.task( 'watch', [
  'default',
], () => {
  livereload.listen( );
  gulp.watch(HTML_PATH + '**/*.html', ['HTML']);
  gulp.watch(SCRIPTS_PATH, ['JSX']);
  gulp.watch(SCSS_PATH + '**/*.scss', ['SCSS']);
});
