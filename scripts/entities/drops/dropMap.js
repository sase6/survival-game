import random from "../../helper/randomizer.js";

const defaultFallHeight = () => 32 - (random.number(16));

export default {
  1: {
    id: 1,
    name: "spruce-log",
    class: "spruce-log-drop",
    backgroundImage: "url(/public/assets/tree/spruce-log-drop.png)",
    fallHeight: () => (128 - (random.number(16, 0))),
    maxStack: 10,
    placeable: true,
    block: {
      gridType: 2,
      class: "spruce-log-block",
      hp: 100
    }
  },

  2: {
    id: 2,
    name: "spruce-stick",
    class: "stick",
    backgroundImage: "url(/public/assets/environment/stick.png)",
    fallHeight: defaultFallHeight,
    maxStack: 10,
    placeable: true,
    block: {
      gridType: 2,
      class: "stick",
      hp: 1,
    }
  },

  3: {
    id: 3,
    name: "stone-chunk",
    class: "stone-chunk",
    backgroundImage: "url(/public/assets/environment/stone-chunk.png)",
    fallHeight: defaultFallHeight,
    maxStack: 10,
    placeable: false,
  }
};