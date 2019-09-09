const colors = {
  DEBIT: ['#770419', '#bf2e48', '#f52b50'],
  CREDIT: ['#008000', '#0c5a0c', '#013301'],
  NEUTRAL: 'lightgray'
};

export default function getColor({ value, min, max }) {
  let colorIndex;
  let stop;
  let limit;
  if (value > 0) {
    limit = colors.CREDIT.length;
    stop = Math.floor(max / limit);
    colorIndex = Math.floor(value / stop);
    return colors.CREDIT[colorIndex];
  } else if (value < 0) {
    limit = colors.CREDIT.length;
    stop = Math.floor(min / limit);
    colorIndex = Math.floor(value / stop);
    return colors.DEBIT[colorIndex];
  }
  return colors.NEUTRAL;
}
