const number = (max=100, min=0) => {
  return Math.random() * (max - min) + min;
};

const valInArray = (arrOfVals=[]) => {
  const max = arrOfVals.length - 1;
  let index = Math.round(Math.random() * max);
  return arrOfVals[index];
};

export default {
  number, valInArray,
};