<?php
    function connessione_db() {
        $servername = "127.0.0.1";
        $username = "";
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

    function controllo_dati_s_prenota() {
        controllo_sessione();echo "ciao";

        if (!isset($_POST["idSuper"]) || !isset($_POST["orario"])) {
            header("HTTP/1.0 404 Not Found");
            exit();
        }
echo "come";
        $idSuper = trim($_POST["idSuper"]);
        $orario = trim($_POST["orario"]);

        if (empty($idSuper) || empty($orario)) {
            header("HTTP/1.0 404 Not Found");
            exit();
        }

        return array($idSuper, $orario);
    }

    function controllo_sessione() {
        if (!isset($_SESSION["utente"])) {
            header("HTTP/1.0 404 Not Found");
            exit();
        }
    }

    function entra($email, $password, $db_connection) {
        $password = sha1($password);

        $stmt = $db_connection->prepare("SELECT idUser, email FROM user
                                                WHERE email=? AND pwd=?");
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $stmt->bind_result($id, $email);
        $row = $stmt->fetch();
        $stmt->close();
        if ($row == 1)
            return array("id" => $id, "email" => $email);
        return null;
    }

    function num_prenotazioni_9_19($idSuper, $db_connection) {
        $stmt = $db_connection->prepare("SELECT idSuper FROM prenotazione
                                                WHERE idSuper=? LIMIT 1");
        $stmt->bind_param("s", $idSuper);
        $stmt->execute();
        $stmt->bind_result($id);
        $row = $stmt->fetch();
        $stmt->close();
        if ($row == 1) {
            $output = $id;
            for ($i = 9; $i < 19; $i++) {
                $stmt = $db_connection->prepare("SELECT COUNT(*) FROM prenotazione
                                                    WHERE idSuper=? AND orario=?");
                $stmt->bind_param("si", $id, $i);
                $stmt->execute();
                $stmt->bind_result($numero);
                $stmt->fetch();
                $stmt->close();
                $output .= ", ". $i. " = ". $numero;
            }
            return $output;
        }
        return null;
    }

    function prenota($idUser, $idSuper, $orario, $db_connection) {
        $stmt = $db_connection->prepare("INSERT INTO prenotazione(idPren, idUser, idSuper, orario) VALUES (null, ?, ?, ?)");
        $stmt->bind_param("isi", $idUser, $idSuper, $orario);
        $result = $stmt->execute();
        $stmt->close();

        if ($result)
            return true;
        return false;
    }

    function registra($email, $password, $conf_password, $db_connection) {
        if ($password != $conf_password)
            return false;
        $password = sha1($password);

        $stmt = $db_connection->prepare("INSERT INTO user(idUser, email, pwd, idSuper, inCoda, interno, dentro)
                                                VALUES (null, ?, ?, null, null, null, null)");
        $stmt->bind_param("ss", $email, $password);
        $result = $stmt->execute();
        $stmt->close();

        if ($result)
            return true;
        return false;
    }

    function sprenota($idUser, $idSuper, $orario, $db_connection) {
        $stmt = $db_connection->prepare("DELETE FROM prenotazione WHERE idUser=? AND idSuper=? AND orario=?");
        $stmt->bind_param("isi", $idUser, $idSuper, $orario);
        $result = $stmt->execute();
        $stmt->close();

        if ($result)
            return true;
        return false;
    }