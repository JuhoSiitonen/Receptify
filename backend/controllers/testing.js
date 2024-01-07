const testingRouter = require('express').Router()
const { User, Recipy } = require('../models')

testingRouter.post('/reset', async (request, response) => {
    await User.destroy({ where: {} })
    await Recipy.destroy({ where: {} })
    response.status(204).end()
    }
)

module.exports = testingRouter