export const filterBy = ({ option, value, recipe }) => {
    if  (option === 'title') {
        return recipe.title.includes(value);
    } else if (option === 'username') {
        return recipe.user.username.includes(value);
    } else if (option === 'ingredients') {
        return recipe.recipy_ingredients?.some((ingredient) =>
        ingredient.ingredient?.name.includes(value.toLowerCase())
        );
    } else if (option === 'categories') {
        return recipe.recipy_categories?.some((category) =>
        category.category?.name.includes(value.toLowerCase())
        );
    } else {
        return false;
    }
}