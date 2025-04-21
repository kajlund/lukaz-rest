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

export function parseSort(sortStr) {
  const sortObj = {};
  if (!sortStr) return sortObj;

  const fldArr = sortStr.split(",");
  fldArr.forEach((fld) => {
    if (fld.indexOf("-") > -1) {
      sortObj[fld.slice(1)] = "desc";
    } else {
      sortObj[fld] = "asc";
    }
  });
  return sortObj;
}
