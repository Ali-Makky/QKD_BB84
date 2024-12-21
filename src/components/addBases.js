
import { Sprite } from 'pixi.js';


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
     app.stage.addChild(xBasis);
}

export function animateWaterOverlay(app, time)
{
    // Extract the delta time from the Ticker object.
    const delta = time.deltaTime;

    // Animate the overlay.
    overlay.tilePosition.x -= delta;
    overlay.tilePosition.y -= delta;
}