import Entity from "../entityClass.js";

class Grass extends Entity {
  constructor(x, y, spawn, classname="grass") {
    super(spawn, classname, x, y, false);
  }
};

export default Grass;