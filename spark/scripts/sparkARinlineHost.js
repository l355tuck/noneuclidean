 const Scene = require('Scene');
const Time = require('Time')
// const CANNON = require('cannon');
const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const AudioObject = require("sparkar-audio-object");
const TouchGestures = require('TouchGestures');

// const Noneuclidean = require('noneuclidean');
// var noneuclidean = new Noneuclidean;

let count = Math.random(5);


function Track(beatProb) {
    this.beatProb = [.33, .33, .33];
    this.beatCount = 0;
    this.maxBeats = 0;
    this.play = function () {
        // find new maxBeats at end of count
        if (this.beatCount == this.maxBeats) {
            let coinToss = Math.random();
            let beatProbAccum = 0.;
            var maxCount = this.beatProb.length;
            var m = 0;
            for (m = 0; m < maxCount; m++) {
                beatProbAccum = beatProbAccum + this.beatProb[m]
                if (coinToss < beatProbAccum) {
                    this.maxBeats = m + 1 // lengths 1, 2, 3
                    this.beatCount = 0;
                    return 0;
                }
            }
        }
        // play sound on first count
        else if (this.beatCount == 0) {
            this.beatCount++;
            return 1;
        }
        // just count
        else {
            this.beatCount++;
        }
    }
}


// create arrays of Instrument & Track objects
// const trackCount = instParams.length;
// var instruments = [];
const trackCount = 4;
var tracks = [];
for (i = 0; i < trackCount; i++) {
    // let newInstrument = new Instrument(instParams[i]);
    // instruments.push(newInstrument);
    let newTrack = new Track([.33, .33, .33]);
    newTrack.play();
    tracks.push(newTrack);
}

// const fallTime = 1000;
// Reference SphereObject from Scene
Promise.all([
Scene.root.findFirst('SphereObject')
]).then(function (objects) {
    // const sphere = objects[0];

    // Create cannon world and setting gravity
    // const world = new CANNON.World();
    // world.gravity.set(0, -9.82, 0);
    
    // Create sphere body and setting its shape and properties
    // const radius = 1;
    // const sphereProps = {
    //     mass: 5,
    //     position: new CANNON.Vec3(0, 10, 0),
    //     radius: radius,
    //     shape: new CANNON.Sphere(radius),
    // }
    // const sphereBody = new CANNON.Body(sphereProps);
    // world.addBody(sphereBody);

    // Create ground body and settings its shape and properties
    // const groundProps = {
    //     mass: 0,
    //     position: new CANNON.Vec3(0, -sphereProps.radius, 0),
    //     shape: new CANNON.Plane(),
    // }
    // const groundBody = new CANNON.Body(groundProps);
    // // Rotate the ground so it is flat (facing upwards)
    // const angle = -Math.PI / 2;
    // const xAxis = new CANNON.Vec3(1, 0, 0);
    // groundBody.quaternion.setFromAxisAngle(xAxis, angle);
    // world.addBody(groundBody);


    // Configure time step for Cannon
    const fixedTimeStep = 1.0 / 60.0;
    const maxSubSteps = 3;
    const timeInterval = 30;
    let lastTime;
    let freeFalling = 1;
    let lastFallTime;
    let fallTime = 3000;
    
    // audio setup
    const player = AudioObject.new({
    speakerName: "player_speaker",
    controllerName: "player_controller",
    });
    player.volume = 1.;

    // collision listener
    // sphereBody.addEventListener("collide", function (event) {
    //     player.play();
    // });



    // retrigger drop
    TouchGestures.onTap().subscribe(function (event) {
        if (tracks[0].play() == 1) {
            player.play();    
        };
  
        // sphereBody.position.x = 0;
        // sphereBody.position.y = 10;
        // sphereBody.position.z = 0;
    });

    // update
    var idInterval = Time.setInterval(function (time) {
        // if (lastTime !== undefined) {
        //     let dt = (time - lastTime) / 1000;
        //     world.step(fixedTimeStep, dt, maxSubSteps)
        //     sphere.transform.x = sphereBody.position.x;
        //     sphere.transform.y = sphereBody.position.y;
        //     sphere.transform.z = sphereBody.position.z;
        // };
        // lastTime = time
    }, timeInterval);

});        



