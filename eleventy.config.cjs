const collections = require("./collections.cjs");
const moment = require('moment');

moment.locale('en-gb');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/public');
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setServerOptions({
		// liveReload: false,
		watch: [
			'src/public/**/*',
		],
		showVersion: true,
	});

	Object.keys(collections).forEach((collectionName) => {
		eleventyConfig.addCollection(collectionName, collections[collectionName]);
	});

	eleventyConfig.addFilter('dateIso', date => {
		return moment(date).toISOString();
	});

	eleventyConfig.addFilter('dateReadable', date => {
		return moment(date).utc().format('DD MMM YYYY');
	});

	eleventyConfig.addFilter('dateComfortable', date => {
		return moment(date).utc().format('LL');
	});

	eleventyConfig.addFilter('dateHyphenated', date => {
		return moment(date).utc().format('YYYY-MM-DD');
	});

	return {
		// markdownTemplateEngine: "hbs",
		dir: {
			includes: "_includes",
			layouts: "_layouts",
		},
	}
};
