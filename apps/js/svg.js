var svg = (function (win) {
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
		return data;
	}

	function download_svg(link, canvasId, filename) {
		var svgHead = '<?xml version="1.0" encoding="utf-8" standalone="no" ?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">';
		var svgPart = doc.getElementById(canvasId).innerHTML;
		var blob = new Blob([svgHead + svgPart], {
			type: 'image/svg+xml'
		});
		link.href = window.URL.createObjectURL(blob)

		link.download = filename;
	}


	function draw() {
		var coordinates = '',
			m, x, y, rect = CAN.getBoundingClientRect();
		// e = win.event;

		CAN.onmousedown = function (e) {

			x = parseInt(e.clientX - rect.left, 10);
			y = parseInt(e.clientY - rect.top, 10);
			coordinates += ' ' + x + ',' + y;
			var radius = CTX.lineWidth / 2;
			//draw a dot to realize a single click dot
			CTX.beginPath();
			CTX.arc(x, y, radius, 0, 2 * Math.PI, true);
			CTX.fillStyle = CTX.strokeStyle;
			CTX.fill();
			//save dot and begin new path drew start line drawing
			//CTX.save();
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
			coordinates += ' ' + x + ',' + y;
		}

		CAN.onmouseup = function (e) {
			x = null;
			y = null;
			//save the current state and start a new path
			CTX.save();

			if ((coordinates.match(/,/g) || []).length == 1) {
				newRandomElement(coordinates);
			} else {
				newPath(coordinates);
			}
			coordinates = '';
			//CTX.beginPath();
		}

	}

	var ATTR_SVG_DEFAULT = { // default-Device-Context
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
			}
		}
	}

	function newRandomElement(coord) {
		var g = doc.createElementNS(xmlns, 'g');
		g.setAttribute('transform', 'translate(' + coord + ')');
		var availableShapes = [heart(), circle(), rect()];
		var newChild = availableShapes[Math.round(Math.random() * (availableShapes.length - 1))];
		g.appendChild(newChild);
		svg.appendChild(g);

	}

	function rect() {
		var rect = doc.createElementNS(xmlns, 'rect');
		rect.setAttribute('x', -10);
		rect.setAttribute('y', -10);
		rect.setAttribute('width', 20);
		rect.setAttribute('height', 20);
		rect.setAttribute('fill', CTX.strokeStyle);


		return rect;
	}

	function circle() {
		var circle = doc.createElementNS(xmlns, 'circle');
		circle.setAttribute('x', -5);
		circle.setAttribute('y', -5);
		circle.setAttribute('r', 10);
		circle.setAttribute('fill', CTX.strokeStyle);
		return circle;
	}

	function heart() {
		var heart = doc.createElementNS(xmlns, 'path');
		heart.setAttribute('x', -13);
		heart.setAttribute('y', -13)
		heart.setAttribute('fill', CTX.strokeStyle);
		heart.setAttribute('d', 'm16,28.261c0,0-14-7.926-14-17.046c0-9.356,13.159-10.399,14-0.454 c1.011-9.938,14-8.903,14,0.454C30,20.335,16,28.261,16,28.261z');
		// this.appendChild(heart);
		return heart;

	}

	function newPath(coord) {
		var path = doc.createElementNS(xmlns, 'polyline');
		path.setAttribute('points', coord);
		path.setAttribute('stroke', CTX.strokeStyle);
		path.setAttribute('stroke-width', CTX.lineWidth / 2);
		path.setAttribute('fill', 'none');

		svg.appendChild(path);

	}
	// global SVG Variablen
	var xmlns = "http://www.w3.org/2000/svg",
		svg = doc.createElementNS(xmlns, "svg");
	var init = true;

	function initialize_svg(height) {
		var offset = doc.getElementById('headline').offsetHeight,
			w, h, svgHeightFactor, svgWidth, svgHeight;
		if (height == 'full') {
			svgHeightFactor = 1;
		} else if (height == 'half') {
			svgHeightFactor = 0.5;
		}

		svgWidth = window.innerWidth * 0.7;
		svgHeight = (window.innerHeight - offset) * svgHeightFactor;

		CAN = doc.getElementById('drawing_canvas');
		CTX = CAN.getContext('2d');

		ATTR = ATTR_SVG_DEFAULT;
		set_ctx_attr(ATTR, CTX);



		svg.setAttribute('style', 'background:' + CTX.fillStyle);
		svg.setAttribute('width', svgWidth);
		svg.setAttribute('height', svgHeight);
		svg.setAttribute('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight);
		svg.setAttribute('id', 'svgImage');
		svg.setAttribute('version', '1.0');
		svg.setAttribute('xmlns', xmlns);
		svg.setAttribute('xml:space', 'preserve');
		svg.setAttribute('x', 0);
		svg.setAttribute('y', 0);
		svg.setAttribute('enable-background', 'new 0 0 ' + svgWidth + ' ' + svgHeight);

		svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

		var text = doc.createElementNS(xmlns, 'text');
		text.setAttribute('font-size', 45);
		text.setAttribute('font-family', 'Arial');
		text.setAttribute('x', 0);
		text.setAttribute('y', 0);
		text.setAttribute('transform', 'rotate(90)');
		text.setAttribute('opacity', 0.3);
		text.innerHTML = 'SVG-Fläche';


		var svgContainer = doc.getElementById('svgContainer');

		if (!init) {
			while (svgContainer.hasChildNodes()) {
				svgContainer.removeChild(svgContainer.lastChild);
			}
			while (svg.hasChildNodes()) {
				svg.removeChild(svg.lastChild);
			}
			// svgContainer.removeChild(doc.getElementById('svgImage'));
			svgContainer.appendChild(svg);
		} else {
			svgContainer.appendChild(svg);
			init = false;
		}
		svg.appendChild(text);

	}


	return {
		initialize_svg: initialize_svg,
		background: ATTR_SVG_DEFAULT.fillStyle,
		setStrokeColor: setStrokeColor,
		setLineWidth: setLineWidth,
		draw: draw,
		svg: svg,
		download_svg: download_svg,
		getData: getData

	};
}(window));
