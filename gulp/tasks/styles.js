var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var notify = require('gulp-notify');
var handleErrors = require('../util/handleErrors');

var includePaths = [
  // 'bower_components/foundation/scss',
  'bower_components/bootstrap-sass/assets/stylesheets',
  'bower_components/bourbon/app/assets/stylesheets',
  'bower_components/font-awesome/scss'
];

// Where do you store your Sass files?
var sassDir = 'src/scss';

// Which directory should Sass compile to?
var targetCSSDir = 'application/assets/css';

//Styles
gulp.task('styles', function() {
  gulp.src([sassDir + '/main.scss', 'bower_components/lightbox2/dist/css/lightbox.css'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: includePaths,
      outputStyle: 'compressed',
      errLogToConsole: true
    })).on('error', handleErrors)
    .pipe(sourcemaps.write('./maps'))
    // Notify does not work on windows machine.
    // .pipe(notify({
    //     title: 'Success',
    //     message: 'Your styles have compiled successfully'
    // }))
    .pipe(gulp.dest(targetCSSDir));
});
