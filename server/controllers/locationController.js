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
          log: `Error in locationController: ${err}`,
          message: {
            err: 'An error occurred getting locations in database. See locationController',
          },
        });
      });
  },

  createLocation: (req, res, next) => {
    const { location, photo_url, tag } = req.body;
    // destructuring the cookieID from req.cookies
    const usersPK = req.cookies.cookieID;

    const queryString =
      'INSERT INTO locations (location_name, location_url, tag, user_id) VALUES ($1, $2, $3, $4) RETURNING *;';
    const userDetails = [location, photo_url, tag, usersPK];

    db.query(queryString, userDetails)
      .then(async (data) => {
        console.log(data);
        res.locals.locationsList = data.rows[0];
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in locationController: ${err}`,
          message: {
            err: 'An error occurred when creating location data in database. See locationController',
          },
        });
      });
  },
};

export default locationController;
