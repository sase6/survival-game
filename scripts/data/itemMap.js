const defaultDropHeight = 32;
const defaultStackSize = 16;

export default {
  1: {
    name: "Stick",
    class: "Stick",
    background: "url(/public/assets/environment/stick.png)",
    maxStacks: defaultStackSize,
    isPlaceable: true,
    isConsumable: false,
    health: 1,
    gridType: 2,
    drop: {
      class: "stick",
      dropHeight: defaultDropHeight,
    },
    block: {
      class: "stick",
      gridType: 2,
      width: 32,
      height: 32,
      damageType: "lumberDamage"
    }
  },

  2: {
    name: "Stone Chunk",
    class: "stone-chunk",
    background: "url(/public/assets/environment/stone-chunk.png)",
    maxStacks: defaultStackSize,
    isPlaceable: false,
    isConsumable: false,
    drop: {
      class: "stone-chunk",
      dropHeight: defaultDropHeight
    }
  },

  3: {
    name: "Spruce Log",
    class: "spruce-log",
    background: "url(/public/assets/tree/spruce-log.png)",
    maxStacks: defaultStackSize,
    isPlaceable: false,
    isConsumable: false,
    drop: {
      class: "spruce-log",
      dropHeight: defaultDropHeight
    }
  },

  4: {
    name: "Stone Axe",
    class: "stone-axe",
    background: "url(/public/assets/tools/stone-axe.png)",
    maxStacks: 1,
    isPlaceable: false,
    isConsumable: false,
    isCraftable: true,
    craftingRecipe: {
      1: 2, // Stick
      2: 2  // Stone Chunk
    },
    effects: {
      lumberDamage: 100
    }
  }
};