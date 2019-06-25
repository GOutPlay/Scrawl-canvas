/*
# Core user interaction
*/
// import { artefact } from "./library.js";
import * as library from "./library.js";
import { xt, xta, isa_dom, isa_fn, defaultNonReturnFunction } from "./utilities.js";
import { addListener, addNativeListener, removeListener, removeNativeListener } from "./document.js";

import { makeAnimation } from "../factory/animation.js";

const uiSubscribedElements = [];

/*
Scrawl-canvas mouse tracking functionality can be switched off by setting the __scrawl.ui.trackMouse__ flag to false
*/
let trackMouse = false,
	mouseChanged = false;

/*
__currentCorePosition__ object holds the mouse cursor position, alongside browser view dimensions and scroll position
*/
const currentCorePosition = {
	x: 0,
	y: 0,
	scrollX: 0,
	scrollY: 0,
	w: 0,
	h: 0,
	type: 'mouse'
};

/*
__resizeAction__ function - to check if a view resize has occurred; if yes, flag that currentCorePosition object needs to be updated
*/
const resizeAction = function (e) {

	let w = document.documentElement.clientWidth,
		h = document.documentElement.clientHeight;

	if (currentCorePosition.w !== w || currentCorePosition.h !== h) {
		currentCorePosition.w = w;
		currentCorePosition.h = h;
		mouseChanged = true;
	}
};

/*
__scrollAction__ function - to check if a view scroll has occurred; if yes, flag that currentCorePosition object needs to be updated
*/
const scrollAction = function (e) {

	let x = window.pageXOffset,
		y = window.pageYOffset;

	if (currentCorePosition.scrollX !== x || currentCorePosition.scrollY !== y) {
		currentCorePosition.x += (x - currentCorePosition.scrollX);
		currentCorePosition.y += (y - currentCorePosition.scrollY);
		currentCorePosition.scrollX = x;
		currentCorePosition.scrollY = y;
		mouseChanged = true;
	}
};

/*
__moveAction__ function - to check if mouse cursor position has changed; if yes, flag that currentCorePosition object needs to be updated
*/
const moveAction = function (e) {

	let x = Math.round(e.pageX),
		y = Math.round(e.pageY);

	if (currentCorePosition.x !== x || currentCorePosition.y !== y) {
		currentCorePosition.type = (navigator.pointerEnabled) ? 'pointer' : 'mouse';
		currentCorePosition.x = x;
		currentCorePosition.y = y;
		mouseChanged = true;
	}
};

/*
Functions to update uiSubscribedElements attached to specified DOM elements. Each stack or canvas element tracked by Scrawl-canvas will include a local __here__ object which includes details of the element's current dimensions, relative position, and the position of the mouse cursor in relation to its top-left corner. These all need to be updated whenever there's a resize, scroll or cursor movement.
*/
const updateUiSubscribedElements = function () {

	uiSubscribedElements.forEach(item => updateUiSubscribedElement(item));
};

/*

*/
const updateUiSubscribedElement = function (art) {

	let dom = library.artefact[art];
	if (!xt(dom)) throw new Error(`core/userInteraction updateUiSubscribedElement() error - artefact does not exist: ${art}`);

	let el = dom.domElement;
	if (!isa_dom(el)) throw new Error(`core/userInteraction updateUiSubscribedElement() error - DOM element missing: ${art}`);

	let dims = el.getBoundingClientRect(),
		dox = Math.round(dims.left + window.pageXOffset),
		doy = Math.round(dims.top + window.pageYOffset);

	if (!dom.here) dom.here = {}; 

	let here = dom.here;

	here.x = Math.round(currentCorePosition.x - dox);
	here.y = Math.round(currentCorePosition.y - doy);
	here.w = Math.round(dims.width);
	here.h = Math.round(dims.height);
	here.normX = (here.w) ? here.x / here.w : false;
	here.normY = (here.h) ? here.y / here.h : false;
	here.offsetX = dox;
	here.offsetY = doy;
	here.type = currentCorePosition.type;
	here.active = true;

	if (here.normX < 0 || here.normX > 1 || here.normY < 0 || here.normY > 1) here.active = false;

	if (dom.type === 'Canvas') dom.updateBaseHere(here, dom.fit);
};

