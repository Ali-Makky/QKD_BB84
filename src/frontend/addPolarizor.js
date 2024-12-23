import { Sprite } from 'pixi.js';
import { app, alice, bob, eve } from "../main";

let alice_basis, bob_basis, eve_basis1, eve_basis2;
export const addPolarizer = (basisA, basisB, basisE, withEve)=>
    {
    alice_basis = ( basisA == 'Z' ? Sprite.from('Z') : Sprite.from('X'));
    bob_basis = ( basisB == 'Z' ? Sprite.from('Z') : Sprite.from('X'));
    if(withEve){
        eve_basis1 =  (basisE == 'Z' ? Sprite.from('Z') : Sprite.from('X'));
        eve_basis2 =  (basisE == 'Z' ? Sprite.from('Z') : Sprite.from('X'));
        //eve
        // measuring basis (on the left)
        eve_basis1.anchor.set(0.5);
        eve_basis1.scale.set(0.1);
        eve_basis1.x = eve.x - 50;
        eve_basis1.y = alice.y + 50;
        app.stage.addChild(eve_basis1);
        // sending basis (on right)
        eve_basis2.anchor.set(0.5);
        eve_basis2.scale.set(0.1);
        eve_basis2.x = eve.x + 100;
        eve_basis2.y = alice.y + 50;
        app.stage.addChild(eve_basis2);
    }
        
    //alice
    alice_basis.anchor.set(0.5);
    alice_basis.scale.set(0.1);
    alice_basis.x = alice.x + 100;
    alice_basis.y = alice.y + 50;
    app.stage.addChild(alice_basis);
    
    //bob
    bob_basis.anchor.set(0.5);
    bob_basis.scale.set(0.1);
    bob_basis.x = bob.x - 50;
    bob_basis.y = bob.y + 50;
    app.stage.addChild(bob_basis);

    return [alice_basis, bob_basis, eve_basis1, eve_basis2];
}

