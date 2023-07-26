import db from '../database/cloudModel.js';

const locationController = {
  getLocation: (req, res, next) => {
    const { tag } = req.body;
    // destructuring the cookieID from req.cookies
    const usersPK = req.cookies.cookieID;
    let queryString;
    let userDetails;
    if (tag === 'all') {
      queryString = 'SELECT * FROM "locations" WHERE user_id=$1;';
      userDetails = [usersPK];
    } else {
      queryString = 'SELECT * FROM "locations" WHERE user_id=$1 AND tag=$2;';
      userDetails = [usersPK, tag];
    }
    db.query(queryString, userDetails)
      .then(async (data) => {
        console.log(data.rows);
        res.locals.locations = data.rows;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userController newUser: ${err}`,
          message: {
            err: 'An error occurred getting locations in database. See locationController',
          },
        });
      });
  },
};

export default locationController;
