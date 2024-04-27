const {
  createNewRating,
  getAverageRating,
  updateAverageRating,
  findUserRating,
  updateSingleRating,
  destroyRating
} = require('../services/ratingService')
const { findSingleRecipyById } = require('../services/recipyService')

const getRatingForRecipy = async (req, res) => {
  try {
    const { id } = req.params

    const ratings = await getAverageRating(id)
    const averageRating = ratings.length > 0 ? ratings[0].dataValues.averageRating : null

    res.status(200).json({ averageRating })
  } catch (error) {
    console.error('Error calculating average rating for recipe:', error)
    return res.status(500)
  }
}

const sendRating = async (req, res) => {
  try {
    const { id } = req.params
    const { rating } = req.body

    const recipe = await findSingleRecipyById(id)
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    const newRating = await createNewRating(rating, req.session.userId, recipe.id)
    const userRatings = JSON.parse(req.session.rated)
    userRatings.push({ recipyId: recipe.id, rating })

    const ratings = await getAverageRating(id)
    const averageRating = ratings.length > 0 ? ratings[0].dataValues.averageRating : 0
    const updatedRecipy = await updateAverageRating(recipe.id, averageRating)

    return res.status(201).json(averageRating)
  } catch (error) {
    console.error('Error creating rating:', error)
    return res.status(500)
  }
}

const updateRating = async (req, res) => {
  try {
    const { id } = req.params
    const { rating } = req.body

    const recipe = await findSingleRecipyById(id)
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    const userRating = await findUserRating(req.session.userId, recipe.id)
    if (!userRating) {
      return res.status(404).json({ error: 'Rating not found' })
    }

    const existingRating = await updateSingleRating(req.session.userId, recipe.id, rating)

    const userRatings = JSON.parse(req.session.rated)
    const newRatings = userRatings.filter(r => r.recipyId !== recipe.id)
    req.session.rated = JSON.stringify(newRatings)

    newRatings.push({ recipyId: recipe.id, rating })

    const ratings = await getAverageRating(id)
    const averageRating = ratings.length > 0 ? ratings[0].dataValues.averageRating : 0
    const updatedRecipy = await updateAverageRating(recipe.id, averageRating)

    return res.status(200).json(averageRating)
  } catch (error) {
    console.error('Error updating rating:', error)
    return res.status(500)
  }
}

const deleteRating = async (req, res) => {
  try {
    const { id } = req.params
    const rating = await destroyRating(id)

    return res.status(204).end()
  } catch (error) {
    console.error('Error deleting rating:', error)
    return res.status(500)
  }
}

module.exports = {
  getRatingForRecipy,
  sendRating,
  updateRating,
  deleteRating
}
