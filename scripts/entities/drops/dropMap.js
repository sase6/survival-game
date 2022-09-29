import random from "../../helper/randomizer.js";

export default {
  1: {
    id: 1,
    name: 'spruce-log',
    class: 'spruce-log-drop',
    backgroundImage: 'url(/public/assets/tree/spruce-log-drop.png)',
    fallHeight: () => (128 - (random.number(16, 0))),
    maxStack: 10
  }
};