import { alice, bob, eve, aliceText, bobText, eveText } from "./initSprites.js";
import { app, withEve } from "../main.js";


export const addPeople = ()=>
{
    drawAlice();
    drawBob();
    if(withEve)
        drawEve();
}

// call once upon initilization
export const scaleSprites = ()=>
{
    alice.scale.set(0.35);
    bob.scale.set(0.35);
    eve.scale.set(0.35);
}


function drawAlice()
{
    // Set Alice's properties
    alice.x = 50; // Position from left edge
    alice.y = app.canvas.height / 2;
    aliceText.x = alice.x;
    aliceText.y = alice.y - 30;

    // add to stage
    app.stage.addChild(alice); // error
    app.stage.addChild(aliceText);
}

function drawBob()
{
    // Set Bob's properties
    bob.x = app.canvas.width - bob.width - 50; // Position from right edge
    bob.y = app.canvas.height / 2
    bobText.x = bob.x + 10;
    bobText.y = bob.y - 25;

    // add to stage
    app.stage.addChild(bob);
    app.stage.addChild(bobText);
}

function drawEve()
{
    // Set Bob's properties
    eve.x = app.canvas.width / 2 - 25; // Position at the middle
    eve.y = app.canvas.height / 2 - 75;
    eveText.x = eve.x + 10;
    eveText.y = eve.y - 25;

    // add to stage
    app.stage.addChild(eve);
    app.stage.addChild(eveText);
}


export const redraw = ()=>
{
    app.stage.removeChild(alice);
    app.stage.removeChild(aliceText);
    app.stage.removeChild(bob);
    app.stage.removeChild(bobText);
    if(withEve) {
        app.stage.removeChild(eve);
        app.stage.removeChild(eveText);
    }
    addPeople();
}