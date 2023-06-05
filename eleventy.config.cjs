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

	return {
		// markdownTemplateEngine: "hbs",
		dir: {
			includes: "_includes",
			layouts: "_layouts",
		},
	}
};
