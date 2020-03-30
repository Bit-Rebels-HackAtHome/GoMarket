CREATE TABLE user (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    pwd VARCHAR(255) NOT NULL,
    idSuper VARCHAR(128),
    incoda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interno TIMESTAMP,
    dentro BOOLEAN DEFAULT FALSE
);

CREATE TABLE prenotazione (
    idPren INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT REFERENCES user(idUser),
    idSuper VARCHAR(128) NOT NULL,
    orario INT NOT NULL,
    UNIQUE(idUser, idSuper, orario)
)