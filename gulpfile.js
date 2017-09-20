// NOTES:
// https://markgoodyear.com/2014/01/getting-started-with-gulp/
// http://www.sitepoint.com/introduction-gulp-js/
// http://ilikekillnerds.com/2014/11/10-highly-useful-gulp-js-plugins-for-a-super-ninja-front-end-workflow/

// *************************
// SETUP STEPS:
//
// # brew install node
// # cd {here}
// # npm install
//
// Then just run 'gulp' to watch directory for changes :)
//
// Or for full testing run 'gulp test'
// *************************


// Include gulp.
const gulp             = require('gulp');

// Include plug-ins.
const jshint           = require('gulp-jshint');
const imagemin         = require('gulp-imagemin');
const notify           = require('gulp-notify');
const autoprefix       = require('gulp-autoprefixer');
const minifyCSS        = require('gulp-minify-css');
const compass          = require('gulp-compass');
const uncss            = require('gulp-uncss');
const concat           = require('gulp-concat');
const uglify           = require('gulp-uglify');
const cssc             = require('gulp-css-condense');
const cssNano          = require('gulp-cssnano');
const webserver        = require('gulp-webserver');
const iconfont         = require('gulp-iconfont');
const iconfontCss      = require('gulp-iconfont-css');
const iconfontTemplate = require('gulp-iconfont-template');
const ttf2woff2        = require('gulp-ttf2woff2');
const pa11y            = require('gulp-pa11y');
const w3cValidation    = require('gulp-w3c-html-validation');
const casperJs         = require('gulp-casperjs');
const realFavicon      = require ('gulp-real-favicon');
const fs               = require('fs');												// used by check-for-favicon-update

// URL to test locally
const localSiteURL  = 'http://localhost:8000/';
// URL to test locally
const fontName      = 'govcms-icons';
// List of pages that will be tested by pa11y and w3cValidator
const pagesToTest   = [
												"index.html",
												"all-sites.html",
												"dashboard-5.html",
												"404.html",
												"is.html",
												"news.html",
												"news-item.html",
												"pricing.html",
												"pricing-1.html",
												"search-results.html",
												"signup.html",
												"signup-done.html",
												"support.html",
												"status.html",
												"training.html",
												"sub-page.html",
												"contact-us.html",
												"contact-us-done.html",
												"about.html",
											];
// Same as above list, but as complete URLs, as needed for UnCSS
// ..if we want it to use the server and not the file system directly (ie: only .html files would work)
var pagesToTestFullPath = pagesToTest;
for (var i = 0; i < pagesToTestFullPath.length; i++) {
  pagesToTestFullPath[i] = localSiteURL + pagesToTestFullPath[i];
}


// **********************


// JS minify.
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});


// Optimise images.
gulp.task('images', function() {
  return gulp.src('./src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./img'))
});


// Optimise favicons.
gulp.task('favicons', function() {
  return gulp.src('./src/favicon/favicons/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./favicons'))
});


// Compile the Sass.
gulp.task('styles', function() {
  gulp.src('./src/sass/*.scss')
    .pipe(compass({
      sass: './src/sass'
    }))
    .pipe(concat('./styles.css'))
    .pipe(cssc())
    .pipe(uncss({
      // html: ['index.html'],
      html: pagesToTestFullPath,
      ignore: [
								'hover',
								'active',
								'focus',
								'click',
								'navbar',
								'top-nav-collapse',
								'header',
								/\w\.in/,
								'.fade',
								'.collapse',
								'collapsing',
								/(#|\.)navbar(\-[a-zA-Z]+)?/,
								/(#|\.)dropdown(\-[a-zA-Z]+)?/,
								/(#|\.)(open)/,
								'.modal',
								'.modal.fade.in',
								'.modal-dialog',
								'.modal-document',
								'.modal-scrollbar-measure',
								'.modal-backdrop.fade',
								'.modal-backdrop.in',
								'.modal.fade.modal-dialog',
								'.modal.in.modal-dialog',
								'.modal-open',
								'.in',
								'.modal-backdrop',
								'.fade',
								'.fade.in',
								'.collapse',
								'.collapse.in',
								'.collapsing',
								'.alert-danger',
								'.open',
								'/open+/',
							]
    }))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
		.pipe(cssNano())
    .pipe(gulp.dest('./css/'));
});


// Local server (localhost:8000).
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      // directoryListing: true,	// overwrites index.html
      open: true,
    }));
});
// The same, but don't open it up or livereload - it's just for riunning in the background
gulp.task('webserver-bg', function() {
  gulp.src('./')
    .pipe(webserver());
});


