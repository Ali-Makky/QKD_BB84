// classical random bit
export const getRandBit = () => {
  return getRandomElement([0, 1]);
};


export const getRandPolarizer = () => {
  return getRandomElement(["Z", "X"]);
};


function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
