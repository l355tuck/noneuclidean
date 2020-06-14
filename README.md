# noneuclidean
#### Multiplatform (Node.js, SparkAR, MaxMSP (node.script)) module for pure polyrhythmic ("noneuclidean") timing of events


### Use with Node.js

In your terminal, install noneuclidean module and your choice of sound player:

    npm install noneuclidean;
    npm install node-wav-player;

In your node app:

    const track = require('noneuclidean');
    const player = require('node-wav-player');
    
A track takes one parameter, "beatProb", an array of the relative probability (0.0 - 1.0) that a beat count (index + 1) will be chosen.

Define instruments:

    class Instrument    {
        constructor(path) {
            this.path = path;
        }
        play = () => {
            hit(path);
        }
    }
    
"path" is the relative path to a sound file to play.

"hit" is a function to play the sound:

    const hit = (path) => {
        player.play({
            path: path,
        }).then(() => {
            // console.log('play start.');
        }).catch((error) => {
            console.error(error);
        });
    }

• Create an array of instrument parameters:

    // instrument data aray of arrays = name, path
    instParams = ['./snd/808_Kick_x3.m4a', "./snd/808_Closed_HH.m4a"]
    
• Create arrays of Instrument & Track objects:

    const trackCount = 2;
    var instruments = [];
    var tracks = [];
    for (i = 0; i < trackCount; i++)    {
        let newInstrument = new Instrument(instParams[i][0]);
        instruments.push(newInstrument);
        let newTrack = new track.Track([.33, .33, .33]);
        tracks.push(newTrack);
    }
    
• Define "beat" to generate pulse, call noneucledean Track.play method, and play instrument:

    const beat = () => {
        setInterval(() => {
            for (j = 0; j < trackCount; j++)    {
                if (tracks[j].play() == 1) {
                    hit(instruments[j].path);
                };
            }
        }, 250);
    }

Finally, call "beat":

    beat();


### Use with Max’s node.script object
    
Open patch "maxHost.maxpat". The node.script object loads maxWrapper.js, which requires noneuclidean. 
 
Turn on audio and metronome. Send beatProb list messages to create tracks, bangs to increment pulse.
