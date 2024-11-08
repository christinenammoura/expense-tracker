<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:Get,Post");
header("Access-Control-Allow-Headers:Content-Type");

include "connection.php";

$username = $_POST['username'] ?? null;
$password = $_POST['password'] ?? null;
$email = $_POST['email'] ?? null;


    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = $connection->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
    $query->bind_param("sss", $username, $hashedPassword, $email);
    $query->execute();
    $result = $query ->affected_rows;

    if ($result !=0) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["message" => "Error registering user"]);
    }
    
?>
