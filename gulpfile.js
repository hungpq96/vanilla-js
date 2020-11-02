const gulp = require('gulp');
const ts = require('gulp-typescript');
const jest = require('gulp-jest').default;

const project = ts.createProject('tsconfig.json');

gulp.task('compile', async () => {
  project
    .src()
    .pipe(project())
    .js
    .pipe(gulp.dest('dist'));
});

gulp.task('test', async () => {
  process.env.NODE_ENV = 'jest';

  gulp
    .src('tests')
    .pipe(jest({
      'collectCoverage': true,
      'coverageReporters': ['text']
    }));
});

gulp.task('default', gulp.series('compile', 'test'));
