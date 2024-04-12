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
  getSingleRecipy,
  getIngredients
} = require('../controllers/recipies')

recipyRouter
  .route("/")
    .get( sessionChecker, getRecipies )
    .post( sessionChecker, addRecipy);

recipyRouter.get("/favorites", sessionChecker, getFavorites);

recipyRouter.get("/subscriptions", sessionChecker, getSubscribed);

recipyRouter.post("/search", sessionChecker, findRecipy);

recipyRouter.get("/user", sessionChecker, getUsersRecipies);

recipyRouter.get("/ingredients", sessionChecker, getIngredients);

recipyRouter
  .route("/:id")
    .get( sessionChecker, getSingleRecipy)
    .delete( sessionChecker, deleteRecipy)
    .put( sessionChecker, updateRecipy);

module.exports = recipyRouter