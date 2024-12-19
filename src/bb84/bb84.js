import { contShotsHandler } from "../main";


export const  prepare_qubit = (bit, basis) =>
{
    if(bit){ // if it is 1
        if(basis == 'Z')
            return 'ket1';
        return 'ket-'; // X basis
    }

    if(basis == 'Z')
        return 'ket0';
    return 'ket+'; // X basis
}

export const measure_qubit = (qubit, basis) =>
{
    if (basis == 'Z') { // rectilinear polarizer
        if (qubit == 'ket0')
            return 0;
        else if(qubit == 'ket1')
            return 1;
        return getRandBit(); // 50% [0,1]
    }

    // X basis
    if (qubit == 'ket+')
        return 0;
    else if(qubit == 'ket-')
        return 1;
    return getRandBit(); // 50% [0,1]
}


// helper function, maybe will move them into separate module
// Alice's random bit choice
export const getRandBit= ()=>
{
    return getRandomElement([0,1]);
}

export const getRandPolarizer = ()=>
{
    return getRandomElement(['Z', 'X']);
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
