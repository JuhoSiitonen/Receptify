const User = require('./User')
const Recipy = require('./Recipy')
const Subscription = require('./Subscription')
const Category = require('./Category')
const Comment = require('./Comment')
const Ingredient = require('./Ingredient')
const RecipyCategory = require('./RecipyCategory')
const RecipyIngredient = require('./RecipyIngredient')
const Rating = require('./Rating')
const Favorite = require('./Favorite')

User.hasMany(Recipy, {
  as: 'recipies',
  foreignKey: 'userId'
})

Recipy.belongsTo(User, {
  as: 'owner',
  foreignKey: 'userId'
})

User.belongsToMany(User, {
  through: Subscription,
  as: 'subscriptions',
  foreignKey: 'subscriberId',
  otherKey: 'publisherId'
})

Recipy.belongsToMany(User, {
  through: Favorite,
  as: 'favoritedBy',
  foreignKey: 'recipyId'
})

User.belongsToMany(Recipy, {
  through: Favorite,
  as: 'userFavorites'
})

RecipyIngredient.belongsTo(Recipy)
RecipyIngredient.belongsTo(Ingredient)
Recipy.hasMany(RecipyIngredient)
Ingredient.hasMany(RecipyIngredient)

RecipyCategory.belongsTo(Recipy)
RecipyCategory.belongsTo(Category)
Recipy.hasMany(RecipyCategory)
Category.hasMany(RecipyCategory)

Recipy.belongsToMany(Ingredient, {
  through: RecipyIngredient,
  as: 'ingredients',
  foreignKey: 'recipyId'
})

Ingredient.belongsToMany(Recipy, {
  through: RecipyIngredient,
  as: 'recipies',
  foreignKey: 'ingredientId'
})

Recipy.belongsToMany(Category, {
  through: RecipyCategory,
  as: 'categories',
  foreignKey: 'recipyId'
})

Category.belongsToMany(Recipy, {
  through: RecipyCategory,
  as: 'recipies',
  foreignKey: 'categoryId'
})

Comment.belongsTo(User)
Comment.belongsTo(Recipy)
Recipy.hasMany(Comment)
User.hasMany(Comment)

Rating.belongsTo(User)
Rating.belongsTo(Recipy)
Recipy.hasMany(Rating)
User.hasMany(Rating)

module.exports = {
  User,
  Recipy,
  Category,
  Comment,
  Ingredient,
  Rating,
  RecipyCategory,
  RecipyIngredient,
  Subscription,
  Favorite
}
