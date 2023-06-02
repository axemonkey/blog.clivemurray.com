const fs = require('fs');

const posts = fs.readdirSync('./posts', {
	recursive: true,
});

for (post of posts) {
	// console.log(post);

	const fileparts = post.split('/');
	const folder = fileparts[0];
	const file = new String(fileparts[1]);

	if (file.length > 10) {
		const newFile = file.substring(11);
		console.log(newFile);

		// WARNING - DESTRUCTIVE COMMAND. ONLY USE IF SURE ABOUT IT.
		// fs.renameSync(`./posts/${folder}/${file}`, `./posts/${folder}/${newFile}`);
	}
}
