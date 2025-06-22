-- table user
CREATE TABLE user(
                 id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                 full_name VARCHAR(50) NOT NULL,
                 username VARCHAR(255) UNIQUE NOT NULL,
                 password VARCHAR(255) NOT NULL,
                 role ENUM('ADMIN') NOT NULL
);
