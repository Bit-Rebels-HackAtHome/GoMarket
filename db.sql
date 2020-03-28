CREATE TABLE supermaket (
    idSuper INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) UNIQUE,
    latitudine FLOAT NOT NULL,
    longitudine FLOAT NOT NULL,
    capienza_max INT NOT NULL
);

CREATE TABLE user (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    pwd VARCHAR(255) NOT NULL,
    lat_residenza FLOAT NOT NULL,
    lon_residenza FLOAT NOT NULL,
    idSuper INT REFERENCES supermaket(idSuper) NULL,
    incoda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interno TIMESTAMP,
    dentro BOOLEAN DEFAULT FALSE
)