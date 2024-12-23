import { Application, Assets, Sprite, Text } from 'pixi.js';
import { addPeople, scaleSprites, redraw } from "./frontend/addSprites";



export let speed = 3; // photons moving speed
export let total_sent_photon = 0; // track counter
export let key_bits = 0; // length of the secret key
export let error_bits = 0; // the number of mismatch bits (same bases but different bits) ; cuz of Eve :-)

// Store an array of fish sprites for animation.
export let alice_key = [];
export  let bob_key = [];
export let withEve = false; // true if the ckeckbox toggled ON
export let stopped = true; // true if continute button being pressed
const simDiv = document.querySelector('#simulation');


// Create a PixiJS application.
export const app = new Application();
export const { alice, bob, eve, aliceText, bobText, eveText } = await initSprites(); // to make sprite accessible from other modules


async function initSprites(){
    await preload();
    return {
        alice: Sprite.from('alice'), 
        bob: Sprite.from('bob'),
        eve: Sprite.from('eve'),
        aliceText: new Text({text: 'Alice'}),
        bobText: new Text({text: 'Bob'}),
        eveText: new Text({text: 'Eve'})
    };
}

async function setup()
{
    // Intialize the application.
    await app.init({ background: '#88a6b8', resizeTo: simDiv});
    app.canvas.style.position = 'relative';
    simDiv.appendChild(app.canvas);
}

async function preload()
{
    // Create an array of asset data to load.
    const assets = [
        { alias: 'ket0', src: './img/ket0.svg'},
        { alias: 'ket1', src: './img/ket1.svg'},
        { alias: 'ket+', src: './img/ket+.svg'},
        { alias: 'ket-', src: './img/ket-.svg'},
        { alias: 'X', src: './img/x.svg'},
        { alias: 'Z', src: './img/z.svg'},
        { alias: 'alice', src: './img/alice.svg'},
        { alias: 'bob', src: './img/bob.svg'},
        { alias: 'eve', src: './img/eve.png'},
    ];
    
    // Load the assets defined above.
    await Assets.load(assets);
}

// Asynchronous IIFE
(async () =>
    {
        await setup();
        scaleSprites();
        addPeople(withEve);
    }
)();


// Updaters: functions to export, so that other modules can edit the needed variables in main
export const setSpeed = (val)=> speed = val;
export const setKeyBits = (val)=> key_bits = val;
export const setTotalSentPhoton = (val)=> total_sent_photon = val;
export const setErrorBits = (val)=> error_bits = val;
export const setWithEve = (val)=> withEve = val;
export const setStopped = (val)=> stopped = val;
export const setAliceKey = (val)=> alice_key = val;
export const setBobKey = (val)=> bob_key = val;

window.onresize = redraw; // re-render the canvas upon window resizing