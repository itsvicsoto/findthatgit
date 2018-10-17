var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var packageObj = require('./../../../package.json');


// Load environment based on NODE_ENV
var environment;
var runOnEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

console.log('ENVIRONMENT RUNNING ON : ', process.env.NODE_ENV);

if (runOnEnv == 'production') {
  environment = require('./../../../server/config/environment.json');
} else if (runOnEnv == 'staging') {
  environment = require('./../../../server/config/environment-staging.json');
} else {
  // You must create a file called environment-dev.json under
  // ./config and follow the environment format
  environment = require('./../../../server/config/environment-local.json');
}

// == PATH STRINGS ========

var paths = {
  scripts: ['./app/dashboard/app/**/*.js'],
  angularTemplates: ['./app/dashboard/app/**/*.html'],
  styles: ['./source/dashboard/**/*.css', './source/dashboard/**/*.scss', ],
  vendorStyles: [],
  indexRaw: './app/dashboard/index-pre.html',
  distIndex: './app/dashboard',
  distDev: './app/dashboard/assets',
  jsDir: './source/dashboard/js',
  bowerDir: './bower_components'
};

var includePaths = [];

// == PIPE SEGMENTS ========

var pipes = {};

pipes.orderedVendorScripts = function() {
  var ordered = [
    'angular.js',
    'angular-ui-router.min.js',
    'underscore.js'
  ];

  return plugins.order(ordered);
};

pipes.buildIndex = function(mode) {

  var domain = environment.API_BASE_URL;

  return gulp.src([paths.indexRaw])
    .pipe(replace(new RegExp('%%API%%', 'g'), domain))
    .pipe(replace(new RegExp('%%GULP_INJECT_VERSION%%', 'g'), packageObj.version + '-' + Date.now()))
    .pipe(plugins.rename('index.html'))
    .pipe(gulp.dest(paths.distIndex))
    .pipe(plugins.notify({
      title: 'Index Built',
      message: 'Your index have compiled successfully'
    }))

};

pipes.orderedAppScripts = function() {
  return plugins.angularFilesort();
};

pipes.buildAngularTemplates = function() {
  return gulp.src(paths.angularTemplates)
    .pipe(plugins.angularTemplatecache('js/motherload-templates.min.js', {
      module: 'findthatgit.templates',
      standalone: true
    }))
    .pipe(plugins.uglify({ mangle: false }))
    // .pipe(plugins.concat('js/motherload-templates.min.js'))
    .pipe(plugins.notify({
      title: 'Angular Templates : Success',
      message: 'Your templates have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
}

pipes.buildStyles = function() {
  return gulp.src(paths.styles)
    .pipe(plugins.sass({
      includePaths: includePaths,
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(plugins.notify({
      title: 'CSS : Success',
      message: 'Your css have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
};

pipes.buildVendorStyles = function() {

  return gulp.src(paths.vendorStyles)
    .pipe(plugins.concat('css/vendor.min.css'))
    .pipe(plugins.notify({
      title: 'Vendor Styles',
      message: 'Your scripts have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
}


pipes.buildVendorScripts = function() {
  return gulp.src(bowerFiles('**/*.js', {
      "group": ['dashboard'],
      "overrides": {}
    }))
    .pipe(pipes.orderedVendorScripts())
    .pipe(plugins.concat('js/vendor.min.js'))
    .pipe(stripDebug())
    .pipe(plugins.uglify({ mangle: false }))
    .pipe(plugins.notify({
      title: 'Vendor Javascript',
      message: 'Your scripts have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
};

pipes.buildAppScripts = function() {

  return gulp.src(paths.scripts)
    .pipe(plugins.sourcemaps.init())
    .pipe(pipes.orderedAppScripts())
    .pipe(plugins.concat('js/motherload.min.js'))
    // .pipe(plugins.uglify({ mangle: false }))
    // .pipe(stripDebug())
    // .pipe(plugins.uglify())
    // Notify does not work on windows machine.
    // .pipe(plugins.sourcemaps.write())
    .pipe(plugins.notify({
      title: 'App Javascript',
      message: 'Your scripts have compiled successfully'
    }))
    .pipe(gulp.dest(paths.distDev));
};

pipes.buildAll = function() {

  var vendorScripts = pipes.buildVendorScripts();
  var appScripts = pipes.buildAppScripts();
  var appStyles = pipes.buildStyles();
  var appVendorStyles = pipes.buildVendorStyles();
  var angularTemplates = pipes.buildAngularTemplates();
  var buildIndex = pipes.buildIndex(runOnEnv);
  var viewtemplates = pipes.buildViewTemplates(runOnEnv);
  var webViewTemplates = pipes.buildViewWebTemplates(runOnEnv);

  // return pipes.pipe(plugins.inject(appScripts, {
  //     relative: true
  //   }))
  //   .pipe(plugins.inject(appStyles, {
  //     relative: true
  //   }))
}


// == TASKS ========


gulp.task('dashboard-clean-build', pipes.buildAll);

gulp.task('dashboard-build', pipes.buildAll);

gulp.task('dashboard-dev', ['dashboard-clean-build'], function() {

  // watch styles
  gulp.watch(paths.styles, function() {
    return pipes.buildStyles();
  });

  // watch angular templates
  gulp.watch(paths.angularTemplates, function() {
    return pipes.buildAngularTemplates();
  })

  // watch vendor scripts
  gulp.watch(paths.bowerDir, function() {
    pipes.buildVendorStyles();
    return pipes.buildVendorScripts();
  })

  // watch scripts
  gulp.watch(paths.scripts, function() {
    return pipes.buildAppScripts();
  });

});