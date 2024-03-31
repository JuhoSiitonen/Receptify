const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription, Favorite } = require("../models");
const { EMAIL, EMAIL_PASSWORD } = require("../utils/config");


const createNewFavorite = async (userId, recipyId) => {
     const success = await Favorite.create({
        userId,
        recipyId,
      });
      return success;
}

const destroyFavorite = async (userId, recipyId) => {
    const success = await Favorite.destroy({
        where: {
          userId,
          recipyId,
        }
      });
      return success;
}

module.exports = {
    createNewFavorite,
    destroyFavorite,
}