import Entity from "../entityClass.js";

class Mushroom extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 120, 'purple-mushroom', pushOnFrame, false);
    this.player = player;
  }
};

export default Mushroom;