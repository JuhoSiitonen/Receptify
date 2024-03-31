const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription, Favorite } = require("../models");
const { EMAIL, EMAIL_PASSWORD } = require("../utils/config");


const createNewRating = async (rating) => {
}

module.exports = {
    createNewRating,
}