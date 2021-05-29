CREATE TABLE toDoList_users(
id VARCHAR(255) PRIMARY KEY,
name VARCHAR(255) NOT NULL,
nickname VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE toDoList_tasks (
	id VARCHAR(255) PRIMARY KEY, 
    title VARCHAR(255) NOT NULL, 
    description TEXT NOT NULL, 
    status VARCHAR(255) NOT NULL DEFAULT "to_do",
    limit_date FLOAT NOT NULL,
    creator_user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (creator_user_id) REFERENCES toDoList_users(id)
);

CREATE TABLE toDoList_respUsersTasks (
	task_id VARCHAR(255),
    responsible_user_id VARCHAR(255),
    FOREIGN KEY (task_id) REFERENCES toDoList_tasks(id),
    FOREIGN KEY (responsible_user_id) REFERENCES toDoList_users(id)
);