import Entity from "../entityClass.js";

class Stone extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 120, 'stone', pushOnFrame, false);
    this.player = player;
  }
};

export default Stone;