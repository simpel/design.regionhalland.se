const { watch, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');

function scss(cb) {
	gulp.src('theme/scss/skin.scss')
		.pipe(sassGlob())
		.pipe(sass({
  			includePaths: [
				'node_modules/@frctl/mandelbrot/assets/scss',
				'node_modules',
				'node_modules/normalize.css',
				'node_modules/sass-mq',
				'node_modules/highlight.js',
			]
		})
		.on('error', sass.logError))
        .pipe(gulp.dest('assets/css/'));
  cb();
}

watch('theme/scss/*.scss', scss);

exports.default = scss;
