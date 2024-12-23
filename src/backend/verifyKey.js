/**
 * Checks the differences between Alice & Bob keys.
 *
 * @param {array} alice_key - bit-string [1,0,...,0].
 * @returns {array} constains the indxes for the wrong bits
 * */
 export const verifyKey = (alice_key, bob_key) => {
  const wrong_bits_index = []; // the positions of the errors
  for (let i = 0; i < alice_key.length; i++) {
    if (alice_key[i] != bob_key[i])
      // if mis-match between Alice-Bob keys
      wrong_bits_index.push(i);
  }
  return wrong_bits_index;
};

// valid if no error found; Invalid otherwise.
export const isValidKey = (alice_key, bob_key) =>
  verifyKey(alice_key, bob_key).length > 0 ? false : true;
