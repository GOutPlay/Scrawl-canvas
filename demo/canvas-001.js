// # Demo Canvas 001 
// Block and Wheel entitys (make, clone, method); drag and drop block and wheel entitys

// [Run code](../../demo/canvas-001.html)
import scrawl from '../min/scrawl.js'


// #### Scene setup
let canvas = scrawl.library.artefact.mycanvas;

canvas.setBase({
    backgroundColor: 'aliceblue'
});


// Create and clone block entitys
scrawl.makeBlock({
    name: 'myblock-fill',
    width: 100,
    height: 100,
    startX: 25,
    startY: 25,

    fillStyle: 'green',
    strokeStyle: 'gold',

    lineWidth: 6,
    lineJoin: 'round',
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    shadowBlur: 2,
    shadowColor: 'black',

}).clone({
    name: 'myblock-draw',
    startX: 175,
    method: 'draw',
    sharedState: true

}).clone({
    name: 'myblock-drawAndFill',
    startX: 325,
    method: 'drawAndFill',

}).clone({
    name: 'myblock-fillAndDraw',
    startX: 475,
    method: 'fillAndDraw',
    sharedState: true

}).clone({
    name: 'myblock-drawThenFill',
    startY: 175,
    method: 'drawThenFill'

}).clone({
    name: 'myblock-fillThenDraw',
    startX: 325,
    method: 'fillThenDraw',
    sharedState: true

}).clone({
    name: 'myblock-clear',
    startX: 175,
    method: 'clear'
});


// Create and clone Wheel entitys
scrawl.makeWheel({
    name: 'mywheel-fill',
    radius: 50,
    startAngle: 15,
    endAngle: -15,
    includeCenter: true,

    startX: 475,
    startY: 475,

    fillStyle: 'purple',
    strokeStyle: 'gold',

    lineWidth: 6,
    lineJoin: 'round',
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    shadowBlur: 2,
    shadowColor: 'black',

    purge: 'all',

}).clone({
    name: 'mywheel-draw',
    startX: 325,
    method: 'draw',
    sharedState: true

}).clone({
    name: 'mywheel-drawAndFill',
    startX: 175,
    method: 'drawAndFill',

}).clone({
    name: 'mywheel-fillAndDraw',
    startX: 25,
    method: 'fillAndDraw',
    sharedState: true

}).clone({
    name: 'mywheel-drawThenFill',
    startY: 325,
    method: 'drawThenFill'

}).clone({
    name: 'mywheel-fillThenDraw',
    startX: 175,
    method: 'fillThenDraw',
    sharedState: true

}).clone({
    name: 'mywheel-clear',
    startX: 325,
    method: 'clear'
});


// Change the fill and stroke styles on one of the blocks, and one of the wheels, and any entitys sharing their respective states
scrawl.library.artefact['myblock-fillAndDraw'].set({
    fillStyle: 'blue',
    strokeStyle: 'coral'
});

// Entitys can be found in both the 'artefact' and 'entity' sections of the library
scrawl.library.entity['mywheel-fillAndDraw'].set({
    fillStyle: 'blue',
    strokeStyle: 'coral'
});


// #### User interaction
// Create the drag-and-drop zone
let current = scrawl.makeDragZone({

    zone: canvas,
    endOn: ['up', 'leave'],
    exposeCurrentArtefact: true,
});


// #### Scene animation
// Function to display frames-per-second data, and other information relevant to the demo
let report = function () {

    let testTicker = Date.now(),
        testTime, testNow, dragging,
        testMessage = document.querySelector('#reportmessage');

    return function () {

        dragging = current();

        testNow = Date.now();
        testTime = testNow - testTicker;
        testTicker = testNow;

        testMessage.textContent = `Screen refresh: ${Math.ceil(testTime)}ms; fps: ${Math.floor(1000 / testTime)}
Currently dragging: ${(dragging) ? dragging.artefact.name : 'nothing'}`;
    };
}();


// Create the Display cycle animation
scrawl.makeRender({

    name: 'demo-animation',
    target: canvas,
    afterShow: report,
});


// #### Development and testing
console.log(scrawl.library);

// To test kill functionality
let killArtefact = (name, time) => {

    let groupname = 'mycanvas_base',
        packet;

    let checkGroupBucket = (name, groupname) => {

        let res = scrawl.library.group[groupname].artefactBuckets.filter(e => e.name === name );
        return (res.length) ? 'no' : 'yes';
    };

    setTimeout(() => {

        console.log(`${name} alive
    removed from artefact: ${(scrawl.library.artefact[name]) ? 'no' : 'yes'}
    removed from artefactnames: ${(scrawl.library.artefactnames.indexOf(name) >= 0) ? 'no' : 'yes'}
    removed from entity: ${(scrawl.library.entity[name]) ? 'no' : 'yes'}
    removed from entitynames: ${(scrawl.library.entitynames.indexOf(name) >= 0) ? 'no' : 'yes'}
    removed from group.artefacts: ${(scrawl.library.group[groupname].artefacts.indexOf(name) >= 0) ? 'no' : 'yes'}
    removed from group.artefactBuckets: ${checkGroupBucket(name, groupname)}`);

        packet = scrawl.library.artefact[name].saveAsPacket();

        scrawl.library.artefact[name].kill();

        setTimeout(() => {

            console.log(`${name} killed
    removed from artefact: ${(scrawl.library.artefact[name]) ? 'no' : 'yes'}
    removed from artefactnames: ${(scrawl.library.artefactnames.indexOf(name) >= 0) ? 'no' : 'yes'}
    removed from entity: ${(scrawl.library.entity[name]) ? 'no' : 'yes'}
    removed from entitynames: ${(scrawl.library.entitynames.indexOf(name) >= 0) ? 'no' : 'yes'}
    removed from group.artefacts: ${(scrawl.library.group[groupname].artefacts.indexOf(name) >= 0) ? 'no' : 'yes'}
    removed from group.artefactBuckets: ${checkGroupBucket(name, groupname)}`);

            canvas.actionPacket(packet);

            setTimeout(() => {

                console.log(`${name} resurrected
    removed from artefact: ${(scrawl.library.artefact[name]) ? 'no' : 'yes'}
    removed from artefactnames: ${(scrawl.library.artefactnames.indexOf(name) >= 0) ? 'no' : 'yes'}
    removed from entity: ${(scrawl.library.entity[name]) ? 'no' : 'yes'}
    removed from entitynames: ${(scrawl.library.entitynames.indexOf(name) >= 0) ? 'no' : 'yes'}
    removed from group.artefacts: ${(scrawl.library.group[groupname].artefacts.indexOf(name) >= 0) ? 'no' : 'yes'}
    removed from group.artefactBuckets: ${checkGroupBucket(name, groupname)}`);
            }, 100);
        }, 100);
    }, time);
};

killArtefact('myblock-fill', 4000);
killArtefact('mywheel-fillAndDraw', 6000);
