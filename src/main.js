import { Application } from "pixi.js";
import { addPeople, scaleSprites, redraw } from "./frontend/addSprites";
import { initSpritesAsync } from "./frontend/initSprites";


export let speed = 3; // photons moving speed
export let total_sent_photon = 0; // track counter
export let key_bits = 0; // length of the secret key
export let error_bits = 0; // the number of mismatch bits (same bases but different bits) ; cuz of Eve :-)

// Store an array of fish sprites for animation.
export let alice_key = [];
export let bob_key = [];
export let withEve = false; // true if the ckeckbox toggled ON
export let stopped = true; // true if continute button being pressed
const simDiv = document.querySelector("#simulation");


// Create a PixiJS application.
export const app = new Application();

async function setup() {
  // Intialize the application.
  await app.init({ background: "#88a6b8", resizeTo: simDiv });
  app.canvas.style.position = "relative";
  simDiv.appendChild(app.canvas);
}


// Asynchronous IIFE
(async () => {
  await setup();
  await initSpritesAsync();
  scaleSprites();
  addPeople(withEve);
})();

// Updaters: functions to export, so that other modules can edit the needed variables in main
export const setSpeed = (val) => (speed = val);
export const setKeyBits = (val) => (key_bits = val);
export const setTotalSentPhoton = (val) => (total_sent_photon = val);
export const setErrorBits = (val) => (error_bits = val);
export const setWithEve = (val) => (withEve = val);
export const setStopped = (val) => (stopped = val);
export const setAliceKey = (val) => (alice_key = val);
export const setBobKey = (val) => (bob_key = val);

window.onresize = redraw; // re-render the canvas upon window resizing