// SVG files to a font file.
gulp.task('iconFont', function(){
	var runTimestamp = Math.round(Date.now()/1000);
  return gulp.src(['./src/font-icons/*.svg'])
		// .pipe(iconfontTemplate({
		// 	fontName: fontName,
		// 	// path: 'assets/templates/template.html',
		// 	targetPath: fontName+'.html',		                // relative to the path used in gulp.dest()
		// }))
		.pipe(iconfontCss({
      fontName: fontName,
      path: 'scss',
      targetPath: '../src/sass/_'+fontName+'.scss',		// relative to the path used in gulp.dest()
      fontPath: '../../fonts/'
    }))
		.pipe(iconfont({
      fontName:       fontName,                       // required
      prependUnicode: true,                           // recommended option
      formats:        ['ttf', 'eot', 'woff'],         // default, 'woff2' and 'svg' are available
      timestamp:      runTimestamp,                   // recommended to get consistent builds when watching files
      normalize:      true,                           // The provided icons does not have the same height it could lead to unexpected results. Using the normalize option could solve the problem.
    }))
    .pipe(gulp.dest('./fonts/'));
});
// Once the fonts are updated, create a woff2 version as well.
gulp.task('ttf2woff2', function(){
  gulp.src(['fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('fonts/'));
});


// Crawl local site and create sitemap.json file.
// TODO


gulp.task('pa11y', ['webserver-bg'], pa11y({
	url:               localSiteURL,
	failOnError:       true, // fail the build on error
	// showFailedOnly: true, // show errors only and override reporter reporter: 'console'
}));


// Runs HTML validation over the URLs listsed in the json file.
gulp.task('htmlValidation', ['webserver-bg'], function() {
  return gulp.src('')
    .pipe(w3cValidation({
      generateReport: false,
      // generateCheckstyleReport: './tests/w3cErrors/validation.xml',
      remotePath:     localSiteURL,
			// remoteFiles: './tests/test-urls.json'
      remoteFiles:    pagesToTest,
    }))
});


// Casper JS Tests
gulp.task('casperJS', ['webserver-bg'], function () {
  gulp.src('./tests/casperjs-tests.js')
    .pipe(casperJs({command:'test'})); //run casperjs test casperjs-tests.js
});


// Favicons creation
var faviconDataFile         = './src/favicon/faviconData.json';
// File where the favicon markups are stored
var faviconColour           = '#ffffff';
var faviconBackgroundColour = '#384249';
// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: './src/favicon/master-favicon.svg',
		dest: './src/favicon/favicons',
		iconsPath: '/favicons/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: faviconBackgroundColour,
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: faviconColour,
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: faviconColour
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: true
		},
		markupFile: faviconDataFile
	}, function() {
		done();
	});
});
// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
// gulp.task('inject-favicon-markups', function() {
// 	return gulp.src([ 'TODO: List of the HTML files where to inject favicon markups' ])
// 		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(faviconDataFile)).favicon.html_code))
// 		.pipe(gulp.dest('TODO: Path to the directory where to store the HTML files'));
// });
// Check for updates on RealFaviconGenerator
// (ie: If Apple has just released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your CI
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(faviconDataFile)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});


// ********************************************************************************************************************************************



// Default gulp task.
gulp.task('default', ['images', 'scripts', 'styles'], function() {
  // Watch for img optim changes.
  gulp.watch('./src/img/**', function() {
    gulp.start('images');
  });
  // Watch for JS changes.
  gulp.watch('./src/js/*.js', function() {
    gulp.start('scripts');
  });
  // Watch for font icon changes.
  gulp.watch('./src/font-icons/*.svg', function() {
    gulp.start('iconFont');
  });
  // Watch for font changes so we acn create a woff2 file
  gulp.watch('./fonts/*.ttf', function() {
    gulp.start('ttf2woff2');
  });
  // Watch for Sass changes.
  gulp.watch('./src/sass/*.scss', function() {
    gulp.start('styles');
  });
  // Watch for Favicon changes.
  gulp.watch('./src/favicon/master-favicon.svg', function() {
    gulp.start('favicon');
  });
  gulp.watch('./src/favicon/favicons/**', function() {
    gulp.start('favicons');
  });
	// Start the local web server
	gulp.start('webserver');
	// Check for updates for the favicon creation
	// gulp.start('check-for-favicon-update');
	// TODO: errors atm.
});


// Tests, we don't want running all the time. But should run before we commit.
gulp.task('test', ['webserver-bg'], function() {
	// Start the local web server
	gulp.start('webserver');
	// Test ally
	gulp.start('pa11y');
	// Test HTML w3c validation
	gulp.start('htmlValidation');
	// Run CasperJS tests over local site
	gulp.start('casperJS');
});


// Generates a site map for UnCSS and HTML validation to use.
// gulp.task('crawl', function() {
// 	// Start the local web server
// 	gulp.start('webserver');
// 	// Crawl the pages
// 	// TODO - for now manually done.
// });
