const { watch, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');

function scss(cb) {
	gulp.src('theme/scss/**/*.scss')
		.pipe(sass({
  			includePaths: ['node_modules/@frctl/mandelbrot/assets/scss']
		})
		.on('error', sass.logError))
        .pipe(gulp.dest('/assets/css/'));
  cb();
}

watch('theme/scss/*.scss', scss);

exports.default = scss
