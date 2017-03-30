const gulp        = require('gulp');
const babel       = require('gulp-babel');
const sass        = require('gulp-sass');
const cleanCSS 	  = require('gulp-clean-css');
const uglify      = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('copy', function () {
  gulp
  .src('src/*.html')
  .pipe(gulp.dest('public'));
});

gulp.task('copy', function () {
  gulp
  .src('src/images/**.**')
  .pipe(gulp.dest('public/images'));
});

gulp.task('es6', () => {
  return gulp.src('src/js/*.js')
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(uglify())
  .pipe(gulp.dest('public/js'));
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({ compatibility: 'ie8'}))
  .pipe(gulp.dest('public/css'));
});

gulp.task('serve', ['es6', 'sass'], () => {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
});

gulp.task('default', ['sass', 'serve', 'copy', 'copy'], () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['es6']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('public/css/*.css').on('change', browserSync.reload);
});
