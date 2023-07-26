import db from '../database/cloudModel.js';
import bcrypt from 'bcryptjs';

const userController = {
  createUser: async (req, res, next) => {
    if (res.locals.duplicated) return next();
    try {
      const { displayName, user, pass, currentLocation, profilePicture } = req.body;
      // hash password
      const hashedPassword = await bcrypt.hash(pass, 10);
      // remove original password after hash it
      delete req.body.pass;
      const createUser =
        'INSERT INTO users (display_name, user1, hashed_password, current_location, profilepic) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
      const userDetails = [displayName, user, hashedPassword, currentLocation, profilePicture];
      const createdUser = await db
        .query(createUser, userDetails)
        .catch((err) => {
          console.error('Error executing query:', err);
          throw err;
        });
      // declare const var uniqueId and assign the primary key that db generated as a value
      const uniqueId = createdUser.rows[0].id;
      console.log('Generated unique Id from database => ', uniqueId);
      // sets cookie with cookieID key and uniqueId as it's value
      res.cookie('cookieID', uniqueId);
      // data that will passed to the frontend
      res.locals.user = {
        username: user,
        displayName: displayName,
        currentLocation: currentLocation,
        id: uniqueId,
        profilePicture: profilePicture
      };
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
    const { user, pass } = req.body;
    // using username we create a query string to grab that user
    const getUser = 'SELECT * FROM users WHERE user1=$1;';
    // using bcrypt we check if client's password input matches the password of that username in the db; we then add to locals accordingly
    db.query(getUser, [user])
      .then(async (data) => {
        if (!Array.isArray(data.rows) || data.rows.length === 0) {
          res.locals.user = { err: 'Unable to verify user credentials.' };
          return next();
        }
        const match = await bcrypt.compare(pass, data.rows[0].hashed_password);
        console.log(pass)
        if (!match) {
          res.locals.user = { err: 'Unable to verify user credentials.' };
          return next();
        }

        const verifiedUser = data.rows[0];
        // sets cookie with cookieID key and uniqueId as it's value
        res.cookie('cookieID', data.rows[0].id);
        res.locals.user = {
          username: verifiedUser.user1,
          displayName: verifiedUser.display_name,
          currentLocation: verifiedUser.current_location,
          id: data.rows[0].id,
          profilePicture: data.rows[0].profilepic
        };
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
    res.clearCookie('cookieID');
    res.locals.loggedOut = true;
    return next();
  },
};

export default userController;
