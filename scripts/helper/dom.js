const get = (query) => {
  if (query[0] === '.' || query[0] === '#') {
    return document.querySelector(query);
  } else {
    return document.querySelector(`.${query}`);
  }
};

const append = (child, parent) => {
  try {
    parent.appendChild(child);
    return true;
  } catch {
    return false;
  }
};

const make = (classes=[], type='div', id=null) => {
  let node = document.createElement(type);
  (Array.isArray(classes)? classes : [classes]).forEach(className => {
    node.classList.add(className);
  });
  if (id) node.id = id;
  return node;
};

const appendNew = (className, parent, type="div") => {
  const el = make(className, type);
  append(el, parent);
  return el;
};

const css = (element, cssPropArr) => {
  cssPropArr.forEach(propArr => {
    const prop = propArr[0];
    const val = propArr[1];
    const unit = propArr[2] || "";

    try {
      element.style[prop] = `${val}${unit}`;
      return true;
    } catch {
      return false;
    }
  });
};

export default {
  get, make, append, css, appendNew
};