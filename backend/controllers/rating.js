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

ratingRouter.put("/:id", async (req, res) => {
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
  
      const existingRating = await Rating.findOne({
        where: { userId: user.id, recipyId: recipe.id },
      });
  
      if (!existingRating) {
        return res.status(404).json({ error: 'Rating not found' });
      }
  
      existingRating.rating = rating;
      await existingRating.save();
  
      const returnRating = await Rating.findByPk(existingRating.id);
  
      return res.status(200).json(returnRating);
    } catch (error) {
      console.error('Error updating rating:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  ratingRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const rating = await Rating.findByPk(id);
      if (!rating) {
        return res.status(404).json({ error: 'Rating not found' });
      }
  
      await rating.destroy();
  
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting rating:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = ratingRouter;