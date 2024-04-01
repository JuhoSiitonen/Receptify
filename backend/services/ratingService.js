const { Recipy, Rating } = require("../models");
const { sequelize } = require('../utils/db');

const createNewRating = async (rating, userId, recipyId) => {
    const newRating = await Rating.create({
        rating,
        visible: true,
        userId, 
        recipyId
    });
    return newRating;
}

const getAverageRating = async (recipyId) => {
    const rating = await Rating.findAll({
        where: { recipyId },
        attributes: [
          [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
        ],
    });
    return rating;
}

const updateAverageRating = async (recipyId, rating) => {
    const recipe = await Recipy.findByPk(recipyId);
    recipe.averageRating = rating;
    await recipe.save();
    return recipe;
}

const findUserRating = async (userId, recipyId) => {
    const existingRating = await Rating.findOne({
        where: { userId, recipyId },
    });
    return existingRating;
}

const findAllUsersRatings = async (userId) => {
    const rated = await Rating.findAll({ 
        where: { userId: userId },
        attributes: ["recipyId", "rating"],
    });
    return rated;
}

const updateSingleRating = async (userId, recipyId, rating) => {
    const existingRating = await findUserRating(userId, recipyId);
    existingRating.rating = rating;
    await existingRating.save();
    return existingRating;
}

const destroyRating = async (id) => {
    const rating = await Rating.findByPk(id);
    if (!rating) {
        return res.status(404).json({ error: 'Rating not found' });
    }
    await rating.destroy();
}

module.exports = {
    createNewRating,
    getAverageRating,
    updateAverageRating,
    findUserRating,
    updateSingleRating,
    findAllUsersRatings,
    destroyRating
}