export declare global {
  namespace Express {
    // Merge User declaration
    interface User {
      id: string,
      name: string,
      email: string,
      weekly_target: string,
    }
  }
}