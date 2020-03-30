<?php
    session_start();
    require_once("funzioni.php");
    controllo_sessione();

    if (!isset($_GET["idSuper"])) {
        header("HTTP/1.0 404 Not Found");
        exit();
    }

    $idSuper = trim($_GET["idSuper"]);

    if (empty($idSuper)) {
        header("HTTP/1.0 404 Not Found");
        exit();
    }

    $conn = connessione_db();
    $success = num_prenotazioni_9_19($idSuper, $conn);
    $conn->close();

    if ($success != null) {
        echo $success;
        header("HTTP/1.0 200 OK");
    }
    else
        header("HTTP/1.0 404 Not Found");