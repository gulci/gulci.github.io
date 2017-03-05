// get gulp packages
var gulp = require('gulp'),
  bs = require('browser-sync').create(),
  sass = require('gulp-sass');

// reload task
gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

// build sass task
gulp.task('styles', function() {
  gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

// watch task
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('css/**/*.css').on('change', bs.reload);
  gulp.watch('js/**/*.js').on('change', bs.reload);
  gulp.watch('*.html').on('change', bs.reload);
  gulp.watch('sass/**/*.scss',['styles']);
});

// default task
gulp.task('default', function() {
  gulp.start('styles');
  gulp.start('watch');
});
