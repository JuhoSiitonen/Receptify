const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User, Recipy, Ingredient, Category, RecipyIngredient, RecipyCategory } = require('../models')

const newUsers = [
    {
        "username": "john_doe",
        "password": "password123",
        "admin": false,
        "visible": true
    },
    {
        "username": "jane_doe",
        "password": "password123",
        "admin": false,
        "visible": true
    },
    {
        "username": "admin_doe",
        "password": "password123",
        "admin": true,
        "visible": true
    },
]

const postableRecipies = [
    {
        "title": "Spaghetti Bolognese",
        "description": "Classic Italian pasta dish with rich tomato sauce.",
        "instructions": "Cook pasta, prepare sauce, mix, and serve.",
        "visible": true,
        "userId": 1,
        "ingredients": [
            {"name": "Spaghetti", "amount": "200g"},
            {"name": "Ground Beef", "amount": "500g"},
            {"name": "Tomato Sauce", "amount": "1 cup"}
        ],
        "categories": [
            {"name": "Italian"},
            {"name": "Pasta"}
        ]
    },
    {
        "title": "Chicken Tikka Masala",
        "description": "Classic Indian dish with chicken in a creamy tomato sauce.",
        "instructions": "Cook chicken, prepare sauce, mix, and serve.",
        "visible": true,
        "userId": 2,
        "ingredients": [
            {"name": "Chicken", "amount": "500g"},
            {"name": "Tomato Sauce", "amount": "1 cup"},
            {"name": "Cream", "amount": "1 cup"}
        ],
        "categories": [
            {"name": "Indian"},
            {"name": "Chicken"}
        ]
    },
]

const newRecipies = [
    {
        "title": "Spaghetti Bolognese",
        "description": "Classic Italian pasta dish with rich tomato sauce.",
        "instructions": "Cook pasta, prepare sauce, mix, and serve.",
        "visible": true,
        "userId": 1,
        "averageRating": 0,
    },
    {
        "title": "Chicken Tikka Masala",
        "description": "Classic Indian dish with chicken in a creamy tomato sauce.",
        "instructions": "Cook chicken, prepare sauce, mix, and serve.",
        "visible": true,
        "userId": 2,
        "averageRating": 0,
    },
]

const newIngredients = [
    {"name": "Spaghetti"},
    {"name": "Ground Beef"},
    {"name": "Tomato Sauce"},
    {"name": "Chicken"},
    {"name": "Cream"}
]

const newCategories = [
    {"name": "Italian"},
    {"name": "Pasta"},
    {"name": "Indian"},
    {"name": "Chicken"}
]

const newRecipyIngredients = [
    {"amount": "200g", "recipyId": 1, "ingredientId": 1},
    {"amount": "500g", "recipyId": 1, "ingredientId": 2},
    {"amount": "1 cup", "recipyId": 1, "ingredientId": 3},
    {"amount": "500g", "recipyId": 2, "ingredientId": 4},
    {"amount": "1 cup", "recipyId": 2, "ingredientId": 3},
    {"amount": "1 cup", "recipyId": 2, "ingredientId": 5},
]

const newRecipyCategories = [
    {"recipyId": 1, "categoryId": 1},
    {"recipyId": 1, "categoryId": 2},
    {"recipyId": 2, "categoryId": 3},
    {"recipyId": 2, "categoryId": 4},
]

beforeEach(async () => {
    await User.destroy({ where: {} })
    await User.bulkCreate(newUsers)
    let user = await User.findOne({ where: { username: "john_doe" } })
    postableRecipies[0].userId = user.id
    postableRecipies[1].userId = user.id
    await Recipy.destroy({ where: {} })
    await Ingredient.destroy({ where: {} })
    await Category.destroy({ where: {} })
    await RecipyIngredient.destroy({ where: {} })
    await RecipyCategory.destroy({ where: {} })
})

describe('GET /api/recipies', () => {
    test('returns all recipies', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        const response = await api.get('/api/recipies')
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
    })
})
