const ratingRouter = require("express").Router();
const { sessionChecker } = require("../utils/middleware");
const {
  getRatingForRecipy,
  sendRating,
  updateRating,
  deleteRating,
} = require('../controllers/rating');

ratingRouter
  .route("/:id")
    .get( sessionChecker, getRatingForRecipy )
    .post( sessionChecker, sendRating )
    .put( sessionChecker, updateRating)
    .delete( sessionChecker, deleteRating);

module.exports = ratingRouter;