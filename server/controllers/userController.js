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

  usernameCheck: (req, res, next) => {
    const { user } = req.body;
    // SQL query to check if username already exists in datebase, not unique.
    console.log('username -> ab to query', user);
    const checkUsernameExists = 'SELECT * FROM users WHERE user1=$1;';

    db.query(checkUsernameExists, [user])
      .then((data) => {
        // if row 0 or username already exists, throw error
        console.log('data.rows: ', data.rows);
        console.log('data.rows[0]: ', data.rows[0]);
        if (data.rows[0]) {
          res.locals.duplicated = { message: 'Username already exists.' };
          return next();
        } else {
          return next();
        }
      })
      .catch((err) => {
        return next({
          log: `Error in signupController usernameCheck: ${err}`,
          status: 409,
          message: {
            err: `An error occurred while checking if username exists. See signupController.usernameCheck., ${err.message}`,
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

};

export default userController;
