// # Demo Filters 001
// Filter parameters: Blur filter

// [Run code](../../demo/filters-001.html)
import scrawl from '../source/scrawl.js';

// #### Scene setup
const canvas = scrawl.library.canvas.mycanvas;

canvas.set({
    css: {
      display: 'inline-block',
    },
});

scrawl.importDomImage('.flowers');


// Create the filter
let blurFilter = scrawl.makeFilter({

    name: 'blur',
    method: 'blur',
    radius: 1,
    shrinkingRadius: false,
    includeAlpha: false,
    passes: 1,
});


// Create the target entity
let piccy = scrawl.makePicture({

    asset: 'iris',

    width: '100%',
    height: '100%',

    copyWidth: '100%',
    copyHeight: '100%',

    method: 'fill',

    filters: ['blur'],
});


// #### Scene animation
// Function to display frames-per-second data, and other information relevant to the demo
let report = function () {

    let testTicker = Date.now(),
        testTime, testNow,
        testMessage = document.querySelector('#reportmessage');

    return function () {

        testNow = Date.now();
        testTime = testNow - testTicker;
        testTicker = testNow;

        testMessage.textContent = `Screen refresh: ${Math.ceil(testTime)}ms; fps: ${Math.floor(1000 / testTime)}
    radius: ${blurFilter.radius}
    passes: ${blurFilter.passes}`;
    };
}();


// Create the Display cycle animation
const demoAnimation = scrawl.makeRender({

    name: "demo-animation",
    target: canvas,
    afterShow: report,
});


// #### User interaction
// Setup form observer functionality
scrawl.observeAndUpdate({

    event: ['input', 'change'],
    origin: '.controlItem',

    target: blurFilter,

    useNativeListener: true,
    preventDefault: true,

    updates: {

        radius: ['radius', 'round'],
        passes: ['passes', 'round'],

        shrinkingRadius: ['shrinkingRadius', 'boolean'],
        includeAlpha: ['includeAlpha', 'boolean'],

        processHorizontal: ['processHorizontal', 'boolean'],
        processVertical: ['processVertical', 'boolean'],
    },
});

// Setup form
document.querySelector('#radius').value = 1;
document.querySelector('#passes').value = 1;
document.querySelector('#shrinkingRadius').options.selectedIndex = 0;
document.querySelector('#includeAlpha').options.selectedIndex = 0;
document.querySelector('#processHorizontal').options.selectedIndex = 1;
document.querySelector('#processVertical').options.selectedIndex = 1;


// #### Development and testing
console.log(scrawl.library);
