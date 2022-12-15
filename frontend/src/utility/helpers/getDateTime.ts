export const getDateTime = (d: Date | number) => {
  let date = new Date(d);

  let [time, APM] =  date.toLocaleTimeString().split(' ');
  let [h, m] = time.split(':');



  return date.toLocaleDateString() 
    + ' ' 
    + `${h}:${m}${APM.toLowerCase()}`
}