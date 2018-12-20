const { watch, series, parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const sassGlob = require('gulp-sass-glob');
const fractal = require('@frctl/fractal').create();
const logger = fractal.cli.console;
const path = require("path");
const mandelbrot = require("@frctl/mandelbrot");
var sourcemaps = require('gulp-sourcemaps');


const statuses = {
	prototype: {
        label: "🤓 Prototyp",
        description: "Ej redo för produktion/spridning",
        color: "#C82828"
    },
	wip: {
        label: "🙏 Under arbete",
        description: "Under arbete. Bidra gärna med feedback.",
        color: "#FDB813"
    },
    ready: {
        label: "🎉 Klar",
        description: "Färdig för produktion/Klar för spridning",
        color: "#378A30"
    }
}
// create a new instance with custom config options
const theme = mandelbrot({
	"nav": ["docs", "components"],
	"panels": ["notes", "html", "view", "context", "resources", "info"],
	"lang": "sv",
	"favicon": "/assets/img/favicon.ico",
	"scripts": [

		"https://code.jquery.com/jquery-3.3.1.min.js",
		"https://code.jquery.com/ui/1.12.1/jquery-ui.js",
		"/assets/scripts/main.js"
	],
	"styles": [
		"https://use.typekit.net/vip6kss.css",
		"https://unpkg.com/@regionhalland/styleguide-v2@0.8.2/dist/css/main.min.css",
		"/assets/css/skin.css"],
    // any other theme configuration values here
});


const hbs = require('@frctl/handlebars')({
    helpers: {
        componentList: function() {
            let ret = "<ul>";
            const options = Array.from(arguments).pop();

            for (let component of fractal.components.flatten()) {
                ret = ret + "<li>" + options.fn(component.toJSON()) + "</li>";
            }

            return ret + "</ul>";
        }
    }
    /* other configuration options here */
});

fractal.components.engine(hbs);
fractal.docs.engine(hbs);

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
fractal.components.set("default.collated", true);
fractal.components.set("statuses", statuses);

fractal.docs.set('indexLabel', 'Översikt');
fractal.docs.set("label", "Dokumentation"); // default is "Components"
fractal.docs.set("title", "Dokumentation"); // default is "Components"
fractal.docs.set("path", path.join(__dirname, "dokumentation"));
fractal.docs.set("statuses", statuses);


function scss(cb) {

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
logger.success('Byggde CSS');
	cb();
}

function js(cb) {

	//SCSS
 	gulp.src('./theme/js/**/*.js')
		.pipe(uglify())
		.on('error', function (err) {
			logger.error(err.toString());
		})
  		.pipe(gulp.dest('./assets/scripts'));


	logger.success('Byggde JS');
	cb();
}

function start(cb) {
	//Starta lokal scss


	watch('theme/js/**/*', js);
	watch('theme/scss/**/*', scss);

	//starta servern

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
exports.compile = parallel(scss,js);
exports.default = series(start);
