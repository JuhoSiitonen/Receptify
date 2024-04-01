const { User, Recipy } = require("../models");

const createNewUser = async (user) => {
    const newUser = await User.create(user, {
      returning: ['id', 'username']});
    return newUser;
}

const findSingleUser = async (id) => {
    const user = await User.findByPk(id);
    return user;
}

const findAllUsers = async () => {
    const users = await User.findAll();
    return users;
}

const updateAboutMeInfo = async (id, aboutMe) => {
    const user = await User.findByPk(id);
    user.about = aboutMe;
    await user.save();
    return user;
}

const updateEmailAddress = async (id, email) => {
    const user = await User.findByPk(req.session.userId);
    user.email = email;
    await user.save();
    return user;
}

const loginInfo = async (username) => {
    const user = await User.findOne({ where: { username }, 
        include: [
            { model: User, 
              as: 'subscriptions', 
              attributes: ["id", "username", "email", "about"],
              through: {
                attributes: []
              }, },
            { model: Recipy, 
              as: 'userFavorites', 
              attributes: ["id", "title"],
              through: {
                attributes: []
              }, },
          ],
        }
      );
    return user;
}

module.exports = {
    createNewUser,
    findSingleUser,
    findAllUsers,
    updateAboutMeInfo,
    updateEmailAddress,
    loginInfo
}