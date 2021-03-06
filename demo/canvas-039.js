// # Demo Canvas 039 
// Detecting mouse/pointer cursor movements across a non-base Cell

// [Run code](../../demo/canvas-039.html)
import scrawl from '../source/scrawl.js';

// #### Scene setup
const canvas = scrawl.library.canvas.mycanvas;


// Create a second cell for the canvas
// + This cell will act as a moveable layer (start, handle, offset, roll, flipUpend, flipReverse)
// + We will also add entitys to the new Cell, and create a drag zone on it so those entitys can be dragged and dropped across the Cell.
const mycell = canvas.buildCell({

    name: 'test-cell',

    width: 600,
    height: 400,

    startX: 300,
    startY: 200,

    handleX: 300,
    handleY: 200,

    offsetX: 0,
    offsetY: 0,

    roll: 0,
    scale: 1,

    flipUpend: false,
    flipReverse: false,

    backgroundColor: 'lightblue',
});


// Create the drag group
scrawl.makeGroup({

    name: 'drag-group',
    host: 'test-cell'
})

// Create draggable entitys
scrawl.makeWheel({

    name: 'wheel-1',
    group: 'drag-group',

    radius: 40,

    start: [250, 150],
    handle: ['center', 'center'],

    fillStyle: 'red',

}).clone({

    name: 'wheel-2',
    start: [250, 250],
    fillStyle: 'blue',

}).clone({

    name: 'wheel-3',
    start: [350, 250],
    fillStyle: 'green',

}).clone({

    name: 'wheel-4',
    start: [350, 150],
    fillStyle: 'yellow',
});

scrawl.makeBlock({

    name: 'block-1',
    group: 'test-cell',

    start: ['5%', '5%'],
    dimensions: ['90%', '90%'],

    lineWidth: 5,
    method: 'draw',
})

scrawl.makeWheel({

    name: 'mouse-wheel',
    group: 'test-cell',

    radius: 6,
    handle: ['center', 'center'],

    lockTo: 'mouse',
});


// #### Scene animation
// Function to display frames-per-second data, and other information relevant to the demo
let report = function () {

    let testTicker = Date.now(),
        testTime, testNow,
        testMessage = document.querySelector('#reportmessage');

    return function () {

        mycell.updateHere();

        testNow = Date.now();
        testTime = testNow - testTicker;
        testTicker = testNow;

        testMessage.textContent = `Screen refresh: ${Math.ceil(testTime)}ms; fps: ${Math.floor(1000 / testTime)}`;
    };
}();


// Create the Display cycle animation
const demoAnimation = scrawl.makeRender({

    name: "demo-animation",
    target: canvas,
    afterShow: report,
});


// #### User interaction
// Create the drag-and-drop zone
scrawl.makeDragZone({

    zone: canvas,
    collisionGroup: 'drag-group',
    coordinateSource: mycell,
    endOn: ['up', 'leave'],
});


// Setup form observer functionality
scrawl.observeAndUpdate({

    event: ['input', 'change'],
    origin: '.controlItem',

    target: mycell,

    useNativeListener: true,
    preventDefault: true,

    updates: {

        width: ['width', 'round'],
        height: ['height', 'round'],

        start_x: ['startX', 'round'],
        start_y: ['startY', 'round'],

        handle_x: ['handleX', 'round'],
        handle_y: ['handleY', 'round'],

        offset_x: ['offsetX', 'round'],
        offset_y: ['offsetY', 'round'],

        roll: ['roll', 'float'],
        scale: ['scale', 'float'],

        upend: ['flipUpend', 'boolean'],
        reverse: ['flipReverse', 'boolean'],
    },
});

// Setup form
document.querySelector('#start_x').value = 300;
document.querySelector('#start_y').value = 200;
document.querySelector('#handle_x').value = 300;
document.querySelector('#handle_y').value = 200;
document.querySelector('#offset_x').value = 0;
document.querySelector('#offset_y').value = 0;
document.querySelector('#roll').value = 0;
document.querySelector('#scale').value = 1;
document.querySelector('#upend').options.selectedIndex = 0;
document.querySelector('#reverse').options.selectedIndex = 0;
document.querySelector('#width').value = 600;
document.querySelector('#height').value = 400;


// #### Development and testing
console.log(scrawl.library);
