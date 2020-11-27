const toArray = (data) => {
  return data.trim().split("\n").map(toScalar);
};

const toScalar = (data) => {
  data = data.trim();
  var n = parseFloat(data);
  return isNaN(n) ? data : n;
};

module.exports = {
  array: toArray,
  scalar: toScalar,
};
