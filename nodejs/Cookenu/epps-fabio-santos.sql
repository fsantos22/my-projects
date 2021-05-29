USE `epps-fabio-santos`;

CREATE TABLE cookenu_users (
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL
);

CREATE TABLE cookenu_recipes (
    recipe_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    createdAt Date NOT NULL,
    FOREIGN KEY (user_id) REFERENCES cookenu_users(user_id)
    ON DELETE CASCADE
)