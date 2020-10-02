const express = require('express');
const app = express();
const rouRoute = express.Router();

let RouteModel = require('../models/routes');

// Add route
rouRoute.route('/create-route').post((req, res, next) => {
  RouteModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all routes
rouRoute.route('/').get((req, res) => {
  RouteModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single route
rouRoute.route('/get-route/:id').get((req, res) => {
  RouteModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update route
rouRoute.route('/update-route/:id').put((req, res, next) => {
  RouteModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Route successfully updated!')
    }
  })
})

// Delete route
rouRoute.route('/delete-route/:id').delete((req, res, next) => {
  RouteModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = rouRoute;