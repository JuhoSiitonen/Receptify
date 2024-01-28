const User = require('./User');
const Recipy = require('./Recipy');
const Category = require('./Category');
const Comment = require('./Comment');
const Ingredient = require('./Ingredient');
const RecipyCategory = require('./RecipyCategory');
const RecipyIngredient = require('./RecipyIngredient');
const Rating = require('./Rating');

User.hasMany(Recipy);
Recipy.belongsTo(User);

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

/*
Recipy.sync({ alter: true })
User.sync({ alter: true })
Ingredient.sync({ alter: true })
Category.sync({ alter: true })
Comment.sync({ alter: true })
Rating.sync({ alter: true })
RecipyCategory.sync({ alter: true })
RecipyIngredient.sync({ alter: true })
*/

module.exports = {
    User,
    Recipy,
    Category,
    Comment,
    Ingredient,
    Rating,
    RecipyCategory,
    RecipyIngredient,
    };