import Entity from "../entityClass.js";

class Grass extends Entity {
  constructor(x, y, pushOnFrame, player, className=null) {
    super(x, y, 60, (className || 'default-grass'), pushOnFrame, false);
    this.player = player;
  }
};

export default Grass;