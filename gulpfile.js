// Load plugins
const gulp = require("gulp");

const browsersync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");


// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function (cb) {

  // Bootstrap JS
  gulp.src([
      './node_modules/bootstrap/dist/js/*',
    ])
    .pipe(gulp.dest('./dist/vendor/bootstrap/js'))

  // ChartJS
  gulp.src([
      './node_modules/chart.js/dist/*.js'
    ])
    .pipe(gulp.dest('./dist/vendor/chart.js'))

  // Font Awesome
  gulp.src([
      './node_modules/@fortawesome/**/*',
    ])
    .pipe(gulp.dest('./dist/vendor'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./dist/vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./dist/vendor/jquery-easing'))

  cb();

});

// CSS task
gulp.task('css', function (cb) {
  gulp.src("main.css")
    .pipe(plumber())
    .pipe(gulp.dest("./dist"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(uglify())
    .pipe(browsersync.stream());
    cb();
});

// JS task
gulp.task('js', function (cb) {
 gulp.src("index.js")
    .pipe(uglify())
    
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream());
    cb();
});

// BrowserSync
function browserSync() {
  browsersync.init({
    injectChanges: true,
    server: true,
    injectFileTypes: true['js','css']
  });
}

// BrowserSync Reload
function browserSyncReload() {
  browsersync.reload();
}

// Watch files
function watchFiles() {
  gulp.watch("./main.css", function(){
      gulp.task('css');
      gulp.watch("./*.html", browserSyncReload);
  });
  gulp.watch("./index.js", function(){
    gulp.task('js');
    gulp.watch("./*.html", browserSyncReload);
  });
  
};

gulp.task("dev", gulp.parallel(watchFiles, browserSync));