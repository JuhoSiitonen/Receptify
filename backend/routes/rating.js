const ratingRouter = require("express").Router();
const { Rating, User, Recipy } = require("../models");
const { sequelize } = require('../utils/db');
const { sessionChecker } = require("../utils/middleware");

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
      return res.status(500);
    }
  });
  
  ratingRouter.post("/:id", sessionChecker, async (req, res) => {
    try {
      const { id } = req.params;
      const { rating }  = req.body;
  
      const recipe = await Recipy.findByPk(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      const newRating = await Rating.create({
        rating,
        visible: true,
        userId: req.session.userId, 
        recipyId: recipe.id, 
      });

      let userRatings = JSON.parse(req.session.rated);
      userRatings.push({ recipyId: recipe.id, rating: rating });

      const ratings = await Rating.findAll({
        where: { recipyId: id },
        attributes: [
          [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
        ],
      });

      const averageRating = ratings.length > 0 ? ratings[0].dataValues.averageRating : 0;

      recipe.averageRating = averageRating;
      await recipe.save();
    
      return res.status(201).json(averageRating);
    } catch (error) {
      console.error('Error creating rating:', error);
      return res.status(500);
    }
  });

ratingRouter.put("/:id", sessionChecker, async (req, res) => {
    try {
      const { id } = req.params;
      const { rating } = req.body;
  
      const recipe = await Recipy.findByPk(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      const existingRating = await Rating.findOne({
        where: { userId: req.session.userId, recipyId: recipe.id },
      });
  
      if (!existingRating) {
        return res.status(404).json({ error: 'Rating not found' });
      }
  
      existingRating.rating = rating;
      await existingRating.save();

      let userRatings = JSON.parse(req.session.rated);
      const newRatings = userRatings.filter(r => r.recipyId !== recipe.id);
      req.session.rated = JSON.stringify(newRatings);

      newRatings.push({ recipyId: recipe.id, rating: rating });

      const ratings = await Rating.findAll({
        where: { recipyId: id },
        attributes: [
          [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
        ],
      });

      const averageRating = ratings.length > 0 ? ratings[0].dataValues.averageRating : 0;

      recipe.averageRating = averageRating;
      await recipe.save();
    
      return res.status(200).json(averageRating);
    } catch (error) {
      console.error('Error updating rating:', error);
      return res.status(500);
    }
  });

  ratingRouter.delete("/:id", sessionChecker, async (req, res) => {
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
      return res.status(500);
    }
  });

  module.exports = ratingRouter;