<?php
    session_start();
    require_once("../funzioni.php");

    $values = controllo_dati_s_prenota();

    $conn = connessione_db();
    $success = prenota($_SESSION["utente"]["id"], $values[0], $values[1], $conn);
    $conn->close();

    if ($success)
        header("HTTP/1.0 200 OK");
    else
        header("HTTP/1.0 404 Not Found");