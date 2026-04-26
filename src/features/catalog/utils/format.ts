export function formatTime(time: number) {
  const date = new Date(time);

  return [
    date.getUTCHours(),
    ('0' + date.getUTCMinutes()).slice(-2),
    ('0' + date.getUTCSeconds()).slice(-2),
  ].join(':');
}
