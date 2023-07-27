import db from '../database/cloudModel.js';
//UPDATE Customers
//SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
//WHERE CustomerID = 1;
const userInfoController = {
  updateDisplayName: async (req, res, next) => {
    const { displayName, id } = req.body;
    const queryString =
      'UPDATE users SET display_name =$1 WHERE id=$2 RETURNING *';
    db.query(queryString, [displayName, id])
      .then(async (data) => {      
        res.locals.updatedInfo = data
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userInfoController: ${err}`,
          message: {
            err: 'An error occurred while editing display_name. See userInfoController',
          },
        });
      });
  },
  updateCurrentLocation: async (req, res, next) => {
    const { current_location, id } = req.body;
    // destructuring the cookieID from req.cookies

    const queryString =
      'UPDATE users SET current_location=$1 WHERE id=$2 RETURNING *';

    db.query(queryString, [current_location, id])
      .then((data) => {
        console.log(data.rows);
        res.locals.updatedInfo = data.rows[0].current_location;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userInfoController Controller ${err}`,
          message: {
            err: 'An error occurred while editting current location.',
          },
        });
      });
  },
};

export default userInfoController;
