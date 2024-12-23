import { Sprite } from 'pixi.js';
import { do_an_experiment } from '../backend/experiment';
import { addPolarizer } from './addPolarizor';
import { app, alice, bob, eve, speed } from "../main";



export async function sendPhoton(alice_key, bob_key, withEve)
{

    const result = do_an_experiment(withEve);
    // move the qubit visually
    if (result['validKeyBit']) // Alice & Bob have same bases
        {
            bob_key.push(result['bobBit']);
            alice_key.push(result['aliceBit']);
        }
    
    //add polarizors to the stage
    const polarizers = addPolarizer(result['basisA'], result['basisB'], result['basisE'], withEve);
        
    
    const alice_photon = getKet(result['aliceQubit']);
    let eve_photon = '';
    if(withEve){
        eve_photon = getKet(result['eveQubit']);
    }
    movePhoton(alice_photon, eve_photon, polarizers, withEve);
    
    return result; // experiment data
}


const movePhoton = (alice_photon, eve_photon, polarizers, withEve) => 
{
    // Center the sprite anchor.
    alice_photon.anchor.set(0.5);
    // Assign additional properties for the animation.
    alice_photon.direction = 1;
    alice_photon.speed = speed;
    alice_photon.x = alice.x + 100;
    alice_photon.y = alice.y + 50;
    alice_photon.scale.set(0.3);

    // Eve.
    if(withEve){
        eve_photon.anchor.set(0.5);
        // Assign additional properties for the animation.
        eve_photon.direction = 1;
        eve_photon.speed = speed;
        eve_photon.x = eve.x + 100;
        eve_photon.y = alice.y + 50;
        eve_photon.scale.set(0.3);
    }



    app.stage.addChild(alice_photon);


    // animating photon movment from (eve) --to--> (bob)
    let updatePosition2
    const createTickerCallback2 = (p, bob) => {
        return (time) => {
            p.x += Math.sin(p.direction) * p.speed;

            if (p.x >= bob.x-50) { // bob polarizer position
                // console.log("p.x > bob.x", p.x);
                // Remove the ticker callback
                app.ticker.remove(updatePosition2);
                app.stage.removeChild(p);
                app.stage.removeChild(polarizers[1]); // bob polarizer
                app.stage.removeChild(polarizers[3]); // eve polarizer2
            }
        };
    };

    // animating photon movment from (alice) --to--> (eve/bob)
    const createTickerCallback = (p, bob, eve) => {
        return (time) => {
            p.x += Math.sin(p.direction) * p.speed;

            if(!withEve) {
                if (p.x >= bob.x-50) { // bob polarizer position
                    // console.log("p.x > bob.x", p.x);
                    // Remove the ticker callback
                    app.ticker.remove(updatePosition);
                    app.stage.removeChild(p);
                    app.stage.removeChild(polarizers[0]); // alice polarizer
                    app.stage.removeChild(polarizers[1]); // bob polarizer
                }
            } else {
                if (p.x >= eve.x-50) { // bob polarizer position
                    // console.log("p.x > eve.x", p.x);
                    // Remove the ticker callback
                    app.ticker.remove(updatePosition);
                    app.stage.removeChild(p);
                    app.stage.removeChild(polarizers[0]); // alice polarizer
                    app.stage.removeChild(polarizers[2]); // eve polarizer1

                    // Create the ticker callback (eve --> bob)
                    app.stage.addChild(eve_photon);
                    updatePosition2 = createTickerCallback2(eve_photon, bob);
                    app.ticker.add(updatePosition2);
                }
            }
        };
    };

    // Create the ticker callback
    const updatePosition = createTickerCallback(alice_photon, bob, eve);
    app.ticker.add(updatePosition);
}


const getKet = (qubit)=> Sprite.from(qubit);