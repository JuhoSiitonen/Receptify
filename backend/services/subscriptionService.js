const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const { Recipy, User, Ingredient, RecipyIngredient, Category, RecipyCategory, Subscription, Favorite } = require("../models");
const { EMAIL, EMAIL_PASSWORD } = require("../utils/config");


const createSubscription = async (subscriberId, publisherId) => {
    const success = await Subscription.create({ 
      subscriberId,
      publisherId,
    });
    return success;
}

const destroySubscription = async (subscriberId, publisherId) => {
    const success = await Subscription.destroy({ 
      where: { subscriberId, publisherId },
    });
    return success;
}

module.exports = {
    createSubscription,
    destroySubscription,
}