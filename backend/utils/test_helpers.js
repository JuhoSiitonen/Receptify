

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


module.exports = { newUsers, postableRecipies };