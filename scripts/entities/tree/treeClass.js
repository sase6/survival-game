import Entity from '../entityClass.js';

class Tree extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 300, 'default-tree', pushOnFrame, false);
    this.player = player;
    
    //Meta
    this.interactRange = 48;
    this.shakeAnimationTime = 120;

    this.initEvents();
  }

  initEvents() {
    this.node.addEventListener("click", () => {
      const [playerOriginX, playerOriginY] = this.player.getOrigin();
      const [treeOriginX, treeOriginY] = this.getOrigin();
      const isCloseOnX = Math.abs(playerOriginX - treeOriginX) <= this.interactRange;
      const isCloseOnY = Math.abs(playerOriginY - treeOriginY) <= this.interactRange;

      if (isCloseOnX && isCloseOnY) {
        this.node.style.animation = `${this.shakeAnimationTime}ms tree-shake-${playerOriginX > treeOriginX? "left": "right"}`;
        setTimeout(() => this.node.style.animation = "", this.shakeAnimationTime);
      } else return;
    });
  }
}

export default Tree;