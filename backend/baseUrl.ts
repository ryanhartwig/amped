export const getEnv = (production: any, development: any): any => {
  if (process.env.NODE_ENV === 'production') {
    return typeof production === 'function'
      ? production()
      : production;
  } else {
    return typeof development === 'function'
      ? development()
      : development;
  }
}

export const baseUrl = getEnv('https://amped.herokuapp.com/api', 'http://192.168.2.27:8000/api');