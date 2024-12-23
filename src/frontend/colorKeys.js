import { verifyKey } from "../backend/verifyKey";

export const colorKeyBits = (alice_key, bob_key) => {
  // find positions of wrong bits first
  const wrong_bits_index = verifyKey(alice_key, bob_key);

  // Create array of all possible indices
  const allIndices = Array.from({ length: alice_key.length }, (_, i) => i);
  // console.log(allIndices);

  // Randomly select 25 indices
  const selectedIndices = [];
  while (selectedIndices.length < 25 && allIndices.length > 0) {
    const randomIndex = Math.floor(Math.random() * allIndices.length);
    selectedIndices.push(allIndices[randomIndex]);
    allIndices.splice(randomIndex, 1); // Remove selected index from pool
  }

  // Color only the selected indices
  selectedIndices.forEach((i) => {
    if (wrong_bits_index.includes(i)) {
      $(`#a${i}`).css("background-color", "red");
      $(`#b${i}`).css("background-color", "red");
    } else {
      $(`#a${i}`).css("background-color", "green");
      $(`#b${i}`).css("background-color", "green");
    }
  });
};
