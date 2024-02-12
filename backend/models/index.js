const User = require('./User');
const Recipy = require('./Recipy');
const Friend = require('./Friend');
const Category = require('./Category');
const Comment = require('./Comment');
const Ingredient = require('./Ingredient');
const RecipyCategory = require('./RecipyCategory');
const RecipyIngredient = require('./RecipyIngredient');
const Rating = require('./Rating');


User.hasMany(Recipy);
Recipy.belongsTo(User);

User.belongsToMany(User, { as: 'friends', through: Friend });

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
    Friend
    };