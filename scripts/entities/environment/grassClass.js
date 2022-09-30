import Entity from "../entityClass.js";
import $ from '../../helper/dom.js';

class Grass extends Entity {
  constructor(x, y, spawn, classname="grass") {
    // super(spawn, classname, x, y, false);// 100, $.get('#before-all'));
    super(spawn, classname, x, y, false, 100, $.get('#before-all-layer'));
  }
};

export default Grass;