<?php
    if (!isset($_POST["email"]) || !isset($_POST["password"]) || !isset($_POST["conf_password"]) ||
        !isset($_POST["lat_residenza"]) || !isset($_POST["long_residenza"])) {
        header("HTTP/1.0 404 Not Found");
        exit();
    }

    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $conf_password = trim($_POST["conf_password"]);
    $lat_residenza = trim($_POST["lat_residenza"]);
    $long_residenza = trim($_POST["long_residenza"]);

    if (empty($email) || empty($password) || empty($conf_password) || empty($lat_residenza) ||
        empty($long_residenza)) {
        header("HTTP/1.0 404 Not Found");
        exit();
    }

    require_once("../funzioni.php");

    $conn = connessione_db();
    $success = registra($email, $password, $conf_password, $lat_residenza, $long_residenza, $conn);
    $conn->close();

    if ($success)
        header("HTTP/1.0 200 OK");
    else
        header("HTTP/1.0 404 Not Found");