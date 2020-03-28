<?php
    function connessione_db() {
        $servername = "127.0.0.1";
        $username = "root";
        $password = "";
        $dbname = "gomarket";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
            exit();
        }

        return $conn;
    }

    function entra($email, $password, $db_connection) {
        $password = sha1($password);

        $stmt = $db_connection->prepare("SELECT idUser, email, lat_residenza, lon_residenza FROM user
                                                WHERE email=? AND pwd=?");
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        echo $stmt->numRows;
        if ($stmt->numRows != 1) {
            $stmt->close();
            return null;
        }
        $row = $stmt->fetch();
        $stmt->close();
        return $row;
    }

    function registra($email, $password, $conf_password, $lat_residenza, $long_residenza, $db_connection) {
        if ($password != $conf_password)
            return false;
        $password = sha1($password);

        $stmt = $db_connection->prepare("INSERT INTO user(idUser, email, pwd, lat_residenza, lon_residenza, idSuper,
                                            inCoda, interno, dentro) VALUES (null, ?, ?, ?, ?, null, null, null, null)");
        $stmt->bind_param("ssdd", $email, $password, $lat_residenza, $long_residenza);
        $result = $stmt->execute();
        $stmt->close();

        if ($result)
            return true;
        return false;
    }