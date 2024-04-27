const { findSingleRecipyById } = require('../services/recipyService')
const {
  createNewComment,
  findSingleCommentById,
  findAllComments,
  updateSingleComment,
  destroyComment
} = require('../services/commentService')

const getCommentsForRecipy = async (req, res) => {
  try {
    const { id } = req.params
    const comments = await findAllComments(id)
    return res.status(200).json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const createComment = async (req, res) => {
  try {
    const { id } = req.params
    const { userId, content } = req.body

    const recipe = await findSingleRecipyById(id)
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    const comment = await createNewComment(content, req.session.userId, recipe.id)
    const returnComment = await findSingleCommentById(comment.id)

    return res.status(201).json(returnComment)
  } catch (error) {
    console.log('Error creating comment:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateComment = async (req, res) => {
  try {
    const { id } = req.params
    const { userId, content } = req.body

    const recipe = await findSingleRecipyById(id)
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    const existingComment = await updateSingleComment(req.session.userId, recipe.id, content)
    const returnComment = await findSingleCommentById(existingComment.id)

    return res.status(200).json(returnComment)
  } catch (error) {
    console.error('Error updating comment:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params

    const comment = await findSingleCommentById(id)
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    await destroyComment(id)

    return res.status(204).end()
  } catch (error) {
    console.error('Error deleting comment:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getCommentsForRecipy,
  createComment,
  updateComment,
  deleteComment
}
