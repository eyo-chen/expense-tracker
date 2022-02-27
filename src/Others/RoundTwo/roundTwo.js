function roundTwo(value) {
  return Number(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
}

export default roundTwo;
