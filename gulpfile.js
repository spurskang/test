var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sass =  require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var fileinclude = require('gulp-file-include');

gulp.task('move',function(){
  //do
  return gulp.src('*.html') //來源
  .pipe(gulp.dest('dest/'))     //目的地
});

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')  //來源
    .pipe(sass.sync().on('error', sass.logError)) //轉譯
    .pipe(gulp.dest('./css')); //目的地
});

gulp.task('default',function(){
  browserSync.init({
    server:{
      baseDir: "./dest",
      index: "index.html"
    }
  });
  gulp.watch('./sass/*.scss',['concat']).on('change',reload);
  gulp.watch(['./*.html', './**/*.html'],['fileinclude']).on('change',reload);
});