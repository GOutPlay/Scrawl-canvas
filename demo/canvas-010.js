// # Demo Canvas 010 
// Use video sources and media streams for Picture entitys

// [Run code](../../demo/canvas-010.html)
import scrawl from '../source/scrawl.js'


// #### Scene setup
let canvas = scrawl.library.artefact.mycanvas;


// ##### Importing video sources

// __Get video stream from DOM &lt;video> element__
// + When loading video assets from the DOM, note that Scrawl-canvas has to deal with the &lt;video> element operating under normal DOM rules. This means that (in most modern browsers) the video will not fetch anything beyond its metadata until at least 1px height of the video is displayed in the viewport (videos hidden by any CSS rules will not fetch anything until they are made visible).
// + The practical implications of this is that any Picture entitys relying on the video as their asset will not display an image until the DOM video element appears in the user's viewport.
// + To make sure the Picture entity displays the video's first frame, we need to explicitly set the DOM element's preload attribute to __auto__ 
scrawl.importDomVideo('.myvideo');


// __Create Picture entity__ from video entity included in the DOM
let viddyOne = scrawl.makePicture({

    name: 'first-video',
    asset: 'waves',

    width: 200,
    height: 200,

    startX: 300,
    startY: 200,
    handleX: 100,
    handleY: 100,

    copyWidth: 200,
    copyHeight: 200,
    copyStartX: 100,
    copyStartY: 100,

    lineWidth: 10,
    strokeStyle: 'lightgreen',

    order: 1,
    method: 'drawThenFill',

});

// __Import a video from a remote server__
let viddyTwo = scrawl.makePicture({

    name: 'second-video',
    videoSource: 'img/Motion - 18249.mp4',

    width: '100%',
    height: '100%',

    copyWidth: '100%',
    copyHeight: '100%',

    order: 0,
    method: 'fill',
});


// __Display a device-based media stream__ in a Picture entity
// + Note 1: Users will need to explicitly agree to let Scrawl-canvas use the media stream the first time the page loads (the browser should handle this agreement procedure itself)
// + Note 2: importMediaStream returns a Promise!
let viddyThree;

scrawl.importMediaStream({
    audio: false,
})
.then(myface => {

    viddyThree = scrawl.makePicture({

        name: 'mediastream-video',
        asset: myface.name,

        startX: '20%',
        startY: '20%',
        handleX: 'center',
        handleY: 'center',

        width: '40%',
        height: '40%',

        copyWidth: '100%',
        copyHeight: '100%',

        lineWidth: 6,
        strokeStyle: 'pink',

        order: 0,
        method: 'drawThenFill',
    });

    // Adding some controls to manipulate the media stream's display
    // + For this demo, we'll use the existing controls setup for manipulating the DOM video
    scrawl.observeAndUpdate({

        event: ['input', 'change'],
        origin: '.controlItem',

        target: viddyThree,

        useNativeListener: true,
        preventDefault: true,

        updates: {

            copy_start_xPercent: ['copyStartX', '%'],
            copy_start_xAbsolute: ['copyStartX', 'round'],

            copy_start_yPercent: ['copyStartY', '%'],
            copy_start_yAbsolute: ['copyStartY', 'round'],

            copy_dims_widthPercent: ['copyWidth', '%'],
            copy_dims_widthAbsolute: ['copyWidth', 'round'],

            copy_dims_heightPercent: ['copyHeight', '%'],
            copy_dims_heightAbsolute: ['copyHeight', 'round'],

            upend: ['flipUpend', 'boolean'],
            reverse: ['flipReverse', 'boolean'],
        },
    });
})
.catch(err => console.log(err.message));


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

        testMessage.textContent = `Screen refresh: ${Math.ceil(testTime)}ms; fps: ${Math.floor(1000 / testTime)}`;
    };
}();


// Create the Display cycle animation
scrawl.makeRender({

    name: 'demo-animation',
    target: canvas,
    afterShow: report,
});


