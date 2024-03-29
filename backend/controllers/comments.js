const commentRouter = require('express').Router();
const { Comment, User, Recipy } = require('../models');
const { sessionChecker } = require('../utils/middleware');

commentRouter.get("/:id", sessionChecker, async (req, res) => {
    try {
      const { id } = req.params;
  
      const comments = await Comment.findAll({
        where: { recipyId: id },
        include: [
          { model: User },],});
      return res.status(200).json(comments);
  
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

commentRouter.post("/:id", sessionChecker, async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, content } = req.body;
  
      const recipe = await Recipy.findByPk(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      const comment = await Comment.create({
        comment: content,
        date: new Date(),
        visible: true,
        userId: req.session.userId, 
        recipyId: recipe.id, 
      });
  
      const returnComment = await Comment.findByPk(comment.id, {
        include: [
          { model: User },],});
  
      return res.status(201).json(returnComment);
    } catch (error) {
      console.log('Error creating comment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

commentRouter.put("/:id", sessionChecker, async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, content } = req.body;
  
      const recipe = await Recipy.findByPk(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      const existingComment = await Comment.findOne({
        where: { userId: req.session.userId, recipyId: recipe.id },
      });
  
      if (!existingComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      existingComment.comment = content;
      await existingComment.save();
  
      const returnComment = await Comment.findByPk(existingComment.id, {
        include: [
          { model: User },],});
  
      return res.status(200).json(returnComment);
    } catch (error) {
      console.error('Error updating comment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

commentRouter.delete("/:id", sessionChecker, async (req, res) => {
    try {
      const { id } = req.params;
  
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      await comment.destroy();
  
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = commentRouter;