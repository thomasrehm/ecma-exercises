var ajax = function (win) {
	var win = window,
		doc = document,
		baseURL = win.location.href.replace(/^(.+)\/.*$/, "$1"),
		iframeInput = parent.document.getElementById('iFrame_INPUT'),
		iframeInputWin = iframeInput.contentWindow,
		iframeInputDoc = iframeInput.contentDocument ? iframeInput.contentDocument : iframeInput.contentWindow.document,
		iframeOutput = parent.document.getElementById('iFrame_OUTPUT'),
		iframeOutputWin = iframeOutput.contentWindow,
		iframeOutputDoc = iframeOutput.contentDocument ? iframeOutput.contentDocument : iframeOutput.contentWindow.document,
		response;

	// inspired by http://jsfiddle.net/yahavbr/dVz7y/
	var creationDate = function () {
		var now = new Date();
		var strDateTime = [
			[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("."), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":")
		].join(" ");
		return strDateTime;

	}();

	// inspired by http://jsfiddle.net/yahavbr/dVz7y/
	function AddZero(num) {
		return (num >= 0 && num < 10) ? "0" + num : num + "";
	}

	function getPassword() {
		var password;
		if (document.getElementById('pw')) {
			password = String(document.getElementById('pw').value);
		} else {
			password = String(iframeInputDoc.getElementById('pw').value);

		}
		return password;
	};

	function getInput() {
		var input;
		if (document.getElementById('ta0')) {
			input = String(document.getElementById('ta0').value);
		} else {
			input = String(iframeInputDoc.getElementById('ta0').value);
		}
		return input;
	};

	function getUser() {
		var user;
		if (document.getElementById('user')) {
			user = document.getElementById('user').value;
		} else {
			user = iframeInputDoc.getElementById('user').value;
		}
		return user;
	};
	var getValues = function () {
		var f = {};
		f.caesar = Boolean(false);
		f.tea = Boolean(true);
		f.password = getPassword();
		f.input = getInput();
		f.user = getUser();
		f.key = String(f.password + f.user);
		// console.log(f);
		return f;
	}

	var checkFieldState = function () {
		var f = getValues();
		if (f.input == '') {
			return 'is empty';
		}

	}

	function encryptText() {
		var f = getValues();


		// check if note.content is not empty
		if (!f.input) {
			var msg = "Notiz leer";
			alert(msg);
			console.log(msg);
			return;
		}

		var output = e2e.encrypt_plain(f.input, f.key, f.caesar, f.tea);
		//var output = f.input;

		return output;
	}

	function createNote() {
		var note = {},
			f = getValues();

		note.date = creationDate;
		note.user = f.user;
		note.content = encryptText();
		return note;

	}
	// Script for unique ID creation copied from Jaspreet Chahal (C) ( http://jaspreetchahal.org/jquery-javascript-create-unique-id-for-an-element/ )
	function uniqID(idlength) {
		var charsToFormId = '_0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
		if (!idlength) {
			idlength = Math.floor(Math.random() * charsToFormId.length);
		}
		var uniqid = '';
		for (var i = 0; i < idlength; i++) {
			uniqid += charsToFormId[Math.floor(Math.random() * charsToFormId.length)];
		}
		return uniqid;
	}

	function submitNote(localstorage) {
		var f = getValues();

		if (f.input.trim() === '') {
			var msg = "Notiz leer";
			alert(msg);
			console.log(msg);
			return;
		} else {
			var newNote = createNote(),
				data = JSON.stringify(newNote);

			if (localstorage) {
				var id = uniqID(10);
				localStorage.setItem('notes_' + f.user + '-' + id, data);
				loadNotes('localstorage');
			} else {
				var file = "app7/app-7.php",
					request_type = "POST";
				url = baseURL + "/" + file;
				checkOnlineState();
				runRequest(request_type, url, data);

			}
			doc.getElementById('ta0').value = '';

			//loadNotes();
		}

	}

	function loadNotes(localstorage) {
		var f = getValues();
		if (localstorage) {
			console.log('load data from localStorage');
			var storageResponse = '';
			var notesOfUser = 'notes_' + f.user + '-';
			// load all items from localstorage
			for (var i = 0, len = localStorage.length; i < len; ++i) {
				key = localStorage.key(i);
				item = localStorage.getItem(key);
				keyUser = key.split('-');
				keyUser = keyUser[0] + '-';
				if (keyUser === notesOfUser) {
					storageResponse += item + ', ';
				}
			}

			storageResponse = storageResponse.substring(0, storageResponse.length - 2);
			if (!storageResponse) {
				if (document.getElementById('json_output')) {
					doc.getElementById('json_output').innerHTML = '<p>Keine Notizen gefunden.</p>';
				} else {
					iframeOutputDoc.getElementById('json_output').innerHTML = '<p>Keine Notizen gefunden.</p>';
				}
				return;
			} else {
				showNotes(storageResponse);
			}
		} else {
			console.log('load data from server');
			var request_type = "GET",
				data,
				url = baseURL + "/app7/.notes_" + f.user + "";
			runRequest(request_type, url, data);

		}
	}

	function showNotes(response) {

		response = '{"notes": [' + response + ']}';
		var notesJSON = JSON.parse(String(response)),
			f = getValues();
		var prevHTML = '';

		for (var note in notesJSON.notes) {
			var content = notesJSON.notes[note].content;
			content = e2e.decrypt_plain(content, f.key, f.caesar, f.tea);
			var date = notesJSON.notes[note].date;
			prevHTML = prevHTML + '<div class="note"><p>' + content + '</p><i>' + date + '</i></div>';

		}
		if (document.getElementById('json_output')) {
			doc.getElementById('json_output').innerHTML = prevHTML;
		} else {
			iframeOutputDoc.getElementById('json_output').innerHTML = prevHTML;
		}

	}



	function is_online() {
		return (!/file\:/.test(win.location.protocol)) && (/(http|https)\:/.test(win.location.protocol));
	}

	function checkOnlineState() {
		//check if is online
		if (!is_online()) {
			var msg = "Kein Netz verfügbar";
			alert(msg);
			console.log(msg);
			return;
		}

	}

	// inspired by https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
	function runRequest(type, url, data) {
		// send to server
		try {
			if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
				httpRequest = new XMLHttpRequest();
			} else if (window.ActiveXObject) { // IE 6 and older
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} catch (failed) {
			console.log("fail");
			return;
		}

		httpRequest.open(type, url, true);
		httpRequest.setRequestHeader("Content-Type", "application/json");

		if (data) {
			httpRequest.send(data);
		} else {
			httpRequest.send();


		}
		httpRequest.onreadystatechange = alertContents;




	}

	function alertContents() {
		try {
			if (httpRequest.readyState === 4) {
				if (httpRequest.status === 200) {
					//console.log(httpRequest.responseText);
					showNotes(httpRequest.responseText);

				} else if (httpRequest.status === 404) {
					doc.getElementById('json_output').innerHTML = '<p>Keine Notizen gefunden.</p>';
				} else {
					console.log('There was a problem with the request.');
				}

			}

		} catch (e) {
			console.log('Caught Exception: ' + e);
		}
	}


	return {
		ajax: ajax,
		submitNote: submitNote,
		loadNotes: loadNotes
	};
}(window);
