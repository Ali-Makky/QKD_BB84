
import { Sprite } from 'pixi.js';

// Reference to the alice and bob.
let alice, bob;

export function addBases(app)
{

    const xBasis = Sprite.from('x');
    const zBasis = Sprite.from('z');

    // Add the overlay to the stage.
     // Center the sprite anchor.
     xBasis.anchor.set(0.5);
     zBasis.anchor.set(0.5);
     xBasis.scale.set(0.25);
     xBasis.x = app.screen.width/8;
     xBasis.y = app.screen.height/2;
     zBasis.scale.set(0.25);
    //  xBasis.position.set(app.screen.width/10, app.screen.heigt/10);
    //  zBasis.tilePosition(app.screen.width/2);
     app.stage.addChild(xBasis);
    // app.stage.addChild(zBasis);
}

export function animateWaterOverlay(app, time)
{
    // Extract the delta time from the Ticker object.
    const delta = time.deltaTime;

    // Animate the overlay.
    overlay.tilePosition.x -= delta;
    overlay.tilePosition.y -= delta;
}


// inner funtions
// function 


