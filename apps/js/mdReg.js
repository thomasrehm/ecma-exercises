var mdReg = function (win) {
	var win = window,
		doc = document,
		popup_win = null,
		sectionHead = '<section>',
		sectionEnd = '</section>',
		nextBtn = '<div id="next">Next</div>',
		prevBtn = '<div id="previous">Previous</div>',
		textArea = doc.getElementById('mdInput');

	function convert() {
		var dataStr = textArea.value;
		var dataHtml = parseMD(dataStr);
		dataHtml = makePres(dataHtml);
		doc.getElementById('preview').innerHTML = dataHtml;
		return dataHtml
	}

	function saveToLocalstorage() {
		localStorage.removeItem('rawPresentation');
		var dataStr = textArea.value;
		localStorage.setItem('rawPresentation', encodeURIComponent(dataStr));
	}

	function getFromLocalstorage() {
		var rawPresentation = decodeURIComponent(localStorage.getItem('rawPresentation'));

		if (rawPresentation != 'null') {
			textArea.value = rawPresentation;
		}

	}

	function makePres(data) {
		var input = data,
			output = sectionHead + input + sectionEnd;
		return output;
	}

	function makeSite() {
		var siteStart = '%3Chtml%3E%0A%3Chead%3E%0A%3Cmeta%20charset%3D%22utf-8%22%3E%0A%3Ctitle%3EPresentation%3C/title%3E%0A%3Clink%20rel%3D%22stylesheet%22%20href%3D%22app10.css%22%3E%20%3C/head%3E%0A%3Cbody%3E%0A%3Cdiv%20id%3D%22prevBtn%22%3E%26lt%3B%3C/div%3E',
			siteEnd = '%3Cdiv%20id%3D%22nextBtn%22%3E%26gt%3B%3C/div%3E%0A%3Cscript%20type%3D%22text/javascript%22%3E%0Avar%20slide%20%3D%200%3B%0Avar%20section%20%3D%20document.querySelectorAll%28%27section%27%29%2C%0AprevBtn%20%3D%20document.getElementById%28%27prevBtn%27%29%2C%0AnextBtn%20%3D%20document.getElementById%28%27nextBtn%27%29%3B%0A%0Afunction%20showHideBtn%28slide%29%20%7B%0Aconsole.log%28section.length%29%3B%0Aif%20%28slide%20%3D%3D%3D%200%29%20%7B%0AprevBtn.style.visibility%20%3D%20%27hidden%27%3B%0AnextBtn.style.visibility%20%3D%20%27%27%3B%0A%7D%20else%20%7B%0AprevBtn.style.visibility%20%3D%20%27%27%3B%0A%7D%0Aif%20%28slide%20%21%3D%200%20%26%26%20section.length%20-%201%20%3D%3D%20slide%29%20%7B%0AprevBtn.style.visibility%20%3D%20%27%27%3B%0AnextBtn.style.visibility%20%3D%20%27hidden%27%3B%0A%7D%0A%7D%3B%0Aif%20%28slide%20%3D%3D%200%29%20%7B%0AprevBtn.style.visibility%20%3D%20%27hidden%27%3B%0A%7D%20else%20%7B%0AprevBtn.style.visibility%20%3D%20%27display%27%3B%0A%7D%0AprevBtn.onclick%20%3D%20function%28%29%20%7B%0AchangeSlide%28-1%29%3B%0A%7D%3B%0AnextBtn.onclick%20%3D%20function%28%29%20%7B%0AchangeSlide%281%29%3B%0A%7D%3B%0A%0Afunction%20changeSlide%28n%29%20%7B%0Asection%5Bslide%5D.style.display%20%3D%20%27none%27%3B%0Aslide%20%3D%20slide%20+%20n%3B%0Asection%5Bslide%5D.style.display%20%3D%20%27block%27%3B%0Aconsole.log%28slide%29%3B%0AshowHideBtn%28slide%29%3B%0A%7D%0A%3C/script%3E%0A%3C/body%3E%0A%0A%3C/html%3E',
			data = convert(),
			site = decodeURIComponent(siteStart) + data + decodeURIComponent(siteEnd);
		popup(site);

	}

	function popup(str) {

		var o = o || {
			top: 20,
			left: 150,
			width: 800,
			height: 600
		};
		var flags;
		flags = "resizable=yes,scrollbars=yes,top=" + o.top + ",left=" + o.left + ",width=" + o.width + ",height=" + o.height;
		if (popup_win) {
			popup_win.close();
		}
		popup_win = null;
		// global: popup_win
		popup_win = win.open("", "popup", flags);
		popup_win.document.write(str);

		if (popup_win.opener) {
			popup_win.opener = self;
		}
		if (popup_win.focus) {
			popup_win.focus();
		}
		return popup_win;
	}
	//parse function heavily inspired by http://pzxc.com/simple-javascript-markdown-parsing-function
	function parseMD(str) {
		var r = str,
			ii, code1 = [],
			code2 = [];

		// detect newline format
		var newline = r.indexOf('\r\n') != -1 ? '\r\n' : r.indexOf('\n') != -1 ? '\n' : '';
		console.log(newline);
		// store <code> code-formatted blocks </code>
		r = r.replace(new RegExp('<code>([\\s\\S]*?)</code>', 'gi'), function (x) {
			code2.push(x.substring(6, x.length - 7));
			return '<code></code>';
		});

		// h1 - h4 and
		r = r.replace(/^#### (.*)=*/gm, '<h4>$1</h4>');
		r = r.replace(/^### (.*)=*/gm, '<h3>$1</h3>');
		r = r.replace(/^## (.*)=*/gm, '<h2>$1</h2>');
		r = r.replace(/^# (.*)=*/gm, '<h1>$1</h1>');

		//close and begin section
		r = r.replace(/^[-*][-*][-*]+/gm, '</section><hr><section>');

		// bold, italics, and code formatting
		r = r.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
		r = r.replace(/\*(.*?)\*/g, '<em>$1</em>');
		r = r.replace(/``(.*?)``/g, '<pre>$1</pre>');

		// unordered lists
		r = r.replace(/^\-\-\-\- (.*)/gm, '<ul><ul><ul><ul><li>$1</li></ul></ul></ul></ul>');
		r = r.replace(/^\-\-\- (.*)/gm, '<ul><ul><ul><li>$1</li></ul></ul></ul>');
		r = r.replace(/^\-\- (.*)/gm, '<ul><ul><li>$1</li></ul></ul>');
		r = r.replace(/^\- (.*)/gm, '<ul><li>$1</li></ul>');
		for (ii = 0; ii < 3; ii++) r = r.replace(new RegExp('</ul>' + newline + '<ul>', 'g'), newline);

		// ordered lists
		r = r.replace(/^\+\+\+\+ (.*)/gm, '<ol><ol><ol><ol><li>$1</li></ol></ol></ol></ol>');
		r = r.replace(/^\+\+\+ (.*)/gm, '<ol><ol><ol><li>$1</li></ol></ol></ol>');
		r = r.replace(/^\+\+ (.*)/gm, '<ol><ol><li>$1</li></ol></ol>');
		r = r.replace(/^\+ (.*)/gm, '<ol><li>$1</li></ol>');
		for (ii = 0; ii < 3; ii++) r = r.replace(new RegExp('</ol>' + newline + '<ol>', 'g'), newline);

		// links
		r = r.replace(/\[\[(http:[^\]|]*?)\]\]/g, '<a target="_blank" href="$1">$1</a>');
		r = r.replace(/\[\[(http:[^|]*?)\|(.*?)\]\]/g, '<a target="_blank" href="$1">$2</a>');
		r = r.replace(/\[\[([^\]|]*?)\]\]/g, '<a href="$1">$1</a>');
		r = r.replace(/\[\[([^|]*?)\|(.*?)\]\]/g, '<a href="$1">$2</a>');

		// images
		r = r.replace(/{{([^\]|]*?)}}/g, '<img src="$1">');
		r = r.replace(/{{([^|]*?)\|(.*?)}}/g, '<img src="$1" alt="$2">');

		// hard linebreak if there are 2 or more spaces at the end of a line
		r = r.replace(new RegExp(' + ', 'g'), '<br>' + newline);

		// split on double-newlines, then add paragraph tags when the first tag isn't a block level element
		if (newline != '') {
			for (var p = r.split(newline + newline), i = 0; i < p.length; i++) {
				var blockLevel = false;
				if (p[i].length >= 1 && p[i].charAt(0) == '<') {
					// check if the first tag is a block-level element
					var firstSpace = p[i].indexOf('<'),
						firstCloseTag = p[i].indexOf('>');
					var endIndex = firstSpace > -1 && firstCloseTag > -1 ? Math.min(firstSpace, firstCloseTag) : firstSpace > -1 ? firstSpace : firstCloseTag;
					var tag = p[i].substring(1, endIndex).toLowerCase();
					for (var j = 0; j < p[i].length; j++)
						if (p[i][j] == tag) blockLevel = true;
				} else if (p[i].length >= 2 && p[i].charAt(0) == '>' && p[i].charAt(1) == ' ') {
					// format the paragraph as a blockquote
					blockLevel = true;
					p[i] = '<blockquote>' + p[i].replace(/^> /gm, '') + '</blockquote>';
				}
				if (!blockLevel) {
					p[i] = '<p>' + p[i] + '</p>';
				}
			}
		}
		// reassemble the paragraphs
		if (newline != '') {
			r = p.join(newline);
		}

		// restore the codeformatted and unformatted blocks
		r = r.replace(new RegExp('<code></code>', 'g'), function (match) {
			return '<code>' + code2.shift() + '</code>';
		});

		return r;
	};

	return {
		mdReg: mdReg,
		convert: convert,
		makeSite: makeSite,
		saveToLocalstorage: saveToLocalstorage,
		getFromLocalstorage: getFromLocalstorage
	}
}(window);
