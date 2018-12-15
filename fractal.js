"use strict";

/*
* Require the path module
*/
const path = require("path");

/*
 * Require the Fractal module
 */
const fractal = module.exports = require("@frctl/fractal").create();
const mandelbrot = require("@frctl/mandelbrot"); // require the Mandelbrot theme module

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
/*
 * Give your project a title.
 */
fractal.set("project.title", "Region Halland Design Guidelines");

/*
 * Tell Fractal where to look for components.
 */


/*
 * Tell Fractal where to look for documentation pages.
 */


/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
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
