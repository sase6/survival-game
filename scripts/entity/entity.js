import $ from '../helper/dom.js';
const defaultHp = 100;
const defaultParent = $.get("#ui-plane");

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
    
    if (renderEveryFrame) this.spawn.pushOnFrame(() => this.renderPosition());
    else this.renderPosition();
  }

  renderPosition() {
    $.css(this.node, [
      ["top", this.y, "px"],
      ["left", this.x, "px"],
      ["zIndex", this.getOrigin(0)[1], "px"],
    ]);
  }

  getOrigin(offsetBottom=16, y) {
    const selfRect = this.node.getBoundingClientRect();
    const originX = ((selfRect.right - selfRect.left) / 2) + this.x;
    const originY = (selfRect.bottom - selfRect.top) + (y || this.y) - offsetBottom;
    return [originX, originY];
  }

  initClickListener() {
    if (!this.onClick) return;
    const [originX, originY] = this.getOrigin();
    const [playerOriginX, playerOriginY] = this.player.getOrigin();
    const isHorizontallyClose = Math.abs(originX - playerOriginX) < this.player.interactRange;
    const isVerticallyClose = Math.abs(originY - playerOriginY) < this.player.interactRange;
    if (!isHorizontallyClose || !isVerticallyClose) return;
    this.onClick(true); // If player is close or not
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