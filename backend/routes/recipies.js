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

recipyRouter.get("/", getRecipies);

recipyRouter.get("/favorites", getFavorites);

recipyRouter.get("/subscriptions", sessionChecker, getSubscribed);

recipyRouter.post("/", sessionChecker, addRecipy);

recipyRouter.delete("/:id", sessionChecker, deleteRecipy);

recipyRouter.put("/:id", sessionChecker, updateRecipy);

recipyRouter.post("/search", findRecipy);

recipyRouter.get("/user", sessionChecker, getUsersRecipies);

recipyRouter.get("/:id", getSingleRecipy);

module.exports = recipyRouter