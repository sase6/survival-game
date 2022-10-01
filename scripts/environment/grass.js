import Entity from "../entity/entity.js";
import random from "../helper/randomizer.js";
import $ from "../helper/dom.js";

class Grass extends Entity {
  constructor(x, y, spawn) {
    const className = random.valInArray(["grass", "grass-variant-1"]);
    super(spawn, className, x, y, false, 1, $.get("#before-all-layer"));
  }
};

export default Grass;