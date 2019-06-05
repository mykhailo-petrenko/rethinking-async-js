function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	return new Promise(function(done){
		fakeAjax(file,done);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

function *fetchFiles() {
	const r1 = getFile('file1');
	const r2 = getFile('file2');
	const r3 = getFile('file3');

	output(yield r1);
	output(yield r2);
	output(yield r3);

	return "Complete";
};

chainResolver(fetchFiles());

async function chainResolver(gen) {
	let prev;
	while (true) {
		const {done, value} = gen.next(prev);

		if (done) {
			output(value);
			break;
		}

		prev = await value;
	}
}

// let gen = fetchFiles();
// gen.next().value
// 	.then((text) => gen.next(text).value)
// 	.then((text) => gen.next(text).value)
// 	.then((text) => gen.next(text).value)
// 	.then(output);
