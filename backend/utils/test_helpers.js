const newUsers = [
  {
    username: 'john_doe',
    password: 'password123',
    admin: false,
    visible: true
  },
  {
    username: 'jane_doe',
    password: 'password123',
    admin: false,
    visible: true
  },
  {
    username: 'admin_doe',
    password: 'password123',
    admin: true,
    visible: true
  }
]

const postableRecipies = [
  {
    title: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta dish with rich tomato sauce.',
    instructions: 'Cook pasta, prepare sauce, mix, and serve.',
    visible: true,
    userId: 1,
    ingredients: [
      { name: 'Spaghetti', amount: '200', unit: 'g' },
      { name: 'Ground Beef', amount: '500', unit: 'g' },
      { name: 'Tomato Sauce', amount: '1', unit: 'cup' }
    ],
    categories: [
      { name: 'Italian' },
      { name: 'Pasta' }
    ],
    cookingTime: '00:30',
    pictureUuid: '1234-5678-91011',
    averageRating: '0'
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Classic Indian dish with chicken in a creamy tomato sauce.',
    instructions: 'Cook chicken, prepare sauce, mix, and serve.',
    visible: true,
    userId: 2,
    ingredients: [
      { name: 'Chicken', amount: '500', unit: 'g' },
      { name: 'Tomato Sauce', amount: '1', unit: 'cup' },
      { name: 'Cream', amount: '1', unit: 'cup' }
    ],
    categories: [
      { name: 'Indian' },
      { name: 'Chicken' }
    ],
    cookingTime: '00:50',
    pictureUuid: '1234-5678-91234',
    averageRating: '0'
  }
]

module.exports = { newUsers, postableRecipies }
