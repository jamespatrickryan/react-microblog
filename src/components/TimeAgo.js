import { useState, useEffect } from 'react';

const secondsTable = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
];
const rtf = new Intl.RelativeTimeFormat(undefined, {numeric: 'auto'});

function getTimeAgo(date) {
  const seconds = Math.round((date.getTime() - new Date().getTime()) / 1000);
  const absolute = Math.abs(seconds);
  let bestUnit, bestTime, bestInterval;

  for (let [unit, unitSeconds] of secondsTable) {
    if (absolute >= unitSeconds) {
      bestUnit = unit;
      bestTime = Math.round(seconds / unitSeconds);
      bestInterval = unitSeconds / 2;
      break;
    }
  }

  if (!bestUnit) {
    bestUnit = 'second';
    bestTime = parseInt(seconds / 10) * 10;
    bestInterval = 10;
  }

  return [bestTime, bestUnit, bestInterval];
}

export default function TimeAgo({ isoDate }) {
  const date = new Date(Date.parse(isoDate));
  const [time, unit, interval] = getTimeAgo(date);
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const clock = setInterval(
      () => setUpdate(update => update + 1),
      interval * 1000
    );
    return () => clearInterval(clock);
  }, [interval]);

  return (
    <span title={date.toString()}>{rtf.format(time, unit)}</span>
  );
}
