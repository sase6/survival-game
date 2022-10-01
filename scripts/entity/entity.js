import $ from '../helper/dom.js';
const defaultHp = 100;
const defaultParent = $.get("#plane-1");

class Entity {
  constructor(spawn, classes, x=0, y=0, renderEveryFrame=false, hp=defaultHp, parent=defaultParent) {
    this.health = hp;
    this.x = x;
    this.y = y;
    this.isDead = false;
    this.spawn = spawn;
    this.player = this.spawn.player;
    this.entityId = `Entity-${spawn.incrementEntity()}`;

    this.build(classes, parent, renderEveryFrame);
    this.initClickListener();
  }

  build(classes, parent, renderEveryFrame) {
    this.node = $.make(classes);
    $.append(this.node, parent);
    
    if (renderEveryFrame) this.spawn.pushOnFrame(this.entityId, () => this.renderPosition());
    else this.renderPosition();
  }

  renderPosition() {
    $.css(this.node, [
      ["top", this.y, "px"],
      ["left", this.x, "px"],
      ["zIndex", parseInt(this.getOrigin(0)[1])],
    ]);
  }

  getOrigin(offsetBottom=16, y) {
    const selfRect = this.node.getBoundingClientRect();
    const originX = ((selfRect.right - selfRect.left) / 2) + this.x;
    const originY = (selfRect.bottom - selfRect.top) + (y || this.y) - offsetBottom;
    return [originX, originY];
  }

  initClickListener() {
    this.node.addEventListener("click", () => {
      if (!this.onClick) return;
      const [originX, originY] = this.getOrigin();
      const [playerOriginX, playerOriginY] = this.player.getOrigin();
      const xDistance = Math.abs(originX - playerOriginX);
      const yDistance = Math.abs(originY - playerOriginY);
      const isHorizontallyClose = xDistance < this.player.interactRange;
      const isVerticallyClose = yDistance < this.player.interactRange;
      if (!isHorizontallyClose || !isVerticallyClose) return;
      this.onClick(true, xDistance, yDistance); // If player is close or not
    });
  }

  animate(name, duration, extension="") {
    if (this.inAnimation) return;
    const animationName = name || this.onClickAnimationName || "";
    const animationDuration = duration || this.animationDuration || "";
    this.node.style.animation = `${animationDuration}ms ${animationName} ${extension}`;
    this.inAnimation = true;
    
    setTimeout(() => {
      this.node.style.animation = "";
      this.inAnimation = false;
    }, animationDuration);
  }

  kill() {
    this.isDead = true;
    this.node.remove();
    this.spawn.killOnFrame(this.entityId);
    if (this.gridIndexes === undefined) return;
    this.gridIndexes.forEach(index => this.spawn.grid[index] = undefined);
  }
};

export default Entity;