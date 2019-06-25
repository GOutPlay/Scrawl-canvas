/*
# Picture factory
*/
import { constructors, asset } from '../core/library.js';
import { mergeOver, xt, xta, addStrings } from '../core/utilities.js';

import { gettableVideoAssetAtributes, settableVideoAssetAtributes } from './videoAsset.js';
import { gettableImageAssetAtributes, settableImageAssetAtributes } from './imageAsset.js';

import { makeCoordinate } from './coordinate.js';

import baseMix from '../mixin/base.js';
import positionMix from '../mixin/position.js';
import entityMix from '../mixin/entity.js';
import assetConsumerMix from '../mixin/assetConsumer.js';
import filterMix from '../mixin/filter.js';

/*
## Picture constructor
*/
const Picture = function (items = {}) {

	this.copyStart = makeCoordinate();
	this.currentCopyStart = makeCoordinate();

	this.copyDimensions = makeCoordinate();
	this.currentCopyDimensions = makeCoordinate();

	this.copyArray = [];
	this.pasteArray = [];

	this.entityInit(items);

	if (!items.copyStart) {

		if (!items.copyStartX) this.copyStart[0] = 0;
		if (!items.copyStartY) this.copyStart[1] = 0;
	}

	if (!items.copyDimensions) {

		if (!items.copyWidth) this.copyDimensions[0] = 1;
		if (!items.copyHeight) this.copyDimensions[1] = 1;
	}

	this.dirtyCopyStart = true;
	this.dirtyCopyDimensions = true;
	this.dirtyImage = true;

	return this;
};

/*
## Picture object prototype setup
*/
let P = Picture.prototype = Object.create(Object.prototype);
P.type = 'Picture';
P.lib = 'entity';
P.isArtefact = true;
P.isAsset = false;

/*
Apply mixins to prototype object
*/
P = baseMix(P);
P = positionMix(P);
P = entityMix(P);
P = assetConsumerMix(P);
P = filterMix(P);

/*
## Define default attributes
*/
let defaultAttributes = {

/*

*/
	copyStart: null,
	copyDimensions: null,
};
P.defs = mergeOver(P.defs, defaultAttributes);

let G = P.getters,
	S = P.setters,
	D = P.deltaSetters;

/*

*/
G.copyStartX = function () {

	return this.currentCopyStart[0];
};

G.copyStartY = function () {

	return this.currentCopyStart[1];
};

S.copyStartX = function (coord) {

	if (coord != null) {

		this.copyStart[0] = coord;
		this.dirtyCopyStart = true;
	}
};

S.copyStartY = function (coord) {

	if (coord != null) {

		this.copyStart[1] = coord;
		this.dirtyCopyStart = true;
	}
};

S.copyStart = function (x, y) {

	this.setCoordinateHelper('copyStart', x, y);
	this.dirtyCopyStart = true;
};

D.copyStartX = function (coord) {

	let c = this.copyStart;
	c[0] = addStrings(c[0], coord);
	this.dirtyCopyStart = true;
};

D.copyStartY = function (coord) {

	let c = this.copyStart;
	c[1] = addStrings(c[1], coord);
	this.dirtyCopyStart = true;
};

D.copyStart = function (x, y) {

	this.setDeltaCoordinateHelper('copyStart', x, y);
	this.dirtyCopyStart = true;
};

/*

*/
G.copyWidth = function () {

	return this.currentCopyDimensions[0];
};

G.copyHeight = function () {

	return this.currentCopyDimensions[1];
};

S.copyWidth = function (val) {

	if (val != null) {

		this.copyDimensions[0] = val;
		this.dirtyCopyDimensions = true;
	}
};

S.copyHeight = function (val) {

	if (val != null) {

		this.copyDimensions[1] = val;
		this.dirtyCopyDimensions = true;
	}
};

S.copyDimensions = function (w, h) {

	this.setCoordinateHelper('copyDimensions', w, h);
	this.dirtyCopyDimensions = true;
};

D.copyWidth = function (val) {

	let c = this.copyDimensions;
	c[0] = addStrings(c[0], val);
	this.dirtyCopyDimensions = true;
};

D.copyHeight = function (val) {

	let c = this.copyDimensions;
	c[1] = addStrings(c[1], val);
	this.dirtyCopyDimensions = true;
};

D.copyDimensions = function (w, h) {

	this.setDeltaCoordinateHelper('copyDimensions', w, h);
	this.dirtyCopyDimensions = true;
};


/*
## Define prototype functions
*/


