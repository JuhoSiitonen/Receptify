const bcrypt = require('bcrypt')
const { findAllUsersRatings } = require('../services/ratingService')
const { loginInfo } = require('../services/userService')

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await loginInfo(username)
    if (user === null) {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    const rated = await findAllUsersRatings(user.id)
    const shoppinglist = []

    const email = user.email !== null

    const about = user.about === null
      ? ''
      : user.about

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (user && passwordCorrect) {
      const sess = req.session
      sess.userId = user.id
      sess.username = user.username
      sess.admin = user.admin
      sess.subscriptions = JSON.stringify(user.subscriptions)
      sess.userFavorites = JSON.stringify(user.userFavorites)
      sess.rated = JSON.stringify(rated)
      sess.shoppinglist = JSON.stringify(shoppinglist)
      sess.email = email
      sess.about = about
      sess.subscribers = user.subscribers
      sess.numberOfRecipes = user.numberOfRecipes
      const returnUser = {
        id: user.id,
        username: user.username,
        admin: user.admin,
        subscriptions: user.subscriptions,
        userFavorites: user.userFavorites,
        rated,
        shoppinglist,
        email,
        about,
        subscribers: user.subscribers,
        numberOfRecipes: user.numberOfRecipes
      }
      return res.status(200).json(returnUser)
    }
  } catch (error) {
    console.log('error', error)
    return res.status(401).json({ error: 'invalid username or password' })
  }
  return res.status(401).json({ error: 'invalid username or password' })
}

module.exports = {
  login
}
