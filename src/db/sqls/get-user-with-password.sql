SELECT *
FROM users 
WHERE password = crypt($/password/, password)
 AND  login = $/login/; 