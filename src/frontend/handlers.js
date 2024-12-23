import { isValidKey } from "../backend/verifyKey";
import { populateRow } from "./populateResults";
import { colorKeyBits } from "./colorKeys";
import { sendPhoton } from './addPhoton';
import { redraw } from "./addSprites";
import { app, speed, alice_key, bob_key, withEve, stopped, setSpeed, total_sent_photon, key_bits, error_bits, setTotalSentPhoton, setKeyBits, setErrorBits, setWithEve, setStopped, setAliceKey, setBobKey } from "../main";
import { eve, eveText } from "./initSprites.js";



export async function sendPhotonHandler()
{
    const result = await sendPhoton(alice_key, bob_key, withEve);
    setTotalSentPhoton(total_sent_photon + 1); // single photon was sent
    if(result['validKeyBit']) // if Alice & Bob have same Bases
    {
         setKeyBits(key_bits+1); // increment
        if(result['aliceBit'] != result['bobBit']) // similar bases, but different bits! cuz of Eve :-)
            setErrorBits(error_bits+1); // increment
    }
    
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
    setStopped(false);
    while(!stopped){
        sendPhotonHandler();
        await new Promise(r => setTimeout(r, 1000/speed)); // to have some space between photons (based on speed)
    }
}


export const stopShotsHandler = async ()=>  setStopped(true);


export const eveToggleHandler = async (event)=> 
{
    if (event.target.checked) {
        setWithEve(true);
        console.log('Eavesdrop enabled!');
    } else {
        setWithEve(false);
        console.log('Eavesdrop disabled!');
    }

    if(withEve)
        redraw();
    else {
        app.stage.removeChild(eve);
        app.stage.removeChild(eveText);
    }
}


export const setPhotonSpeed = (s)=> setSpeed(s);


export const compareBitsHandler = ()=>
{
    if (alice_key.length < 25) return; // 25 bits needed for coloring
    colorKeyBits(alice_key, bob_key);

    if (!isValidKey(alice_key, bob_key))
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
    setAliceKey([]); setBobKey([]);
    setTotalSentPhoton(0);
    setKeyBits(0);
    setErrorBits(0);
    // clear Stat section
    $('#alice_bits').text('');
    $('#bob_bits').text('');
    $('#total-bits').text('');
    $('#correct-bases').text('');
    $('#error-bits').text('');
    $('#prob').text('');
}