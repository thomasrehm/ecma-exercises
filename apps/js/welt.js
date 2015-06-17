// === start von app4 ===


///////////////////////////////////
/// welt = canvas-Bib ( ein Anfang )
///////////////////////////////////
var welt = (function (win) {
	"use strict";
	var doc = win.document; //, gespeicherte_strings = {};


	function get_dom_str(id) {
		var node = doc.getElementById(id),
			tn = node.tagName.toLowerCase(),
			r = "";
		if (tn === 'input' || tn === 'textarea') {
			r = node.value;
		} else {
			r = node.innerHTML;
		}
		return r; // liefert String zurück
	}

	//=== canvas ===


	function getData() {
		var values = "[" + get_dom_str('TA0') + "]",
			data = JSON.parse(values);
		console.log(data);
		return data;
	}

	function drawRing() {
		document.getElementById('AUSGABE').style.display = "";
		document.getElementById('ring').style.display = "";
		document.getElementById('balken').style.display = "none";

		var canvas = document.getElementById('ring_canvas');
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var data = getData();

		var i, startAt, versatz, x;
		var sum = 0,
			w1 = 0,
			w = 0,
			r = 80,
			xm = 120,
			ym = 150,
			anz = data.length;

		if (data[0].title) {
			startAt = 1;
			versatz = 0;
			ctx.font = "15px Verdana";
			ctx.fillStyle = "black";
			ctx.fillText(data[0].title, 10, 20);

		} else {
			startAt = 0;
			versatz = 1;
		}


		sum = 0;
		for (i = startAt; i < anz; i += 1) {
			sum += data[i].value;
		}

		w = 0;
		for (i = startAt; i < anz; i += 1) {
			w += data[i].value / sum * 2 * Math.PI;
			data[i].w = w;
			console.log(w);
		}

		w1 = 0;
		for (i = startAt; i < data.length; i += 1) { //if(i !== 0){ w1 = arr[i-1].w; }
			var element = data[i];
			var w2 = element.w;

			ctx.beginPath();
			//ctx.moveTo(xm, ym);
			ctx.strokeStyle = element.color;
			ctx.lineWidth = 50;
			ctx.arc(xm, ym, r, w1, w2, false);
			w1 = w2;
			ctx.stroke();
			//ctx.closePath();

			ctx.fillStyle = element.color;
			//ctx.fill();
			// Legende:
			ctx.fillRect(250, 70 + i * 25, 15, 15);
			ctx.fillStyle = "#000";
			ctx.font = "12px sans-serif";
			ctx.fillText(element.name + " (" + (element.value / sum * 100).toFixed(2) + "%)", 270, 80 + i * 25);
		}
	}

	function drawBalken() {
		document.getElementById('AUSGABE').style.display = "";
		document.getElementById('balken').style.display = "";
		document.getElementById('ring').style.display = "none";

		var canvas = document.getElementById('balken_canvas');
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);


		var data = getData();
		var balken, i, startAt, versatz, faktor = 1 / data.length,
			y, x = 10,
			y = 300 * faktor,
			balken_abstand;

		var sum = 0,
			w1 = 0,
			w = 0,
			r = 50,
			xm = 120,
			ym = 120,
			anz = data.length;

		if (data[0].title) {
			startAt = 1;
			versatz = 0;
			ctx.font = "15px Verdana";
			ctx.fillStyle = "black";
			ctx.fillText(data[0].title, x, 20);

		} else {
			startAt = 0;
			versatz = 1;
		}


		sum = 0;
		for (i = startAt; i < anz; i += 1) {
			sum += data[i].value;
		}


		for (i = startAt; i < anz; i += 1) {
			w = 0;
			w += data[i].value / sum * 300;
			data[i].w = w;
			console.log(w);
		}

		w1 = 0;

		for (i = startAt; i < data.length; i += 1) {
			var element = data[i];
			var w2 = element.w;

			ctx.fillStyle = element.color;
			ctx.fillRect(x, 40 + (y * ([i] - startAt)) - (20 * versatz), w2, y - (150 * faktor));
			// ctx.fillRect(x, 40 + (y * ([i] - startAt)) - (20 * versatz), element.value, y - (150 * faktor));
			ctx.fillStyle = element.color;
			ctx.font = "12px Verdana";
			var legend_text = element.name + " (" + (element.value / sum * 100).toFixed(2) + "%)";
			ctx.fillText(legend_text, x, 35 + (y * ([i] - startAt)) - (20 * versatz));


		}

	}

	function download_img(link, canvasId, filename) {
		link.href = document.getElementById(canvasId).toDataURL();
		link.download = filename;
	}


	function draw() {
		var m, x, y, rect = CAN.getBoundingClientRect();
		// e = win.event;

		CAN.onmousedown = function (e) {

			x = parseInt(e.clientX - rect.left, 10);
			y = parseInt(e.clientY - rect.top, 10);

			var radius = CTX.lineWidth / 2;
			//draw a dot to realize a single click dot
			CTX.beginPath();
			CTX.arc(x, y, radius, 0, 2 * Math.PI, true);
			CTX.fillStyle = CTX.strokeStyle;
			CTX.fill();
			//save dot and begin new path drew start line drawing
			CTX.save();
			CTX.beginPath();

			CTX.moveTo(x, y);


		}


		CAN.onmousemove = function (e) {
			if (x == null || y == null) {
				return;
			}
			x = parseInt(e.clientX - rect.left, 10);
			y = parseInt(e.clientY - rect.top, 10);
			CTX.lineTo(x, y);
			CTX.stroke();
			CTX.moveTo(x, y);
		}

		CAN.onmouseup = function (e) {
			x = null;
			y = null;
			//save the current state and start a new path);
			CTX.save();
			//CTX.beginPath();
		}

	}

	var ATTR_DEFAULT = { // default-Device-Context
			font: '10px sans-serif',
			fillStyle: '#489FD7',
			strokeStyle: '#000',
			shadowColor: 'rgba(0, 0, 0, 0.0)',
			lineWidth: 1,
			miterLimit: 10,
			lineCap: 'round',
			lineJoin: 'round',
			shadowBlur: 0,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			textAlign: 'start',
			textBaseline: 'alphabetic',
			globalAlpha: 1,
			globalCompositeOperation: 'source-over'
		},
		ATTR,
		CAN = null, // aktuelle Canvas id="IDC'
		CTX = null; // aktueller Canvas-Device-Context

	function setStrokeColor(color) {
		CTX.strokeStyle = color;
		return CTX;
	}

	function setLineWidth(width) {
		CTX.lineWidth = width;
		return CTX;
	}

	function set_ctx_attr(atts, ctx) {
		for (var property in atts)  {
			if (atts.hasOwnProperty(property) && ATTR.hasOwnProperty(property)) {
				ctx[property] = atts[property];
				//console.log(property + ctx[property]);
				//console.log(property + atts[property]);
			}
		}
	}

	function initialize_canvas(id, height) {
		var offset = doc.getElementById('headline').offsetHeight,
			w, h, canHeight;
		ATTR = ATTR_DEFAULT;
		CAN = doc.getElementById(id);

		if (height == 'full') {
			canHeight = 1;
		} else if (height == 'half') {
			canHeight = 0.5;
		}
		CAN.width = window.innerWidth * 0.7;
		CAN.height = (window.innerHeight - offset) * canHeight;
		CTX = CAN.getContext('2d');
		set_ctx_attr(ATTR, CTX);

		w = CAN.width;
		h = CAN.height;


		CTX.fillRect(0, 0, w, h);
		CAN.style.cursor = 'pointer';
		//console.log(CTX);

	}

	function printStat(title, number) {
		CTX.font = "15px Verdana";
		CTX.fillStyle = "black";
		CTX.fillText(title + ': ' + number, 10, CAN.height - 10);
	}

	function drawLine(moveToX, moveToY, lineToX, lineToY) {
		CTX.beginPath();
		CTX.moveTo(moveToX, moveToY);
		CTX.lineTo(lineToX, lineToY);
		CTX.stroke();
	}
	return {
		initialize_canvas: initialize_canvas,
		background: ATTR_DEFAULT.fillStyle,
		setStrokeColor: setStrokeColor,
		setLineWidth: setLineWidth,
		draw: draw,
		welt: welt,
		download_img: download_img,
		drawBalken: drawBalken,
		drawRing: drawRing,
		getData: getData,
		drawLine: drawLine,
		printStat: printStat

	};
}(window)); // ende von welt

// === ende von app4 ===
