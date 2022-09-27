import Entity from '../entityClass.js';

class Tree extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 300, 'default-tree', pushOnFrame, false);
    this.player = player;
    this.node.style.zIndex = `${parseInt(this.y + 128)}`;
    
    //Meta
    this.interactRange = 48;
    this.shakeAnimationTime = 120;
    this.fallTime = 2000;

    this.initEvents();
  }

  initEvents() {
    this.node.addEventListener("click", () => {
      if (this.health <= 0) return;
      this.health -= this.player.lumberDamage;
      const isDead = this.health <= 0;
      const [playerOriginX, playerOriginY] = this.player.getOrigin();
      const [treeOriginX, treeOriginY] = this.getOrigin();
      const isCloseOnX = Math.abs(playerOriginX - treeOriginX) <= this.interactRange;
      const isCloseOnY = Math.abs(playerOriginY - treeOriginY) <= this.interactRange;

      if (isCloseOnX && isCloseOnY) {
        this.node.style.animation = `${isDead? this.fallTime : this.shakeAnimationTime}ms tree-${isDead? "fall" : "shake"}-${playerOriginX > treeOriginX? "left": "right"}`;
        setTimeout(() => {
          this.node.style.animation = "";
          if (isDead) this.onDeath();
        }, (isDead? this.fallTime : this.shakeAnimationTime));
        
      } else return;
    });
  }

  onDeath() {
    // Drop items 
    this.node.remove();
  }
}

export default Tree;