/*
Attach and remove core listeners attached to the __window__ object
*/
const coreListenersTracker = makeAnimation({

	name: 'coreListenersTracker',
	order: 0,
	delay: true,
	fn: function () {

		return new Promise((resolve) => {

			if (!uiSubscribedElements.length) resolve(false);

			if (trackMouse && mouseChanged) {

				mouseChanged = false;
				updateUiSubscribedElements();
			}

			resolve(true);
		});
	},
});

/*

*/
const startCoreListeners = function () {

	actionCoreListeners('removeEventListener');
	actionCoreListeners('addEventListener');

	trackMouse = true;
	mouseChanged = true;
	coreListenersTracker.run();
};

/*

*/
const stopCoreListeners = function () {

	trackMouse = false;
	mouseChanged = false;
	coreListenersTracker.halt();

	actionCoreListeners('removeEventListener');
};

/*

*/
const actionCoreListeners = function (action) {

	if (navigator.pointerEnabled || navigator.msPointerEnabled) {

		window[action]('pointermove', moveAction, false);
		window[action]('pointerup', moveAction, false);
		window[action]('pointerdown', moveAction, false);
		window[action]('pointerleave', moveAction, false);
		window[action]('pointerenter', moveAction, false);
	}
	else {

		window[action]('mousemove', moveAction, false);
		window[action]('mouseup', moveAction, false);
		window[action]('mousedown', moveAction, false);
		window[action]('mouseleave', moveAction, false);
		window[action]('mouseenter', moveAction, false);
	}

	window[action]('scroll', scrollAction, false);
	window[action]('resize', resizeAction, false);
};

/*

*/
const applyCoreResizeListener = function () {

	resizeAction();
	mouseChanged = true;
};

const applyCoreMoveListener = function () {

	moveAction();
	mouseChanged = true;
};

const applyCoreScrollListener = function () {

	scrollAction();
	mouseChanged = true;
};

/*
User interaction to test the demo

Okay, so I got very bored of writing boilerplate to react to various form elements user interactions across the demos. So I wrote some functions to setup (and take down) batches of DOM event listeners to make my life easier. These are:

- scrawl.addNativeListener()
- scrawl.removeNativeListener()

Then there was the use case for reacting to various mouse (and touch) events, so I bundled all those up into a set of complementary functions:

- scrawl.addListener()
- scrawl.removeListener()

Even so, there was still a lot of boilerplate code to write, in particular to listening for user interaction with form elements (which can be anywhere on the web page). So I further factorised that code into an __observeAndUpdate__ function which uses the listener functions internally.

I have no idea how useful the observeAndUpdate function will be to anyone else. All I know is that it works for me and my demos, and that makes me happy.

Note: observeAndUpdate() returns a function that will (in theory) remove all the bundled event listeners from their DOM elements when it is invoked. Not yet tested.
*/
const observeAndUpdate = function (items = {}) {

	if (!xta(items.event, items.origin, items.updates)) return false;

	let target = (items.target.substring && items.targetLibrarySection) ?
		library[items.targetLibrarySection][items.target] :
		items.target;

	if (!target) return false;

	let event = items.event,
		origin = items.origin;

	let listener = (items.useNativeListener) ? addNativeListener : addListener,
		killListener = (items.useNativeListener) ? removeNativeListener : removeListener;

	let stop = defaultNonReturnFunction;

	if (items.preventDefault) {

		stop = (e) => {

			e.preventDefault();
			e.returnValue = false;
		};
	}

	

	let func = function (e) {

		stop(e);

		let id = (e && e.target) ? e.target.id : false;

		if (id) {

			let updates = items.updates,
				actionArray = updates[id];

			if (actionArray) {

				let actionAttribute = actionArray[0],
					action = actionArray[1],
					targetVal = e.target.value,
					actionFlag = true,
					val;

				switch (action) {

					case 'float' :
						val = parseFloat(targetVal);
						break;

					case 'int' :
						val = parseInt(targetVal, 10);
						break;

					case 'round' :
						val = Math.round(targetVal);
						break;

					case 'roundDown' :
						val = Math.floor(targetVal);
						break;

					case 'roundUp' :
						val = Math.ceil(targetVal);
						break;

					case 'raw' :
						val = targetVal;
						break;

					case 'boolean' :
						if (xt(targetVal)) {

							if (targetVal.substring) {

								if ('true' === targetVal.toLowerCase()) val = true;
								else if ('false' === targetVal.toLowerCase()) val = false;
								else val = (parseFloat(targetVal)) ? true : false;
							}
							else val = (targetVal) ? true : false;
						}
						else val = false;
						break;

					default :
						if (action.substring) val = `${parseFloat(targetVal)}${action}`;
						else actionFlag = false;
				}

				if (actionFlag) {

					if (target.type === 'Group') {

						target.setArtefacts({
							[actionAttribute]: val
						});
					}
					else {

						target.set({
							[actionAttribute]: val
						});
					}
				}
			}
		}
	};

	let kill = function () {

		killListener(event, func, origin);
	};

	listener(event, func, origin);

	return kill;
};

