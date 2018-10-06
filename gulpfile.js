const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');
const project = ts.createProject('tsconfig.json');

function build() {
  del.sync(['dist/**', '!dist', 'typings/**', '!typings']);

  const result = project.src()
    .pipe(sourcemaps.init())
    .pipe(project());

  return merge([
    result.dts.pipe(gulp.dest('typings')),
    result.js.pipe(sourcemaps.write('.', { sourceRoot: '../src' })).pipe(gulp.dest('dist')),
  ]);
}

gulp.task('default', build);
gulp.task('build', build);
