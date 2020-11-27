const toArray = (data) => {
  return data.trim().split("\n").map(toScalar);
};

const toScalar = (data) => {
  data = data.trim();
  var n = parseFloat(data);
  return isNaN(n) ? data : n;
};

const toObject = (data, keys) => {
  return toArray(data).reduce((acc, cur, idx) => {
    acc[keys[idx]] = cur;
    return acc;
  }, {});
};

module.exports = {
  obj: toObject,
  array: toArray,
  scalar: toScalar,
};
