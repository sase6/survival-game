import Entity from "../entityClass.js";
import random from '../../helper/randomizer.js';
import $ from '../../helper/dom.js';

class WaterBody extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 0, 'water-body-container', pushOnFrame, false, $.get('#plane1'));
    this.player = player;

    // Meta
    this.xNumOfTiles = random.number(15, 3);
    this.yNumOfTiles = random.number(10, 3);
    this.matrix = this.getMatrix();
    this.populateMatrix();
    this.createWaterNodes();
  };

  getMatrix() {
    let matrix = [];
   
    for (let i = 0; i < this.xNumOfTiles; i++) {
      let row = [];
      for (let j = 0; j < this.yNumOfTiles; j++) {
        row.push(0);
      }
      matrix.push(row);
    }

    return matrix;
  }

  populateMatrix() {
    const startRow = parseInt(this.xNumOfTiles / 2);
    const startCol = parseInt(this.yNumOfTiles / 2);

    const fill = (row=startRow, col=startCol) => {
      this.matrix[row][col] = 1;

      // Spread to other directions
      if (random.percent(50) && (row - 1 > -1) && this.matrix[row - 1][col] !== 1) fill(row - 1, col);
      if (random.percent(50) && (row + 1 <= this.xNumOfTiles) && this.matrix[row + 1][col] !== 1) fill(row + 1, col);
      if (random.percent(50) && (col - 1 > -1) && this.matrix[row][col - 1] !== 1) fill(row, col - 1);
      if (random.percent(50) && (col + 1 <= this.yNumOfTiles) && this.matrix[row][col + 1] !== 1) fill(row, col + 1);
      return this.matrix;
    };

    return fill();
  }

  createWaterNodes() {
    this.matrix.forEach((row, i) => {
      row.forEach((node, j) => {
        if (node === 1) {
          new WaterNode(this.x + (32 * j), this.y + (32 * i), this.pushOnFrame, this.player);
        }
      });
    });
  };
};

class WaterNode extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 0, 'water-node', pushOnFrame, false);
    this.player = player;
  }
};

export default WaterBody;