module.exports = function (eleventyConfig) {
	// eleventyConfig.addPassthroughCopy('blog.clivemurray.com/public');
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setServerOptions({
		// liveReload: false,
		// watch: [
		// 	'blog.clivemurray.com/public/**/*',
		// ],
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
