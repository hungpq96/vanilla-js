const gulp = require('gulp');
const ts = require('gulp-typescript');

const project = ts.createProject('tsconfig.json');

gulp.task('compile', async () => {
  project
    .src()
    .pipe(project())
    .js
    .pipe(gulp.dest('dist'))
});

gulp.task('test', async () => {
  console.log('should run jest');
})

gulp.task('default', gulp.series('compile', 'test'));
