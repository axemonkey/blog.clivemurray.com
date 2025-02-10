const collections = require('./collections.cjs');
const moment = require('moment');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootNote = require('markdown-it-footnote');

moment.locale('en-gb');

module.exports = function (eleventyConfig) {
	const markdownLib = markdownIt({
		html: true,
		linkify: false,
		typographer: true,
		xhtmlOut: false,
	}).use(markdownItAnchor)
		.use(markdownItFootNote)
		.use(markdownItAbbr)
		.use(markdownItAttrs, {
		allowedAttributes: ['id', 'class'],
	});

	eleventyConfig.setLibrary('md', markdownLib);


	eleventyConfig.addGlobalData('titlePrepend', 'insincere :: ');
	eleventyConfig.addPassthroughCopy('src/public');
	eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setServerOptions({
		liveReload: true,
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
