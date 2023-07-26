import db from '../database/cloudModel.js';

/**
 * @description Contains middleware that checks if username exists, if password meets requirements upon signup, and if the login form is missing a username or password
 */
const signupController = {
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

  // verify password meets requirements
  passwordCheck: (req, res, next) => {
    const { password } = req.body;
    if (!(password.length >= 6)) {
      return next({
        status: 400,
        message: 'Password length too short',
      });
    } else {
      return next();
    }
  },
};

export default signupController;
