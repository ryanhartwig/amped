import { User as DB_User } from './types/user';

export declare global {
  namespace Express {
    // Merge Express.User declaration with existing User interface
    interface User extends DB_User {}
    
    interface Request {
      user?: DB_User,
    }
  }
}