import { Sprite, Text, Assets } from "pixi.js";
let alice, bob, eve, aliceText, bobText, eveText;

export async function initSpritesAsync() {
  ({ alice, bob, eve, aliceText, bobText, eveText } = await initSprites());
}

// Export variables
export { alice, bob, eve, aliceText, bobText, eveText };

async function initSprites() {
  await preload();
  return {
    alice: Sprite.from("alice"),
    bob: Sprite.from("bob"),
    eve: Sprite.from("eve"),
    aliceText: new Text({ text: "Alice" }),
    bobText: new Text({ text: "Bob" }),
    eveText: new Text({ text: "Eve" }),
  };
}

async function preload() {
  // Create an array of asset data to load.
  const assets = [
    { alias: "ket0", src: "./img/ket0.svg" },
    { alias: "ket1", src: "./img/ket1.svg" },
    { alias: "ket+", src: "./img/ket+.svg" },
    { alias: "ket-", src: "./img/ket-.svg" },
    { alias: "X", src: "./img/x.svg" },
    { alias: "Z", src: "./img/z.svg" },
    { alias: "alice", src: "./img/alice.svg" },
    { alias: "bob", src: "./img/bob.svg" },
    { alias: "eve", src: "./img/eve.png" },
  ];

  // Load the assets defined above.
  await Assets.load(assets);
}
