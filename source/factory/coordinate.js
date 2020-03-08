/*
# Coordinate factory

TODO - documentation

#### To instantiate objects from the factory

#### Library storage

#### Clone functionality

#### Kill functionality
*/
import { constructors } from '../core/library.js';
import { xt, isa_obj, isa_number } from '../core/utilities.js';

/*
## Coordinate constructor
*/
const Coordinate = function (items) {

	let coords = [0, 0];

	Object.setPrototypeOf(coords, Coordinate.prototype);

	if (items) coords.set(items);

	return coords;
};

/*
## Coordinate object prototype setup
*/
let P = Coordinate.prototype = Object.create(Array.prototype);

P.constructor = Coordinate;
P.type = 'Coordinate';

/*
## Define prototype functions
*/


/*
TODO - documentation
*/
P.zero = function () {

	this[0] = 0;
	this[1] = 0;

	return this;
};

/*
TODO - documentation
*/
P.set = function (items, y) {

	if (items.type === 'Coordinate') this.setFromArray(items);
	else if (items.type === 'Vector') this.setFromVector(items);
	else if (items.type === 'Quaternion') this.setFromVector(items.v);
	else if (Array.isArray(items)) this.setFromArray(items);
	else if (xt(y)) this.setFromArray([items, y]);

	return this;
};

P.setFromArray = function (item) {

	this[0] = item[0];
	this[1] = item[1];

	return this;
};

P.setFromVector = function (item) {

	let {x, y} = item;

	this[0] = x;
	this[1] = y;

	return this;
};

/*
TODO - documentation
*/
P.vectorAdd = function (item) {

	let {x, y} = item;

	this[0] += x;
	this[1] += y;

	return this;
};

P.vectorSubtract = function (item) {

	let {x, y} = item;

	this[0] -= x;
	this[1] -= y;

	return this;
};

/*
TODO - documentation
*/
P.add = function (item) {

	let [x, y] = item;

	this[0] += x;
	this[1] += y;

	return this;
};

P.subtract = function (item) {

	let [x, y] = item;

	this[0] -= x;
	this[1] -= y;

	return this;
};

P.multiply = function (item) {

	let [x, y] = item;

	this[0] *= x;
	this[1] *= y;

	return this;
};

P.divide = function (item) {

	let [x, y] = item;

	if (x && y) {

		this[0] /= x;
		this[1] /= y;
	}


	return this;
};

/*
TODO - documentation
*/
P.scalarMultiply = function (item) {

	this[0] *= item;
	this[1] *= item;

	return this;
};

P.scalarDivide = function (item) {

	if (!isa_number(item)) throw new Error(`Coordinate error - scalarDivide() argument not a number: ${item}`);
	if (!item) throw new Error(`Coordinate error - scalarDivide() divide by zero`);

	this[0] /= item;
	this[1] /= item;

	return this;
};

/*
TODO - documentation
*/
P.getMagnitude = function () {

	let x = this[0],
		y = this[1];

	return Math.sqrt((x * x) + (y * y));
};

/*
TODO - documentation
*/
P.rotate = function (angle) {

	if (!isa_number(item)) throw new Error(`Coordinate error - rotate() argument not a number: ${angle}`);

	let stat_vr = [0, 0];

	let x = this[0],
		y = this[1];

	stat_vr[0] = Math.atan2(y, x);
	stat_vr[0] += (angle * 0.01745329251);
	stat_vr[1] = Math.sqrt((x * x) + (y * y));

	this[0] = stat_vr[1] * Math.cos(stat_vr[0]);
	this[1] = stat_vr[1] * Math.sin(stat_vr[0]);

	return this;
};

/*
TODO - documentation
*/
P.reverse = function () {

	this[0] = -this[0];
	this[1] = -this[1];

	return this;
};

/*
TODO - documentation
*/
P.getDotProduct = function (coord) {

	return (this[0] * coord[0]) + (this[1] * coord[1]);
};

/*
TODO - documentation
*/
P.normalize = function() {
	
	let val = this.getMagnitude();
	
	if (val > 0) {
		this[0] /= val;
		this[1] /= val;
	}
	return this;
};



/*
## Coordinate pool - an attempt to reuse coordinates rather than constantly creating and deleting them

TODO: check - are we actually using this functionality?
*/
const coordinatePool = [];
let coordinatePoolCount = 0;

const coordinatePoolLength = function () {

	return `${coordinatePool.length} (from ${coordinatePoolCount} generated)`;
}

const requestCoordinate = function (items, y) {

	if (!coordinatePool.length) {
		coordinatePool.push(new Coordinate());
		coordinatePoolCount++;
	}

	let coordinate = coordinatePool.shift();

	if (y) coordinate.set(items, y);
	else if (Array.isArray(items)) coordinate.setFromArray(items);
	else if(items) coordinate.set(items);
	else coordinate.zero();

	return coordinate
};

const releaseCoordinate = function (coordinate) {

	if (coordinate && coordinate.type === 'Coordinate') coordinatePool.push(coordinate.zero());
};

const checkCoordinate = function (item) {

	if (item && item.type === 'Coordinate') return item;
	else return new Coordinate(item);
};

/*
## Exported factory function
*/
const makeCoordinate = function (items) {

	return new Coordinate(items);
};

/*
Also store constructor in library - clone functionality expects to find it there
*/
constructors.Coordinate = Coordinate;


/*
TODO - documentation
*/
export {
	makeCoordinate,
	requestCoordinate,
	releaseCoordinate,
	checkCoordinate,
	coordinatePoolLength,
};
