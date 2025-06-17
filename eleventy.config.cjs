const collections = require('./collections.cjs');
const moment = require('moment');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootNote = require('markdown-it-footnote');
const pos = require('pos');
let seedVal = 0;

moment.locale('en-gb');

const tagger = new pos.Tagger();
// console.log(tagger.lexicon);
const words = {
	nouns: [],
	adjectives: [],
	verbsPresent: [],
	verbsPast: [],
	adverbs: [],
};

for (const lexWord in tagger.lexicon) {
	if (Object.prototype.hasOwnProperty.call(tagger.lexicon, lexWord)) {
		const wordTypesArray = tagger.lexicon[lexWord];
		// console.log(wordTypesArray);
		if (wordTypesArray.includes('NN')) {
			words.nouns.push(lexWord);
		}
		if (wordTypesArray.includes('JJ')) {
			words.adjectives.push(lexWord);
		}
		if (wordTypesArray.includes('VB')) {
			words.verbsPresent.push(lexWord);
		}
		if (wordTypesArray.includes('VBD')) {
			words.verbsPast.push(lexWord);
		}
		if (wordTypesArray.includes('RB')) {
			words.adverbs.push(lexWord);
		}
	}
}
// console.log(`**Nonsensifier – number of nouns: ${words.nouns.length}`);
// console.log(`**Nonsensifier – number of adjectives: ${words.adjectives.length}`);
// console.log(`**Nonsensifier – number of verbsPresent: ${words.verbsPresent.length}`);
// console.log(`**Nonsensifier – number of verbsPast: ${words.verbsPast.length}`);
// console.log(`**Nonsensifier – number of adverbs: ${words.adverbs.length}`);

const calculateWordValue = (word) => {
	let wordVal = 0;
	for (const letter in word) {
		const letterVal = letter.charCodeAt();
		wordVal += letterVal;
	}
	return wordVal;
};

const getReplacement = (word, type, seedVal) => {
	let wordValue = calculateWordValue(word);
	wordValue += seedVal;
	const whichWord = wordValue % words[type].length;
	const newWord = words[type][whichWord - 1];

	return {
		word: newWord,
		wordValue,
	};
};

const nonsensify = content => {
	seedVal = 0;
	let text = content.replaceAll(' An ', ' The ');
	text = text.replaceAll(' A ', ' The ');
	text = text.replaceAll(' an ', ' the ');
	text = text.replaceAll(' a ', ' the ');

	const taggable = new pos.Lexer().lex(text);
	const taggedWords = tagger.tag(taggable);

	for (const index in taggedWords) {
		const taggedWord = taggedWords[index];
		const word = taggedWord[0];
		const tag = taggedWord[1];
		let type;
		if (tag === 'NN') {
			type = 'nouns';
		}
		if (tag === 'JJ') {
			type = 'adjectives';
		}
		if (tag === 'VB') {
			type = 'verbsPresent';
		}
		if (tag === 'VBD') {
			type = 'verbsPast';
		}
		if (tag === 'RB') {
			type = 'adverbs';
		}
		if (type && /^[A-Za-z]+$/.test(word)) {
			const getNewWord = getReplacement(word, type, seedVal);
			// console.log(getNewWord);
			let replacement = getNewWord.word;
			const firstChar = word.charAt(0);
			const uppercase = firstChar === firstChar.toUpperCase();
			if (uppercase) {
				if (replacement.charAt(1)) {
					replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
				} else {
					replacement = replacement.charAt(0).toUpperCase();
				}
				// console.log(replacement);
			}
			text = text.replace(word, replacement);
			seedVal += getNewWord.wordValue;
			if (seedVal > 1000000) {
				seedVal -= 1000000;
			}
		}
	}

	return text;
};

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
		allowedAttributes: ['id', 'class', 'loading', 'title'],
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

	eleventyConfig.addFilter('nonsensify', content => {
		return nonsensify(content);
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