// #### User interaction
// Setup form observer functionality
scrawl.observeAndUpdate({

    event: ['input', 'change'],
    origin: '.controlItem',

    target: viddyOne,

    useNativeListener: true,
    preventDefault: true,

    updates: {

        copy_start_xPercent: ['copyStartX', '%'],
        copy_start_xAbsolute: ['copyStartX', 'round'],

        copy_start_yPercent: ['copyStartY', '%'],
        copy_start_yAbsolute: ['copyStartY', 'round'],

        copy_dims_widthPercent: ['copyWidth', '%'],
        copy_dims_widthAbsolute: ['copyWidth', 'round'],

        copy_dims_heightPercent: ['copyHeight', '%'],
        copy_dims_heightAbsolute: ['copyHeight', 'round'],

        paste_dims_widthPercent: ['width', '%'],
        paste_dims_widthAbsolute: ['width', 'round'],

        paste_dims_heightPercent: ['height', '%'],
        paste_dims_heightAbsolute: ['height', 'round'],

        paste_start_xPercent: ['startX', '%'],
        paste_start_xAbsolute: ['startX', 'round'],
        paste_start_xString: ['startX', 'raw'],

        paste_start_yPercent: ['startY', '%'],
        paste_start_yAbsolute: ['startY', 'round'],
        paste_start_yString: ['startY', 'raw'],

        paste_handle_xPercent: ['handleX', '%'],
        paste_handle_xAbsolute: ['handleX', 'round'],
        paste_handle_xString: ['handleX', 'raw'],

        paste_handle_yPercent: ['handleY', '%'],
        paste_handle_yAbsolute: ['handleY', 'round'],
        paste_handle_yString: ['handleY', 'raw'],

        roll: ['roll', 'float'],
        scale: ['scale', 'float'],

        upend: ['flipUpend', 'boolean'],
        reverse: ['flipReverse', 'boolean'],
    },
});

// Add an additional click event listener
// + Because many browsers/devices will not allow video to be played until a user interacts with it in some way
scrawl.addListener('up', function () {

    viddyOne.set({
        video_muted: true,
        video_loop: true,
    }).videoPlay();

    viddyTwo.set({
        video_muted: true,
        video_loop: true,
    }).videoPlay();

}, canvas.domElement);


// Setup form
document.querySelector('#copy_start_xPercent').value = 25;
document.querySelector('#copy_start_yPercent').value = 25;
document.querySelector('#copy_dims_widthPercent').value = 50;
document.querySelector('#copy_dims_widthAbsolute').value = 200;
document.querySelector('#copy_start_xAbsolute').value = 100;
document.querySelector('#copy_start_yAbsolute').value = 100;
document.querySelector('#copy_dims_heightPercent').value = 50;
document.querySelector('#copy_dims_heightAbsolute').value = 200;
document.querySelector('#paste_dims_widthPercent').value = 33;
document.querySelector('#paste_dims_widthAbsolute').value = 200;
document.querySelector('#paste_dims_heightPercent').value = 50;
document.querySelector('#paste_dims_heightAbsolute').value = 200;
document.querySelector('#paste_start_xPercent').value = 50;
document.querySelector('#paste_start_yPercent').value = 50;
document.querySelector('#paste_handle_xPercent').value = 50;
document.querySelector('#paste_handle_yPercent').value = 50;
document.querySelector('#paste_start_xAbsolute').value = 300;
document.querySelector('#paste_start_yAbsolute').value = 200;
document.querySelector('#paste_handle_xAbsolute').value = 100;
document.querySelector('#paste_handle_yAbsolute').value = 100;
document.querySelector('#paste_start_xString').options.selectedIndex = 1;
document.querySelector('#paste_start_yString').options.selectedIndex = 1;
document.querySelector('#paste_handle_xString').options.selectedIndex = 1;
document.querySelector('#paste_handle_yString').options.selectedIndex = 1;
document.querySelector('#roll').value = 0;
document.querySelector('#scale').value = 1;
document.querySelector('#upend').options.selectedIndex = 0;
document.querySelector('#reverse').options.selectedIndex = 0;
