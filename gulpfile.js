var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourcemaps = require(gulp-sourcemaps);

gulp.task('js', function(){
  gulp.src('src/*.js')
  .pipe(concat('script.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/scripts/'));
});

// gulp.task('css', function(){
//   gulp.src('src/styles/*.css')
//   .pipe(concat('styles.css'))
//   .pipe(minify())
//   .pipe(gulp.dest('build/styles/'));
// });
//
// gulp.task('default',['js','css'],function(){
// });

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.src('./scss/*.scss')
.pipe(sourcemaps.init())
.pipe(sass())
.pipe(sourcemaps.write())
.pipe(gulp.dest('./css'));
