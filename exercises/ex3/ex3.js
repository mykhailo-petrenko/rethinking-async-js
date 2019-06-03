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
	return new Promise((resolve, reject) => {
		fakeAjax(file, resolve);
	});
}

// request all files at once in "parallel"
const p1 = getFile('file1');
const p2 = getFile('file2');
const p3 = getFile('file3');

p1.then((t) => {
	output(t);
	return p2;
}).then((t) => {
	output(t);
	return p3;
}).then((t) => {
	output(t);
});
