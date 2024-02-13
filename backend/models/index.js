const User = require('./User');
const Recipy = require('./Recipy');
const Subscription = require('./Subscription');
const Category = require('./Category');
const Comment = require('./Comment');
const Ingredient = require('./Ingredient');
const RecipyCategory = require('./RecipyCategory');
const RecipyIngredient = require('./RecipyIngredient');
const Rating = require('./Rating');
const Favorite = require('./Favorite');

User.hasMany(Recipy);
Recipy.belongsTo(User);

User.belongsToMany(User, { 
    through: Subscription, 
    as: 'subscriptions',
    foreignKey: 'subscriberId', 
    otherKey: 'publisherId'
 });

 Recipy.belongsToMany(User, {
    through: Favorite,
    as: 'favorites'
 })

RecipyIngredient.belongsTo(Recipy);
RecipyIngredient.belongsTo(Ingredient);
Recipy.hasMany(RecipyIngredient);
Ingredient.hasMany(RecipyIngredient);

RecipyCategory.belongsTo(Recipy);
RecipyCategory.belongsTo(Category);
Recipy.hasMany(RecipyCategory);
Category.hasMany(RecipyCategory);

Comment.belongsTo(User);
Comment.belongsTo(Recipy);
Recipy.hasMany(Comment);
User.hasMany(Comment);

Rating.belongsTo(User);
Rating.belongsTo(Recipy);
Recipy.hasMany(Rating);
User.hasMany(Rating);

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
    };