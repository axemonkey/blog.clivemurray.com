const collections = require('./collections.cjs');
const moment = require('moment');
const pluginRss = require('@11ty/eleventy-plugin-rss');

moment.locale('en-gb');

module.exports = function (eleventyConfig) {
	eleventyConfig.addGlobalData('titlePrepend', 'insincere :: ');
	eleventyConfig.addPassthroughCopy('src/public');
	eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });
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

	eleventyConfig.addFilter('titlePrepend', string => {
		return `insince.re :: ${string}`;
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

	eleventyConfig.addFilter('dateComfortableShort', date => {
		return moment(date).utc().format('MMM DD');
	});

	eleventyConfig.addFilter('dateHyphenated', date => {
		return moment(date).utc().format('YYYY-MM-DD');
	});

	eleventyConfig.addPlugin(pluginRss);

	return {
		dir: {
			includes: "_includes",
			layouts: "_layouts",
		},
	}
};
