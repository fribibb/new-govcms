var phantomcss = require('phantomcss');
// Site vars
var siteURL    = 'http://localhost:8000/';
var siteName   = 'new-govCMS';

// Start a casper test.
casper.test.begin(siteName, function(test) {

	phantomcss.init({
		screenshotRoot:        './tests/casperjs_screenshots',
		failedComparisonsRoot: './tests/casperjs_screenshots_fails',
		rebase:                casper.cli.get('rebase')
	});

	// Open page.
	casper.start(siteURL);

	// Set your preferred view port size.
	casper.viewport(1366, 768);

	casper.then(function() {
		// Take the screenshot of the whole body element and save it under "{siteName}-body.png".
		// The first parameter is the CSS selector.
		phantomcss.screenshot('body', siteName+'-body');
	});

	casper.then(function compare_screenshots() {
		// Compare screenshots.
		phantomcss.compareAll();
	});

	// Run tests.
	casper.run(function() {
		console.log('\nTests Completed.\n');
		casper.test.done();
	});

});
