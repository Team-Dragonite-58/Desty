import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';

/**
 * @description Contains middleware that creates new user in database, gets all users from database verifies if user exists before sending back user data to login component
 * v12.0 implemented cookies for user sessions and deleted all system admin implementaion since it was nonfunctional
 */

const userController = {
  createUser: async (
    req,
    res,
    next
  )=> {
    try {
      const { displayName, user, pass }=
        req.body;
      // hash password
      const hashedPassword = await bcrypt.hash(pass, 10);

      const createUser =
        'INSERT INTO users (display_name, username, hashed_password) VALUES ($1, $2, $3) RETURNING *;';
      const userDetails = [displayName, user, hashedPassword];
      const createdUser = await db.query(createUser, userDetails);
      res.locals.user = createdUser.rows[0];
      return next();
    } catch (err) {
      return next({
        log: `Error in userController newUser: ${err}`,
        message: {
          err: 'An error occurred creating new user in database. See userController.newUser.',
        },
      });
    }
  },

  getAllUsers: (req, res, next) => {
    if ('error' in res.locals) {
      return next();
    } else {
      const allUsers = 'SELECT * FROM users ORDER BY username ASC;';
      db.query(allUsers)
        .then((response) => {
          res.locals.users = response.rows;
          return next();
        })
        .catch((err) => {
          return next({
            log: `Error in userController getAllUsers: ${err}`,
            message: {
              err: 'An error occurred retrieving all users from database. See userController.getAllUsers.',
            },
          });
        });
    }
  },

  getOneUser: (req, res, next) => {
    const { _id } = req.body;
    const oneUser = 'SELECT * FROM users WHERE _id = $1;';
    db.query(oneUser, [_id])
      .then((response) => {
        res.locals.users = response.rows;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userController getOneUser: ${err}`,
          message: {
            err: 'An error occurred retrieving user from database. See userController.getOneUser.',
          },
        });
      });
  },

  verifyUser: (req, res, next) => {
    const { username, password } = req.body;
    // using username we create a query string to grab that user
    const getUser = 'SELECT * FROM users WHERE username=$1;';
    // using bcrypt we check if client's password input matches the password of that username in the db; we then add to locals accordingly
    db.query(getUser, [username])
      .then(async (data) => {
        const match = await bcrypt.compare(password, data.rows[0].password);
        if (!data.rows[0] || !match) {
          return next({
            log: "Error in userController's verifyUser method",
            status: 400,
            message: {
              err: 'Unable to verify user credentials.',
            },
          });
        }
        const verifiedUser = data.rows[0];
        res.locals.user = verifiedUser;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userController checkUserExists: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.checkUserExists.',
          },
        });
      });
  },

  // adding cookie
  addCookie: (req, res, next) => {
    res.cookie('loggedIn', true);
    return next();
  },

  // verify cookie on refresh
  checkCookie: (req, res, next) => {
    if (req.cookies.loggedIn) res.locals.signedIn = true;
    else res.locals.signedIn = false;
    return next();
  },

  // remove cookie on logout
  removeCookie: (req, res, next) => {
    res.clearCookie('loggedIn');
    res.locals.loggedOut = true;
    return next();
  },
};

export default userController;
