const c = (e) => {
  const o = e.length;
  for (let t = 0; t < o; t++) {
    let l = t;
    for (let n = t + 1; n < o; n++)
      e[t] > e[n] && (l = n);
    [e[t], e[l]] = [e[l], e[t]];
  }
  return e;
};
export {
  c as selectSort
};
