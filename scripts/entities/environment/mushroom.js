import Entity from "../entityClass.js";
import $ from '../../helper/dom.js';

class Mushroom extends Entity {
  constructor(x, y, pushOnFrame, killOnFrame, incrementEntity, player) {
    super(x, y, 100, 'purple-mushroom', pushOnFrame, killOnFrame, incrementEntity, false, $.get('#plane-1'));
    this.player = player;
  }
};

export default Mushroom;