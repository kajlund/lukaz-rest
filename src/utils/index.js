export function secToHHMMSS(sec) {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const remainingSeconds = sec % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function secToMMSS(sec) {
  const minutes = Math.floor((sec % 3600) / 60);
  const remainingSeconds = sec % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function mToKM(m) {
  return (m / 1000).toFixed(2);
}
