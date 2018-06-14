CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    title varchar(50),
    body varchar(500),
    user_id INT references USERS(id)
)