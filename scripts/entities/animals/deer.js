import Entity from "../entityClass.js";

class Deer extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 60, ['default_entity', 'deer'], pushOnFrame, false);
    this.player = player;
  }
};

export default Deer;