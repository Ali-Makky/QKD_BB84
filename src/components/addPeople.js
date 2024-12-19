
import { Sprite, Text, TextStyle } from 'pixi.js';

// Reference to the alice and bob.
let alice, bob;

export function addPeople(app)
{

    alice = Sprite.from('alice');
    bob = Sprite.from('bob');

    setupAlice(app, alice);
    setupBob(app, bob);
    
    // Add resize handler to make it responsive
    window.addEventListener('resize', () => {
        const parent = app.view.parentNode;
        app.renderer.resize(parent.clientWidth, parent.clientHeight);
        
        // Update positions if needed
        if (app.stage.children.length > 0) {
            const alice = app.stage.children[1];
            const bob = app.stage.children[3];
            const aliceText = app.stage.children[2];
            const bobText = app.stage.children[4];
            
            alice.y = app.screen.height / 2;
            bob.x = app.screen.width - bob.width - 50;
            bob.y = app.screen.height / 2;
            
            aliceText.x = alice.x + 10;
            aliceText.y = alice.y - 20;
            bobText.x = bob.x + 10;
            bobText.y = bob.y - 20;
        }
    });
}



// inner function
function setupAlice(app, alice)
{
    // Set Alice's properties
    alice.width = 75;
    alice.height = 75;
    alice.x = 50; // Position from left edge
    alice.y = app.screen.height / 2;

    const aliceText = new Text({
        text: 'Alice'
    });
    aliceText.x = alice.x + 10;
    aliceText.y = alice.y - 20;


    // add to stage
    app.stage.addChild(alice);
    app.stage.addChild(aliceText);
}

function setupBob(app, bob)
{
    // Set Bob's properties
    bob.width = 75;
    bob.height = 75;
    bob.x = app.screen.width - bob.width - 50; // Position from right edge
    bob.y = app.screen.height / 2

    const bobText = new Text({text: 'Bob'});
    bobText.x = bob.x + 10;
    bobText.y = bob.y - 20;

    // add to stage
    app.stage.addChild(bob);
    app.stage.addChild(bobText);
}