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
// The old-n-busted callback way

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

function getFiles(urls) {
	const responses = [];
	
	return urls
		.map(getFile)
		.reduce((prev, next) => {
			return prev.then(text => {
				responses.push(text);
				return next;
			})
		})
		.then(text => {
			responses.push(text);
			return responses;
		});
}

getFiles([
	'file1',
	'file2',
	'file3'
]).then(responses => responses.forEach(output));
