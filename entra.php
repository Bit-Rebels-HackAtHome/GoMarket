<?php
    if (!isset($_POST["email"]) || !isset($_POST["password"])) {
        header("HTTP/1.0 404 Not Found");
        exit();
    }

    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    if (empty($email) || empty($password)) {
        header("HTTP/1.0 404 Not Found");
        exit();
    }

    require_once("../funzioni.php");

    $conn = connessione_db();
    $success = entra($email, $password, $conn);
    $conn->close();

    if ($success != null) {
        session_start();
        $_SESSION["utente"] = $success;
        header("HTTP/1.0 200 OK");
    }
    else
        header("HTTP/1.0 404 Not Found");