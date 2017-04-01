const gulp        = require('gulp');
const sass        = require('gulp-sass');
const cleanCSS 	  = require('gulp-clean-css');
const uglify      = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('js', () => {
  return gulp.src('src/js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('public/js'));
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({ compatibility: 'ie8'}))
  .pipe(gulp.dest('public/css'));
});

gulp.task('images', () => {
  gulp
  .src('src/images/**.**')
  .pipe(gulp.dest('public/images'));
});

gulp.task('serve', ['js', 'sass'], () => {
  browserSync.init({
    files: ['public/**/*.*'],
    reloadDelay: 500,
    server: {
      baseDir: './'
    }
  });
});

gulp.task('default', ['js', 'sass', 'images', 'serve'], () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/app.js', ['js']);
  gulp.watch('index.html', browserSync.reload());
});
