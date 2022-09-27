import $ from '../helper/dom.js';
const emptyFunc = () => {};

class Entity {
  constructor(x=0, y=0, hp=100, classes=[], pushOnFrame=emptyFunc, renderOnFrame=true, parent=$.get('#app')) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.health = hp;
    this.pushOnFrame = pushOnFrame;

    this.build(classes, renderOnFrame);
  }

  build(classes, renderOnFrame) {
    this.node = $.make(classes);
    $.append(this.node, this.parent);
    if (renderOnFrame) this.pushOnFrame(() => this.renderPosition());
    else this.renderPosition();
  }

  renderPosition() {
    $.css(
      this.node,
      [
        ['top', this.y, 'px'],
        ['left', this.x, 'px'],
      ]
    );
  }

  getOrigin(yOffsetBottom=16) {
    const selfRect = this.node.getBoundingClientRect();
    const originX = ((selfRect.right - selfRect.left) / 2) + this.x;
    const originY = (selfRect.bottom - selfRect.top) + this.y - yOffsetBottom;
    return [originX, originY];
  }
};

export default Entity;