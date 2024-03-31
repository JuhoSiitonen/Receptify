const ratingRouter = require("express").Router();
const { sessionChecker } = require("../utils/middleware");
const {
  getRatingForRecipy,
  sendRating,
  updateRating,
  deleteRating,
} = require('../controllers/rating');

ratingRouter.get("/:id", getRatingForRecipy);
  
ratingRouter.post("/:id", sessionChecker, sendRating);

ratingRouter.put("/:id", sessionChecker, updateRating);

ratingRouter.delete("/:id", sessionChecker, deleteRating);

module.exports = ratingRouter;