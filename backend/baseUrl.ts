export const getEnv = <T>(production: T, development: T): T => {
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

export const baseUrl = getEnv<string>('https://amped.herokuapp.com/api', 'http://localhost:8000/api');