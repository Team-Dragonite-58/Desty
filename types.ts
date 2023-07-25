import { Request, Response, NextFunction, RequestHandler } from 'express';

// ==========================================================
// Server-Side Typing
// ==========================================================

export type ServerError = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};

export type SqlQuery = {
  query: (text: string, params?: any | any[], callback?: any) => void | any;
};

// ==========================================================
// MiddleWare Function Type
// ==========================================================
export type MiddleWareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export interface BcryptController {
  hashPassword: MiddleWareFunction;
  hashNewPassword: MiddleWareFunction;
  hashCookie: MiddleWareFunction;
}

export interface SignupController {
  usernameCheck: MiddleWareFunction;
  passwordCheck: MiddleWareFunction;
}

// ==============================================
// USER TYPES
// ==============================================
interface UserBase {
  username: string;
  password: string;
}

interface User extends UserBase {
  username: string;
  password: string;
}

export interface UserInfo extends User {
  _id: string;
  token: string;
}

// ==========================================================
// Controller Type
// ==========================================================
export interface UserController {
  /**
   * @description  Performs SQL query to insert a new user, hashing the password before it does, into "users" table and then RETURNS those values.
   * @note Extract isername, password, and role ID from req.body
   */
  createUser: MiddleWareFunction;

  /**
   * @description  Gets all users; returned in an array
   * @note Sorts them by ASCENDING order
   */
  getAllUsers: MiddleWareFunction;

  /**
   * @description  Gets a single user yser
   * @note Uses destructuring for _id from req.body
   */
  getOneUser: MiddleWareFunction;

  /**
   * @description  verifies username/password are correct and sends back that user info; otherwise sends an error message
   * @note Extract the username and password from req.body. Any errors get passed onto an error object.
   */
  verifyUser: MiddleWareFunction;
  
  /**
   * @description  adds a cookie to our user's browser to signify they are logged in
   */
  addCookie: MiddleWareFunction;

  /**
   * @description  checks if user has a valid cookie
   */
  checkCookie: MiddleWareFunction;

  /**
   * @description  removes our user's cookie
   */
  removeCookie: MiddleWareFunction;
};