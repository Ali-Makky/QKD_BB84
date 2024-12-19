import {getRandBit, getRandPolarizer, prepare_qubit, measure_qubit} from './bb84'

export const do_an_experiment = (withEve)=>
{
    if(!withEve)
    {
        console.log("do exper without Eve");    
        return experiment_without_eve();
    }
    console.log("do exper with Eve");    
    return experiment_with_eve();
}


const experiment_without_eve = ()=>
    {
    //1.Alice random classical bit 0/1
    const alice_bit = getRandBit();
    //2. Alice and Bob random polarizor Z/X
    const alice_basis = getRandPolarizer();
    const bob_basis = getRandPolarizer();
    //3. qubit encoding: based on 1&2 we know which photon will be sent
        // 0 + Z = |0>
        // 1 + Z = |1>
        // 0 + X = |+>
        // 1 + X = |->
    const qubit = prepare_qubit(alice_bit, alice_basis);
    // 4. bob's measurement
    const bob_bit = measure_qubit(qubit, bob_basis);
    
    
    // public communication
    if (alice_basis == bob_basis)
        return {
            'aliceBit': alice_bit,
            'bobBit': bob_bit,
            'eveBit': -1, // eve is not active
            'validKeyBit': true, // indicate bases similar
            'aliceQubit': qubit,
            'basisA': alice_basis,
            'basisB': bob_basis,
            'basisE': '' // eve is not active
        };
    return {
        'aliceBit': alice_bit,
        'bobBit': bob_bit,
        'eveBit': -1, // eve is not active
        'validKeyBit': false, // indicate bases mismatch
        'aliceQubit': qubit,
        'basisA': alice_basis,
        'basisB': bob_basis,
        'basisE': '' // eve is not active
    }; 
}


const experiment_with_eve = ()=> 
{
    //1.Alice random classical bit 0/1
    const alice_bit = getRandBit();
    //2. Alice and Bob random polarizer Z/X
    const alice_basis = getRandPolarizer();
    const bob_basis = getRandPolarizer();
    //3. qubit encoding: based on 1&2 we know which photon will be sent
        // 0 + Z = |0>
        // 1 + Z = |1>
        // 0 + X = |+>
        // 1 + X = |->
    const alice_qubit = prepare_qubit(alice_bit, alice_basis);

    // ------ Eve intrupt start -------- //
    //4. evesdropper
    /*
    1. chose random measurement basis Z/X
    2. measure Alice's qubit
    3. prepare qubit (using same basis chosen in 1.), and send it to Bob
    */
    const eve_basis = getRandPolarizer();
    const eve_bit = measure_qubit(alice_qubit, eve_basis);
    const eve_qubit = prepare_qubit(eve_bit, eve_basis);
    // ------ Eve intrupt end -------- //

    // 5. bob's measurement
    const bob_bit = measure_qubit(eve_qubit, bob_basis);


    // public communication
    if (alice_basis == bob_basis)
        return {
            'aliceBit': alice_bit,
            'bobBit': bob_bit,
            'eveBit': eve_bit, // eve is not active
            'validKeyBit': true, // indicate bases similar
            'aliceQubit': alice_qubit,
            'eveQubit': eve_qubit,
            'basisA': alice_basis,
            'basisB': bob_basis,
            'basisE': eve_basis
        }
        ;
    return {
        'aliceBit': alice_bit,
        'bobBit': bob_bit,
        'eveBit': eve_bit, // eve is not active
        'validKeyBit': false, // indicate different bases
        'aliceQubit': alice_qubit,
        'eveQubit': eve_qubit,
        'basisA': alice_basis,
        'basisB': bob_basis,
        'basisE': eve_basis
    }; 
}