/** Gets the current process.env.NODE_ENV and returns the appropriate argument 
 * 
 * Will invoke passed functions and return their values. 
 * 
 * @param production function result or value to be returned when node_env === production
 * @param development function result or value to be returned when node_env !== production
 * @returns respective function result or provided value for the node_env
 */
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