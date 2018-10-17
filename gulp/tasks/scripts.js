var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var notify = require('gulp-notify');

// Where do you store your Bower files?
var bowerDir = 'bower_components';

// Where do you store your JS files?
var jsDir = 'source/website/js';

// Which directory should Sass compile to?
var targetjsDir = 'app/assets/js';

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src([
    bowerDir + '/jquery/dist/jquery.js',
    bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    bowerDir + '/slick-carousel/slick/slick.min.js',
    bowerDir + '/lightbox2/dist/js/lightbox.min.js',
    jsDir + '/inobounce.min.js'
  ])
    .pipe(concat('script.min.js'))
    // .pipe(stripDebug())
    .pipe(uglify())
    // Notify does not work on windows machine.
    /*.pipe(notify({
    title: 'Success',
    message: 'Your scripts have compiled successfully'
    }))*/
    .pipe(gulp.dest(targetjsDir));
});
