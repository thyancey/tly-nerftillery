// https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding/32605063#32605063
export default function roundTo(n, digits) {
  if (digits === undefined) {
    digits = 0;
  }

  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return Math.round(n) / multiplicator;
}