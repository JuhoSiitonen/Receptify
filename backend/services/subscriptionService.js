const { User, Subscription } = require('../models')

const createSubscription = async (subscriberId, publisherId) => {
  const success = await Subscription.create({
    subscriberId,
    publisherId
  })
  await User.increment('subscribers', { where: { id: publisherId } })
  return success
}

const destroySubscription = async (subscriberId, publisherId) => {
  const success = await Subscription.destroy({
    where: { subscriberId, publisherId }
  })
  await User.decrement('subscribers', { where: { id: publisherId } })
  return success
}

module.exports = {
  createSubscription,
  destroySubscription
}
