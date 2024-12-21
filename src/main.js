import { Application, Assets, Sprite, Text } from 'pixi.js';
import { sendPhoton } from './components/addPhoton';
import { populateRow } from "./frontend_logic/populateResults";
import { colorKeyBits, isValidKey } from "./frontend_logic/verifyKey";


// Create a PixiJS application.
const app = new Application();
let speed = 3; // photons moving speed
let total_sent_photon = 0; // track counter
let key_bits = 0; // length of the secret key
let error_bits = 0; // the number of mismatch bits (same bases but different bits) ; cuz of Eve :-)

// Store an array of fish sprites for animation.
let secret_key = []; let alice_key = []; let bob_key = [];
let alice, bob, eve, aliceText, bobText, eveText; // alicePolarizer, bobPolarizer;
let stopped = true; // true if continute button being pressed
let withEve = false; // true if the ckeckbox toggled ON
const simDiv = document.querySelector('#simulation');

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
        await preload();
        addPeople(withEve);
    }
)();



/////////////////
function addPeople(withEve)
{
    alice = Sprite.from('alice');
    bob = Sprite.from('bob');
    setupAlice();
    setupBob();
    
    if(withEve){
        eve = Sprite.from('eve');
        setupEve();
    }
}

// inner function
function setupAlice()
{
    // Set Alice's properties
    alice.scale.set(0.35);
    alice.x = 50; // Position from left edge
    alice.y = app.screen.height / 2;

    aliceText = new Text({
        text: 'Alice'
    });
    aliceText.x = alice.x;
    aliceText.y = alice.y - 30;

    // add to stage
    app.stage.addChild(alice);
    app.stage.addChild(aliceText);
}

function setupBob()
{
    // Set Bob's properties
    bob.scale.set(0.35);
    bob.x = app.screen.width - bob.width - 50; // Position from right edge
    bob.y = app.screen.height / 2

    bobText = new Text({text: 'Bob'});
    bobText.x = bob.x + 10;
    bobText.y = bob.y - 25;

    // add to stage
    app.stage.addChild(bob);
    app.stage.addChild(bobText);
}

function setupEve()
{
    // Set Bob's properties
    eve.scale.set(0.35);
    eve.x = app.screen.width / 2 - 25; // Position at the middle
    eve.y = app.screen.height / 2 - 75;

    eveText = new Text({text: 'Eve'});
    eveText.x = eve.x + 10;
    eveText.y = eve.y - 25;

    // add to stage
    app.stage.addChild(eve);
    app.stage.addChild(eveText);
}



//////////////

export async function sendPhotonHandler()
{
    const result = await sendPhoton(app, alice, bob, eve, withEve, alice_key, bob_key, speed);
    total_sent_photon += 1; // single photon was sent
    if(result['validKeyBit']) // if Alice & Bob have same Bases
    {
        key_bits += 1;
        if(result['aliceBit'] != result['bobBit']) // similar bases, but different bits! cuz of Eve :-)
            error_bits += 1;
    }
    
    console.log(result);
    populateRow(
        result['basisA'], result['aliceBit'],
        result['basisE'], result['eveBit'],
        result['basisB'], result['bobBit'],
    );

    // concatinate the new bits into the key section
    populateKeyBits(result['aliceBit'], result['bobBit'], result['validKeyBit']);
    populateStat();
}

export const populateKeyBits = (bitA, bitB, validKeyBit)=>
{
    if(!validKeyBit) return;

        // 1st bit -> a_0, last-bit -> a_n-1
    const a = `
            <span id="a${key_bits-1}">
            ${bitA}
            </span>
        `;
        $("#alice_bits").append(a);

        // 1st bit -> b_0, last-bit -> b_n-1
    const b = `
        <span id="b${key_bits-1}">
        ${bitB}
        </span>
        `;
        $("#bob_bits").append(b);
}

export const populateStat = ()=>
{
    $('#total-bits').text(total_sent_photon);
    $('#correct-bases').text(key_bits);
    $('#error-bits').text(error_bits);
    $('#prob').text(error_bits / key_bits);
}

export async function shotsHandler()
{
    const N = parseInt($('#nPhotons').val());
    for (let i = 0; i < N; i++) {
        sendPhotonHandler();
        await new Promise(r => setTimeout(r, 1000/speed)); // to have some space between photons (based on speed)
    } 
}

export async function contShotsHandler()
{
    stopped = false;
    while(!stopped){
        sendPhotonHandler();
        await new Promise(r => setTimeout(r, 1000/speed)); // to have some space between photons (based on speed)
    }
}

export async function stopShotsHandler()
{
    stopped = true;
}

export const eveToggleHandler = async (event)=> 
{
    if (event.target.checked) {
        withEve = true;
        console.log('Eavesdrop enabled!');
    } else {
        withEve = false;
        console.log('Eavesdrop disabled!');
    }

    if(withEve)
        redraw();
    else {
        app.stage.removeChild(eve);
        app.stage.removeChild(eveText);
    }
}

export const setPhotonSpeed = (s)=> speed = s;

export const compareBitsHandler = ()=>
{
    if (alice_key.length < 25) return; // 25 bits needed for coloring
    colorKeyBits(alice_key, bob_key);

    if (isValidKey(alice_key, bob_key))
    {
        // Show error notification
        Swal.fire({
            icon: 'error',
            title: 'Invalid Key (Eavesdropper!)',
            text: 'The keys do not match! There are differences between Alice and Bob keys.',
            confirmButtonColor: '#d33',
            timer: 15000  // Auto close after 15 seconds
        });
    }
    else
    {
        // Show success notification
        Swal.fire({
            icon: 'success',
            title: 'Valid Key',
            text: 'The keys match perfectly! Alice and Bob can proceed with secure communication (using non-shared bits).',
            confirmButtonColor: '#3085d6',
            timer: 15000  // Auto close after 15 seconds
        });
    }
}


export const clearHandler = ()=>
{
    // clear table rows
    $("#table-body-experiment").empty();

    // reset all data tarcker vairables
    secret_key = []; alice_key = []; bob_key = [];
    total_sent_photon = 0; 
    key_bits = 0; 
    error_bits = 0;
    // clear Stat section
    $('#alice_bits').text('');
    $('#bob_bits').text('');
    $('#total-bits').text('');
    $('#correct-bases').text('');
    $('#error-bits').text('');
    $('#prob').text('');
}


const redraw = ()=>
{
    app.stage.removeChild(alice);
    app.stage.removeChild(aliceText);
    app.stage.removeChild(bob);
    app.stage.removeChild(bobText);
    app.stage.removeChild(eve);
    app.stage.removeChild(eveText);
    addPeople(withEve);
}
window.onresize = redraw;