import $ from '../helper/dom.js';
const emptyFunc = () => {};

class Entity {
  constructor(x=0, y=0, hp=100, classes=[], pushOnFrame=emptyFunc, parent=$.get('#app')) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.health = hp;
    this.pushOnFrame = pushOnFrame;

    this.build(classes);
  }

  build(classes) {
    this.node = $.make(classes);
    $.append(this.node, this.parent);
    this.pushOnFrame(() => this.renderPosition());
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
};

export default Entity;