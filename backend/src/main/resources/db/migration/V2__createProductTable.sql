-- table product
CREATE TABLE product(
    id            BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name          VARCHAR(255)          NULL,
    description   VARCHAR(255)          NULL,
    price         DOUBLE                NULL,
    quantity      BIGINT                NULL
);