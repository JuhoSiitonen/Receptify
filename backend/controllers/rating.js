const ratingRouter = require("express").Router();
const { Rating, User, Recipy } = require("../models");
const { sequelize } = require('../utils/db');

ratingRouter.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const ratings = await Rating.findAll({
        where: { recipyId: id },
        attributes: [
          [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
        ],
      });
  
      const averageRating = ratings.length > 0 ? ratings[0].dataValues.averageRating : null;
  
      res.status(200).json({ averageRating });
      } catch (error) {
      console.error('Error calculating average rating for recipe:', error);
      throw error;
    }
  });
  
  ratingRouter.post("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, rating } = req.body;
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const recipe = await Recipy.findByPk(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      const newRating = await Rating.create({
        rating,
        visible: true,
        userId: user.id, 
        recipyId: recipe.id, 
      });
  
      const returnRating = await Rating.findByPk(newRating.id);
  
      return res.status(201).json(returnRating);
    } catch (error) {
      console.error('Error creating rating:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = ratingRouter;