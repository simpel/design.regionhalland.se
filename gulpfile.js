const { watch, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const fractal = require('@frctl/fractal').create();
const logger = fractal.cli.console;
const path = require("path");
const mandelbrot = require("@frctl/mandelbrot");
var sourcemaps = require('gulp-sourcemaps');

// create a new instance with custom config options
const theme = mandelbrot({
	"nav": ["docs", "components"],
	"panels": ["html", "view", "context", "resources", "info", "notes"],
	"lang": "sv",
	"favicon": "/assets/img/favicon.ico",
	"scripts": [
		"default",
		"https://code.jquery.com/jquery-3.3.1.min.js",
		"/assets/scripts/main.js"
	],
	"styles": [
		"//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css",
		"https://use.typekit.net/vip6kss.css",
		"https://unpkg.com/@regionhalland/styleguide-v2@0.8.2/dist/css/main.min.css",
		"/assets/css/skin.css"],
    // any other theme configuration values here
});

theme.addStatic(
	__dirname + "/assets/",
	"/assets/"
);
theme.addLoadPath(__dirname + "/theme/views");

fractal.set("project.title", "Region Halland Design Guidelines");
fractal.web.set("static.path", path.join(__dirname, "public"));
fractal.web.set("builder.dest", __dirname + "/build");
fractal.web.theme(theme);


fractal.components.set("label", "Komponenter"); // default is "Components"
fractal.components.set("title", "Komponenter"); // default is "Components"
fractal.components.set("path", path.join(__dirname, "/komponenter"));
fractal.components.set("default.prefix", "rh"); // default is null
fractal.components.set("default.status", "wip"); // default is "ready"

fractal.docs.set('indexLabel', 'Översikt');
fractal.docs.set("label", "Dokumentation"); // default is "Components"
fractal.docs.set("title", "Dokumentation"); // default is "Components"
fractal.docs.set("path", path.join(__dirname, "dokumentation"));
fractal.docs.set("statuses", {
	draft: {
        label: "Under arbete",
        description: "Denna text arbetas det med just nu",
        color: "#FF3333"
    },
    ready: {
        label: "Klar",
        description: "Texten är tillräckligt klar för att kunna refereras till.",
        color: "#29CC29"
    }
});

function compile_assets(cb) {

	//SCSS
 	gulp.src('./theme/scss/**/*.scss')
		.pipe(sassGlob())
		.pipe(sourcemaps.init())
  		.pipe(
			sass.sync({
				outputStyle: 'compressed',
				includePaths: [
					'node_modules/@frctl/mandelbrot/assets/scss',
					'node_modules',
					'node_modules/normalize.css',
					'node_modules/sass-mq',
					'node_modules/highlight.js',
				]
  			})
			.on('error', sass.logError)
		)
		.pipe(sourcemaps.write())
  		.pipe(gulp.dest('./assets/css'));

	cb();
}

function start(cb) {
	//Starta lokal scss
	watch('theme/scss/**/*', compile_assets);

	//starta

	const server = fractal.web.server({
        sync: true
    });

	server.on('error', err => logger.error(err.message));

	return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });

	cb();
}

function build(cb) {
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });

	cb();
}

exports.start = start;
exports.build = build;
exports.compile = compile_assets;
exports.default = series(start);
