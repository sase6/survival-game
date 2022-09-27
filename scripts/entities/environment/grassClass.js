import Entity from "../entityClass.js";

class Grass extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 60, 'default-grass', pushOnFrame, false);
    this.player = player;
  }
};

export default Grass;