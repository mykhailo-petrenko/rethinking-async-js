function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		console.log("Responding: " + url);
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way
class AjaxQueue {
	constructor() {
		this._responsesCount = 0;
		this._expectedResponsesCount = 0;
		this._queue = [];
	}

	printResult() {
		this._queue.forEach(output);
	}

	getHandler() {
		const order = this._expectedResponsesCount;
		this._expectedResponsesCount++;

		return (text) => {
			this._queue[order] = text;
			this._responsesCount++;

			if (this._responsesCount === this._expectedResponsesCount) {
				this.printResult();
			}
		}
	}
}

const q = new AjaxQueue();

function getFile(file) {
	const handler = q.getHandler();
	fakeAjax(file, handler);
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
