export const getDuration = (n: number) => {
  let h = 0, m = 0, s = 0;

  for(;n >= 3600; n -= 3600) {
    h++;
  }
  for(;n >= 60; n -= 60) {
    m++;
  }
  if (n) s = n;

  const [hr, mn, sc] = [
    h ? `${h}h` : '',
    m ? ` ${m}m` : '',
    s ? ` ${s}s` : '',
  ]

  return hr + mn + sc;
}