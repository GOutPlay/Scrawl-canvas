var mycode = function() {
	'use strict';
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');

	//import images for patterns
	scrawl.getImagesByClass('demo040');

	//define patterns
	scrawl.newPattern({ //uses preloaded images
		name: 'leaves',
		image: 'leaves',
	}).clone({
		name: 'water',
		image: 'water',
	});
	scrawl.newPattern({ //loads images dynamically before using them
		name: 'marble',
		source: 'img/marble.png',
	}).clone({
		name: 'parque',
		source: 'img/parque.png',
	});

	//define sprites
	scrawl.newBlock({
		name: 'b1',
		startX: 35,
		startY: 10,
		width: 300,
		height: 150,
		fillStyle: 'leaves',
		strokeStyle: 'marble',
		lineWidth: 12,
		lineJoin: 'round',
		shadowOffsetX: 8,
		shadowOffsetY: 8,
		shadowBlur: 5,
		shadowColor: 'Black',
		method: 'sinkInto',
	}).clone({
		name: 'b2',
		fillStyle: 'marble',
		strokeStyle: 'water',
		startX: 375,
	}).clone({
		name: 'b3',
		fillStyle: 'water',
		strokeStyle: 'parque',
		startY: 200,
	}).clone({
		name: 'b4',
		fillStyle: 'parque',
		strokeStyle: 'leaves',
		startX: 35,
	});

	//animation object
	// - necessary because dynamic loading of images takes time
	scrawl.newAnimation({
		fn: function() {
			scrawl.render();

			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			testMessage.innerHTML = 'Milliseconds per screen refresh: ' + Math.ceil(testTime) + '; fps: ' + Math.floor(1000 / testTime);
		},
	});
};

scrawl.loadModules({
	path: '../source/',
	minified: false,
	modules: ['block', 'images', 'animation'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});