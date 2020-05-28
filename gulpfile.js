var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var imagemin = require('gulp-imagemin');

//ftp
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );

//php
var connect = require('gulp-connect-php');

// sass 轉譯
gulp.task('sass', function () {
    return gulp.src('./dev/sass/*.scss')//來源
      .pipe(sass().on('error', sass.logError)) //sass轉譯
      .pipe(gulp.dest('./dest/css')); //目的地
  });


  // html 樣板
gulp.task('fileinclude', function () {
    gulp.src(['dev/*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./dest'));
  });



//同步
gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./dest",
            index : "index.html"
        }
    });
    gulp.watch('./dev/sass/*.scss' ,['sass']).on('change',reload);
    gulp.watch(['./dev/*.html' ,'./dev/**/*.html'] ,['fileinclude']).on('change',reload);
});


//壓圖
gulp.task('miniimg',function(){
  gulp.src('./dev/image/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dest/images'))
});

//ftp
gulp.task( 'ftp', ['miniimg'], function () {
 
  var conn = ftp.create( {
      host:     '140.115.236.71',
      user:     '%ed101+',
      password: '!654=stu&',
      parallel: 10,
      log:      gutil.log
  } );

  var globs = [
      'dest/**',
      'dest/css/**',
      'dest/images/**',
      'index.html'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( globs, { base: '.', buffer: false } )
      .pipe( conn.newer( './T2000263' ) ) // only upload newer files
      .pipe( conn.dest( './T2000263' ) );

} );