INSERT INTO users (login, password)
VALUES ($/login/, crypt($/password/, gen_salt('bf'))) RETURNING *;