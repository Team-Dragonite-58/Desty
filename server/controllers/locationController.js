import db from '../database/cloudModel.js';

const locationController = {
  getLocation: (req, res, next) => {
    const { tag, id } = req.body;
    // destructuring the cookieID from req.cookies
    let queryString;
    let userDetails;
    if (tag === 'All') {
      queryString = 'SELECT * FROM "locations" WHERE user_id=$1;';
      userDetails = [id];
    } else {
      queryString = 'SELECT * FROM "locations" WHERE user_id=$1 AND tag=$2;';
      userDetails = [id, tag];
    }
    db.query(queryString, userDetails)
      .then(async (data) => {
        // console.log('data.rows', data.rows);
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
  deleteLocation: (req, res, next)=>{
    const { location_id } = req.body;
    // console.log('req.body', req.body);
    let queryText;
      queryText = {
        text: 'DELETE FROM locations WHERE location_id=$1',
        values: [location_id]
      }
    db.query(queryText)
      .then(async (data)=>{
        next()
      })
      .catch((err) => {
        return next({
          log: `Error in locationController: ${err}`,
          message: {
            err: 'An error occurred when deleting location data in database. See locationController',
          },
        });
      });

  },

  createLocation: (req, res, next) => {
    const { location, photo_url, tag, id } = req.body;

    const queryString =
      'INSERT INTO locations (location_name, location_url, tag, user_id) VALUES ($1, $2, $3, $4) RETURNING *;';
    const userDetails = [location, photo_url, tag, id];

    db.query(queryString, userDetails)
      .then(async (data) => {
        // console.log(data);
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
