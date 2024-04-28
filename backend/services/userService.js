const { User, Recipy, RecipyCategory, RecipyIngredient, Favorite, Subscription, Rating, Comment } = require('../models')

const createNewUser = async (user) => {
  const newUser = await User.create(user, { returning: ['id', 'username'] })
  return newUser
}

const findSingleUser = async (id) => {
  const user = await User.findByPk(id, {
    attributes: ['id', 'username', 'about', 'subscribers', 'numberOfRecipes', 'createdAt']})
  return user
}

const findAllUsers = async () => {
  const users = await User.findAll()
  return users
}

const updateAboutMeInfo = async (id, aboutMe) => {
  const user = await User.findByPk(id)
  user.about = aboutMe
  await user.save()
  return user
}

const updateEmailAddress = async (id, email) => {
  const user = await User.findByPk(id)
  user.email = email
  await user.save()
  return user
}

const loginInfo = async (username) => {
  const user = await User.findOne({
    where: { username },
    include: [
      {
        model: User,
        as: 'subscriptions',
        attributes: ['id', 'username', 'email', 'about'],
        through: {
          attributes: []
        }
      },
      {
        model: Recipy,
        as: 'userFavorites',
        attributes: ['id', 'title'],
        through: {
          attributes: []
        }
      }
    ]
  }
  )
  return user
}

const destroyUser = async (id) => {
  const user = await User.findByPk(id)
  const recipes = await Recipy.findAll({ where: { userId: id } })
  recipes.forEach(async recipe => {
    await RecipyIngredient.destroy({ where: { recipyId: recipe.id } })
    await RecipyCategory.destroy({ where: { recipyId: recipe.id } })
    await Rating.destroy({ where: { recipyId: recipe.id } })
    await Comment.destroy({ where: { recipyId: recipe.id } })
    await Favorite.destroy({ where: { recipyId: recipe.id } })
    await recipe.destroy()
  })

  await user.destroy()
  return user
}

module.exports = {
  createNewUser,
  findSingleUser,
  findAllUsers,
  updateAboutMeInfo,
  updateEmailAddress,
  loginInfo,
  destroyUser
}
