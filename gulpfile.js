// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('views/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('views/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('views/css'));
});

// Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

// Watch Files For Changes
gulp.task('watch', function() {
    // gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('views/js/*.js', ['lint']);
    gulp.watch('views/css/*.scss', ['sass']);
});

//Nodemon - start node server and watch for changes
gulp.task('start', function () {
  nodemon({
    script: 'app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

// Default Task
// gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'start']);
gulp.task('default', ['lint', 'sass', 'watch', 'start']);
