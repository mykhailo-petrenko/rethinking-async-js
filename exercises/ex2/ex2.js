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
	let subscribe;
	let responce;

	fakeAjax(file, (text) => {
		if (subscribe === undefined) {
			responce = text;
		} else {
			subscribe(text);
		}
	});

	return function(cb) {
		if (responce === undefined) {
			subscribe = cb;
		} else {
			cb(responce);
		}
	};
}

// request all files at once in "parallel"

const f1 = getFile('file1');
const f2 = getFile('file2');
const f3 = getFile('file3');

f1((text1) => {
	output(text1);
	f2((text2) => {
		output(text2);
		f3((text3) => {
			output(text3);
		});
	});
});
