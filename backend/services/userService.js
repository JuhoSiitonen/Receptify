const {  User } = require("../models");

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

module.exports = {
    createNewUser,
    findSingleUser,
    findAllUsers,
    updateAboutMeInfo,
    updateEmailAddress,
}