const userRouter = require('express').Router()
const { sessionChecker } = require('../utils/middleware')
const {
  getUsers,
  createUser,
  subscribeToUser,
  unsubscribeFromUser,
  getUserInfo,
  addAsFavorite,
  removeFromFavorites,
  getSession,
  logoutUser,
  viewUser,
  addToShoppinglist,
  removeFromShoppinglist,
  sendEmail,
  setAboutInfo,
  setEmailAddress,
  deleteUser
} = require('../controllers/users')

userRouter
  .route('/')
  .get(sessionChecker, getUsers)
  .post(createUser)

userRouter.get('/userinfo/:id', sessionChecker, getUserInfo)

userRouter
  .route('/subscriptions/:id')
  .post(sessionChecker, subscribeToUser)
  .delete(sessionChecker, unsubscribeFromUser)

userRouter
  .route('/favorites/:id')
  .post(sessionChecker, addAsFavorite)
  .delete(sessionChecker, removeFromFavorites)

userRouter.get('/session', getSession)

userRouter.post('/logout', sessionChecker, logoutUser)

userRouter.get('/:id/view', sessionChecker, viewUser)

userRouter.post('/shoppinglist', sessionChecker, addToShoppinglist)

userRouter.delete('/shoppinglist/:id', sessionChecker, removeFromShoppinglist)

userRouter.post('/shoppinglist/email', sessionChecker, sendEmail)

userRouter.put('/about', sessionChecker, setAboutInfo)

userRouter.put('/email', sessionChecker, setEmailAddress)

userRouter.delete('/:id', sessionChecker, deleteUser)

module.exports = userRouter
