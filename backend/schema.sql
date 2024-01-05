CREATE TABLE recipies (
    id SERIAL PRIMARY KEY, 
	title TEXT,
	description TEXT,
    ingredients INTEGER REFERENCES recipy_ingredients,
    instructions TEXT,
    category INTEGER REFERENCES recipy_categories,
	date TIMESTAMP,
    user INTEGER REFERENCES users,
    visible BOOLEAN
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
	username TEXT UNIQUE,
	password TEXT,
	admin BOOLEAN,
	visible BOOLEAN,
	created_at TIMESTAMP
);

CREATE TABLE recipy_ingredients (
    recipyID INTEGER REFERENCES recipies,
    ingredientID INTEGER REFERENCES ingredients,
    amount TEXT,
    visible BOOLEAN
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY, 
    name TEXT UNIQUE,
);

CREATE TABLE recipy_categories (
    recipyID INTEGER REFERENCES recipies,, 
    categoryID INTEGER REFERENCES categories,
    visible BOOLEAN
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY, 
    name TEXT UNIQUE,
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY, 
    comment TEXT,
    date TIMESTAMP,
    user INTEGER REFERENCES users,
    recipy INTEGER REFERENCES recipies,
    visible BOOLEAN
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY, 
    rating INTEGER,
    user INTEGER REFERENCES users,
    recipy INTEGER REFERENCES recipies,
    visible BOOLEAN
);