/*
Overwrites function defined in mixin/entity.js - takes into account image/videoAsset source attributes
*/
P.get = function (item) {

	let source = this.source;

	if ((item.indexOf('video_') === 0 || item.indexOf('image_') === 0) && source) {

		if (gettableVideoAssetAtributes.indexOf(item) >= 0) return source[item.substring(6)];
		else if (gettableImageAssetAtributes.indexOf(item) >= 0) return source[item.substring(6)];
	}

	else {

		let getter = this.getters[item];

		if (getter) return getter.call(this);

		else {

			let def = this.defs[item],
				state = this.state,
				val;

			if (typeof def != 'undefined') {

				val = this[item];
				return (typeof val != 'undefined') ? val : def;
			}

			def = state.defs[item];

			if (typeof def != 'undefined') {

				val = state[item];
				return (typeof val != 'undefined') ? val : def;
			}
			return undef;
		}
	}
};

/*
Overwrites function defined in mixin/entity.js - takes into account State object attributes
*/
P.set = function (items = {}) {

	if (items) {

		let setters = this.setters,
			defs = this.defs,
			state = this.state,
			source = this.source,
			stateSetters = (state) ? state.setters : {},
			stateDefs = (state) ? state.defs : {};

		Object.entries(items).forEach(([key, value]) => {

			if ((key.indexOf('video_') === 0 || key.indexOf('image_') === 0) && source) {

				if (settableVideoAssetAtributes.indexOf(key) >= 0) source[key.substring(6)] = value
				else if (settableImageAssetAtributes.indexOf(key) >= 0) source[key.substring(6)] = value
			}

			else if (key && key !== 'name' && value != null) {

				let predefined = setters[key],
					stateFlag = false;

				if (!predefined) {

					predefined = stateSetters[key];
					stateFlag = true;
				}

				if (predefined) predefined.call(stateFlag ? this.state : this, value);
				else if (typeof defs[key] !== 'undefined') this[key] = value;
				else if (typeof stateDefs[key] !== 'undefined') state[key] = value;
			}
		}, this);
	}
	return this;
};

/*

*/
P.cleanImage = function () {

	let natWidth = this.sourceNaturalWidth,
		natHeight = this.sourceNaturalHeight;

	if (xta(natWidth, natHeight)) {

		this.dirtyImage = false;

		let start = this.currentCopyStart,
			x = start[0],
			y = start[1];

		let dims = this.currentCopyDimensions,
			w = dims[0],
			h = dims[1];

		if (x + w > natWidth) start[0] = natWidth - w;
		if (y + h > natHeight) start[1] = natHeight - h;

		let copyArray = this.copyArray;

		copyArray.length = 0;
		copyArray.push(start[0], start[1], w, h);
	}
};

/*

*/
P.cleanCopyStart = function () {

	let width = this.sourceNaturalWidth,
		height = this.sourceNaturalHeight;

	if (xta(width, height)) {

		this.dirtyCopyStart = false;

		this.cleanPosition(this.currentCopyStart, this.copyStart, [width, height]);

		let current = this.currentCopyStart,
			x = current[0],
			y = current[1];

		if (x < 0 || x > width) {

			if (x < 0) current[0] = 0;
			else current[0] = width - 1;
		}

		if (y < 0 || y > height) {

			if (y < 0) current[1] = 0;
			else current[1] = height - 1;
		}
		this.dirtyImage = true;
	}
};

/*

*/
P.cleanCopyDimensions = function () {

	let natWidth = this.sourceNaturalWidth,
		natHeight = this.sourceNaturalHeight;

	if (xta(natWidth, natHeight)) {

		this.dirtyCopyDimensions = false;

		let dims = this.copyDimensions,
			currentDims = this.currentCopyDimensions,
			width = dims[0], 
			height = dims[1];

		if (width.substring) currentDims[0] = (parseFloat(width) / 100) * natWidth;
		else currentDims[0] = width;

		if (height.substring) currentDims[1] = (parseFloat(height) / 100) * natHeight;
		else currentDims[1] = height;

		let currentWidth = currentDims[0],
			currentHeight = currentDims[1];

		if (currentWidth <= 0 || currentWidth > natWidth) {

			if (currentWidth <= 0) currentDims[0] = 1;
			else currentDims[0] = natWidth;
		}

		if (currentHeight <= 0 || currentHeight > natHeight) {

			if (currentHeight <= 0) currentDims[1] = 1;
			else currentDims[1] = natHeight;
		}
		this.dirtyImage = true;
	}
};

