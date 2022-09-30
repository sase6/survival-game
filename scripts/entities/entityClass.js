import $ from '../helper/dom.js';

class Entity {
    constructor(spawn, classes=[], x=0, y=0, renderOnFrame=false, hp=100, parent=$.get('#plane-1')) {
    this.x = x;
    this.y = y;
    this.health = hp;
    this.spawn = spawn;
    this.entityId = `entity-${spawn.incrementEntity()}`;
    this.player = this.spawn.player;
    this.isDead = false;

    this.build(classes, renderOnFrame, parent);
    this.initClickHandler();
  }

  build(classes, renderOnFrame, parent) {
    this.node = $.make(classes);
    $.append(this.node, parent);
    if (renderOnFrame) this.spawn.pushOnFrame(this.entityId, [() => this.renderPosition()]);
    else this.renderPosition();
  }

  renderPosition() {
    $.css(
      this.node,
      [
        ['top', this.y, 'px'],
        ['left', this.x, 'px'],
        ['zIndex', (this.getOrigin(0)[1]).toString(), '']
      ]
    );
  }

  getOrigin(offsetBottom=16, yPosition=null) {
    const selfRect = this.node.getBoundingClientRect();
    const originX = ((selfRect.right - selfRect.left) / 2) + this.x;
    const originY = (selfRect.bottom - selfRect.top) + (yPosition || this.y) - offsetBottom;
    return [originX, originY];
  }

  animate() {
    this.inAnimation = true;
    this.node.style.animation = "200ms waddleBlock";
    this.removeAnimation();
  }

  removeAnimation() {
    setTimeout(() => {
      if (!this.inAnimation) return;
      this.node.style.animation = "none";
      this.inAnimation = false;
    }, 200);
  }

  initClickHandler() {
    this.node.addEventListener("click", () => {
      if (this.player.inAction) return;
      if (this.takesPlayerDamage === true) {
        const originX = this.x + 16;
        const originY = this.y + 16;
        const [playerOriginX, playerOriginY] = this.player.getOrigin(16);
        const isNotHorizontallyClose = Math.abs(playerOriginX - originX) > this.player.interactRange;
        const isNotVerticallyClose = Math.abs(playerOriginY - originY) > this.player.interactRange;
        if (isNotHorizontallyClose || isNotVerticallyClose) return;
        
        const damage = this.player[this.playerDamageType];
        this.animate();
        if (this.onClick) this.onClick(damage);
      }
    });
  }

  kill() {
    this.isDead = true;
    this.node.remove();
    this.spawn.killOnFrame(this.entityId);
    if (this.gridIndexes !== undefined) {
      this.gridIndexes.forEach(index => {
        this.spawn.grid[index] = undefined;
      });
    }
  }
};

export default Entity;