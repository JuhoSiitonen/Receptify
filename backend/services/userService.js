const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription, Favorite } = require("../models");
const { EMAIL, EMAIL_PASSWORD } = require("../utils/config");

const createNewUser = async (user) => {
    const newUser = await User.create(user, {
      returning: ['id', 'username']});
    return newUser;
}

const findSingleUser = async (id) => {
    const user = await User.findByPk(id);
    return user;
}


module.exports = {
    createNewUser,
    findSingleUser,
}