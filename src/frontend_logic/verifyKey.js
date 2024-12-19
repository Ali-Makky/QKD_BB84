const verifyKey = (alice_key, bob_key)=>
{
    const wrong_bits_index = []; // the positions of the errors
    for (let i = 0; i < alice_key.length; i++) {
        if(alice_key[i] != bob_key[i]) // if mis-match between Alice-Bob keys
            wrong_bits_index.push(i);
    }
    return wrong_bits_index;
}

// export const colorAllKeyBits = (alice_key, bob_key)=> // valid green, wrong red
// {
//     // find positions of wrong bits first
//     const wrong_bits_index = verifyKey(alice_key, bob_key);

//     for (let i = 0; i < alice_key.length; i++) {
//         // 1st bit -> a_0, last-bit -> a_n-1
//         if(wrong_bits_index.includes(i)) {
//             $(`#a${i}`).css("background-color", "red");
//             // 1st bit -> b_0, last-bit -> b_n-1
//             $(`#b${i}`).css("background-color", "red");
//         }
//         else{
//                 $(`#a${i}`).css("background-color", "green");
//                 $(`#b${i}`).css("background-color", "green");
//             }
//     }

// }


export const colorKeyBits = (alice_key, bob_key) => {
    // find positions of wrong bits first
    const wrong_bits_index = verifyKey(alice_key, bob_key);
    
    // Create array of all possible indices
    const allIndices = Array.from({ length: alice_key.length }, (_, i) => i);
    console.log(allIndices);

    // Randomly select 25 indices
    const selectedIndices = [];
    while (selectedIndices.length < 25 && allIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * allIndices.length);
        selectedIndices.push(allIndices[randomIndex]);
        allIndices.splice(randomIndex, 1);  // Remove selected index from pool
    }
    
    // Color only the selected indices
    selectedIndices.forEach(i => {
        if (wrong_bits_index.includes(i)) {
            $(`#a${i}`).css("background-color", "red");
            $(`#b${i}`).css("background-color", "red");
        } else {
            $(`#a${i}`).css("background-color", "green");
            $(`#b${i}`).css("background-color", "green");
        }
    });
}

// valid if no error found; Invalid otherwise.
export const isValidKey = (alice_key, bob_key)=> (verifyKey(alice_key, bob_key).length > 0 ? true : false);
