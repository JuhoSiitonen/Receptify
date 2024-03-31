const recipyRouter = require("express").Router();
const { sessionChecker } = require("../utils/middleware");
const {
  getRecipies,
  getFavorites,
  getSubscribed,
  addRecipy,
  deleteRecipy,
  updateRecipy,
  findRecipy,
  getUsersRecipies,
  getSingleRecipy
} = require('../controllers/recipies')

recipyRouter
  .route("/")
    .get( sessionChecker, getRecipies )
    .post( sessionChecker, addRecipy);

recipyRouter.get("/favorites", sessionChecker, getFavorites);

recipyRouter.get("/subscriptions", sessionChecker, getSubscribed);

recipyRouter
  .route("/:id")
    .get( sessionChecker, getSingleRecipy)
    .delete( sessionChecker, deleteRecipy)
    .put( sessionChecker, updateRecipy);

recipyRouter.post("/search", sessionChecker, findRecipy);

recipyRouter.get("/user", sessionChecker, getUsersRecipies);

module.exports = recipyRouter