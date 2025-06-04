import gravatar from "gravatar";

export function getGravatar(email, size = 50) {
  return gravatar.url(email, { s: size });
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