/*
Convenience function for setting up drag-and-drop zones.

Required attribute of the argument object:

* __.zone__ - either the String name of the Stack or Canvas artefact which will host the zone, or the Stack or Canvas artefact itself

Optional argument object attributes:

* __.coodinateSource__ - the .here object of whatever artefact/asset (Stack, Canvas, Element or Cell) will be supplying the coordinates. Defaults to the .here object of either the Stack zone, or the .here object of the Canvas zone's base Cell.
* __.collisionGroup__ - the group containg the draggable artefacts, or that Group object's name String. Defaults to the Stack zone's Group object, or the Canvas's base Cell's Group object.
* __.startOn__ - one of 'move', 'up', 'down', 'enter', 'leave', or an array of a selection of those strings. Defaults to 'down'
* __.endOn__ - one of 'move', 'up', 'down', 'enter', 'leave', or an array of a selection of those strings. Defaults to 'up'
* __.exposeCurrentArtefact__ boolean. Defaults to false

If the exposeCurrentArtefact attribute is true, the function returns a function that can be invoked at any time to get the collision data object (containing x, y, artefact attributes) for the artefact being dragged (false if nothing is being dragged). Invoking the returned function with a single argument that evaluates to true will trigger the kill function.

If the exposeCurrentArtefact attribute is false, or omitted, the function returns a kill function that can be invoked to remove the event listeners from the Stack or Canvas zone's DOM element.
*/
const makeDragZone = function (items = {}) {

	if (!items.zone) return false;

	let target = (items.zone.substring) ? artefact[items.zone] : items.zone;

	if (!target) return false;

	let targetElement = target.domElement,
		coordinateSource, 
		collisionGroup = (items.collisionGroup && items.collisionGroup.substring) ? library.group[items.collisionGroup] : items.collisionGroup, 
		startOn = (items.startOn) ? items.startOn : ['down'],
		endOn = (items.endOn) ? items.endOn : ['up'];

	if (target.type === 'Stack') {

		coordinateSource = (items.coodinateSource) ? items.coordinateSource : target.here;
		collisionGroup = (collisionGroup) ? collisionGroup : target.group;
	}
	else if (target.type === 'Canvas') {

		coordinateSource = (items.coodinateSource) ? items.coordinateSource : target.base.here;
		collisionGroup = (collisionGroup) ? collisionGroup : library.group[target.base.name];
	}

	if (!xta(targetElement, collisionGroup)) return false;

	let current = false;

	let pickup = function (e) {

		e.preventDefault();
		e.returnValue = false;

		if (!coordinateSource && target.type === 'Canvas') coordinateSource = target.base.here;

		current = collisionGroup.getArtefactAt(coordinateSource);

		if (current) current.artefact.pickupArtefact(coordinateSource);
	};

	let drop = function (e) {

		e.preventDefault();
		e.returnValue = false;

		if (current) {

			current.artefact.dropArtefact();
			current = false;
		}
	};

	let kill = function () {

		removeListener(startOn, pickup, targetElement);
		removeListener(endOn, drop, targetElement);
	};

	let getCurrent = function (actionKill = false) {

		if (actionKill) kill();
		else return current;
	};

	addListener(startOn, pickup, targetElement);
	addListener(endOn, drop, targetElement);

	if (items.exposeCurrentArtefact) return getCurrent;
	else return kill;
};

export {
	uiSubscribedElements,
	currentCorePosition,
	startCoreListeners,
	stopCoreListeners,
	applyCoreResizeListener,
	applyCoreMoveListener,
	applyCoreScrollListener,
	observeAndUpdate,
	makeDragZone,
};