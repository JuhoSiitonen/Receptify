const commentRouter = require('express').Router()
const { sessionChecker } = require('../utils/middleware')
const {
  getCommentsForRecipy,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comments')

commentRouter
  .route('/:id')
  .get(sessionChecker, getCommentsForRecipy)
  .post(sessionChecker, createComment)
  .put(sessionChecker, updateComment)
  .delete(sessionChecker, deleteComment)

module.exports = commentRouter
