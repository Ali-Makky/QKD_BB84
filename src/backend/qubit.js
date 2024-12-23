import { getRandBit } from "./random";


/**
 * Prepares a qubit state based on the input classical bit and the measurement basis.
 *
 * @param {number} bit - The classical bit value (0 or 1).
 *                       - `0`: Prepare the |0⟩ or |+⟩ state.
 *                       - `1`: Prepare the |1⟩ or |−⟩ state.
 * @param {string} basis - The measurement basis in which to prepare the qubit.
 *                         - `'Z'`: Standard computational basis (|0⟩ or |1⟩).
 *                         - `'X'`: Hadamard basis (|+⟩ or |−⟩).
 * @returns {string} - The prepared qubit state as a string representation.
 *                     - `'ket1'`: Represents |1⟩.
 *                     - `'ket-'`: Represents |−⟩.
 *                     - `'ket0'`: Represents |0⟩.
 *                     - `'ket+'`: Represents |+⟩.
 *
 * @example
 * // Preparing a qubit in the Z basis
 * const state1 = prepare_qubit(0, 'Z'); // Returns 'ket0'
 *
 * // Preparing a qubit in the X basis
 * const state4 = prepare_qubit(1, 'X'); // Returns 'ket-'
 */
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


/**
 * Simulates the measurement of a qubit in a specified basis.
 *
 * @param {string} qubit - The quantum state of the qubit to be measured.
 *                         -  states are: |0⟩, |1⟩, |+⟩, |−⟩
 * @param {string} basis - The basis in which to measure the qubit.
 *                         - `'Z'`: Rectilinear polarizer (|0⟩ or |1⟩ basis).
 *                         - `'X'`: Hadamard basis (|+⟩ or |−⟩ basis).
 * @returns {number} - The classical measurement result of the qubit.
 *                     - `0` or `1`: Corresponds to the measurement outcome.
 *                     - If the qubit does not align with the measurement basis, a random result (50% chance of 0 or 1) is returned.
 *
 * @example
 * // Measuring a qubit in the Z basis
 * const result3 = measure_qubit('ket+', 'Z'); // Randomly returns 0 or 1
 *
 * // Measuring a qubit in the X basis
 * const result5 = measure_qubit('ket-', 'X'); // Returns 1
 */
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