const { Recipy, Favorite } = require("../models");

const createNewFavorite = async (userId, recipyId) => {
     const success = await Favorite.create({
        userId,
        recipyId,
      });
      await Recipy.increment('favorites', { where: { id: recipyId } });
      return success;
}

const destroyFavorite = async (userId, recipyId) => {
    const success = await Favorite.destroy({
        where: {
          userId,
          recipyId,
        }
      });
      await Recipy.decrement('favorites', { where: { id: recipyId } });
      return success;
}

module.exports = {
    createNewFavorite,
    destroyFavorite,
}