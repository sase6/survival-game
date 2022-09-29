import Entity from "../entityClass.js";
import $ from '../../helper/dom.js';

class Mushroom extends Entity {
  constructor(x, y, spawn) {
    super(spawn, 'purple-mushroom', x, y, false);
  }
};

export default Mushroom;