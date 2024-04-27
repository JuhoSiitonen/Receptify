const { User, Comment } = require('../models')

const createNewComment = async (content, userId, recipyId) => {
  const newComment = await Comment.create({
    comment: content,
    date: new Date(),
    visible: true,
    userId,
    recipyId
  })
  return newComment
}

const findSingleCommentById = async (id) => {
  const returnComment = await Comment.findByPk(id, {
    include: [
      { model: User }]
  })
  return returnComment
}

const findAllComments = async (recipyId) => {
  const comments = await Comment.findAll({
    where: { recipyId },
    include: [
      { model: User }]
  })
  return comments
}

const updateSingleComment = async (userId, recipyId, comment) => {
  const existingComment = await Comment.findOne({
    where: { userId, recipyId }
  })

  existingComment.comment = comment
  await existingComment.save()
  return existingComment
}

const destroyComment = async (id) => {
  const comment = await findSingleCommentById(id)
  await comment.destroy()
}

module.exports = {
  createNewComment,
  findSingleCommentById,
  findAllComments,
  updateSingleComment,
  destroyComment
}
