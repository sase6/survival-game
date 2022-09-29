import Entity from "../entityClass.js";
import $ from '../../helper/dom.js';

class Grass extends Entity {
  constructor(x, y, pushOnFrame, killOnFrame, incrementEntity, player, classname="grass") {
    super(x, y, 100, classname, pushOnFrame, killOnFrame, incrementEntity, false, $.get('#plane-1'));
    this.player = player;
  }
};

export default Grass;