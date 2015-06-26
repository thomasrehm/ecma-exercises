var ajax = function (win) {
	var win = window,
		doc = document,
		baseURL = win.location.href.replace(/^(.+)\/.*$/, "$1"),
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

	var getValues = function () {
		var f = {};
		f.caesar = Boolean(false);
		f.tea = Boolean(true);
		f.password = String(document.getElementById('pw').value);
		f.input = String(document.getElementById('ta0').value);
		f.user = String(document.getElementById('user').value);
		f.key = String(f.password + f.user);
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


	function submitNote() {
		var f = getValues();

		if (f.input.trim() === '') {
			var msg = "Notiz leer";
			alert(msg);
			console.log(msg);

			return false;
		} else {
			var newNote = createNote(),
				file = "app7/app-7.php",
				request_type = "POST",
				data;

			data = JSON.stringify(newNote);
			url = baseURL + "/" + file;
			checkOnlineState();
			runRequest(request_type, url, data);
			doc.getElementById('ta0').value = '';
			//loadNotes();
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

		doc.getElementById('json_output').innerHTML = prevHTML;
	}

	function loadNotes() {
		var request_type = "GET",
			f = getValues(),
			data,
			url = baseURL + "/app7/.notes_" + f.user + "";

		runRequest(request_type, url, data);
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