/*
Overrides mixin/entity.js
*/
P.prepareStamp = function() {

	if (this.asset && this.asset.checkSource) this.asset.checkSource(this.sourceNaturalWidth, this.sourceNaturalHeight);

	if (this.dirtyDimensions || this.dirtyHandle || this.dirtyScale) this.dirtyPaste = true;

	if (this.dirtyScale || this.dirtyDimensions || this.dirtyStart || this.dirtyOffset || this.dirtyHandle) this.dirtyPathObject = true;

	if (this.dirtyRotation) this.dirtyCollision = true;

	if (this.dirtyScale) this.cleanScale();
	if (this.dirtyDimensions) this.cleanDimensions();
	if (this.dirtyLock) this.cleanLock();
	if (this.dirtyStart) this.cleanStart();
	if (this.dirtyOffset) this.cleanOffset();
	if (this.dirtyHandle) this.cleanHandle();
	if (this.dirtyRotation) this.cleanRotation();

	if (this.isBeingDragged || this.lockTo.indexOf('mouse') >= 0) {

		this.dirtyStampPositions = true;
		this.dirtyStampHandlePositions = true;
	}

	if (this.dirtyStampPositions) this.cleanStampPositions();
	if (this.dirtyStampHandlePositions) this.cleanStampHandlePositions();

	if (this.dirtyCopyStart) this.cleanCopyStart();
	if (this.dirtyCopyDimensions) this.cleanCopyDimensions();
	if (this.dirtyImage) this.cleanImage();
	if (this.dirtyPaste) this.preparePasteObject();

	if (this.dirtyPathObject) {

		this.cleanPathObject();
		this.dirtyCollision = true;
	}

	// update artefacts subscribed to this artefact (using it as their pivot or mimic source), if required
	if (this.dirtyPositionSubscribers) this.updatePositionSubscribers();
};

/*

*/
P.preparePasteObject = function () {

	this.dirtyPaste = false;

	let handle = this.currentStampHandlePosition,
		dims = this.currentDimensions,
		scale = this.currentScale;

	let x = -handle[0] * scale,
		y = -handle[1] * scale,
		w = dims[0] * scale,
		h = dims[1] * scale;

	let pasteArray = this.pasteArray;

	pasteArray.length = 0;
	pasteArray.push(x, y, w, h);

	this.dirtyPathObject = true;
};

/*

*/
P.cleanPathObject = function () {

	this.dirtyPathObject = false;

	if (!this.noPathUpdates || !this.pathObject) {

		if (!this.pasteArray) this.preparePasteObject();

		let p = this.pathObject = new Path2D();

		p.rect(...this.pasteArray);
	}
};

/*

*/
P.draw = function (engine) {

	engine.stroke(this.pathObject);
};

P.fill = function (engine) {

	engine.drawImage(this.source, ...this.copyArray, ...this.pasteArray);
};

P.drawAndFill = function (engine) {

	engine.stroke(this.pathObject);
	this.currentHost.clearShadow();
	engine.drawImage(this.source, ...this.copyArray, ...this.pasteArray);
};

P.fillAndDraw = function (engine) {

	engine.stroke(this.pathObject);
	this.currentHost.clearShadow();
	engine.drawImage(this.source, ...this.copyArray, ...this.pasteArray);
	engine.stroke(this.pathObject);
};

P.drawThenFill = function (engine) {

	engine.stroke(this.pathObject);
	engine.drawImage(this.source, ...this.copyArray, ...this.pasteArray);
};

P.fillThenDraw = function (engine) {

	engine.drawImage(this.source, ...this.copyArray, ...this.pasteArray);
	engine.stroke(this.pathObject);
};


/*
video actions
*/
P.videoAction = function (action, ...args) {

	let myAsset = this.asset;

	if (myAsset && myAsset.type === 'Video') return myAsset[action](...args);
};

P.videoPromiseAction = function (action, ...args) {

	let myAsset = this.asset;

	if (myAsset && myAsset.type === 'Video') return myAsset[action](...args);
	else return Promise.reject('Asset not a video');
};

P.videoAddTextTrack = function (kind, label, language) {
	return this.videoAction('addTextTrack', kind, label, language);
};

P.videoCaptureStream = function () {
	return this.videoAction('captureStream');
};

P.videoCanPlayType = function (mytype) {
	return this.videoAction('canPlayType', mytype);
};

P.videoFastSeek = function (time) {
	return this.videoAction('fastSeek', time);
};

P.videoLoad = function () {
	return this.videoAction('load');
};

P.videoPause = function () {
	return this.videoAction('pause');
};

P.videoPlay = function () {
	return this.videoPromiseAction('play');
};

P.videoSetMediaKeys = function (keys) {
	return this.videoPromiseAction('setMediaKeys', keys);
};

P.videoSetSinkId = function () {
	return this.videoPromiseAction('setSinkId');
};


/*
## Exported factory function
*/
const makePicture = function (items) {
	return new Picture(items);
};

/*
Also store constructor in library - clone functionality expects to find it there
*/
constructors.Picture = Picture;

export {
	makePicture,
};