<?php
include "connection.php";

$username = $_POST['username'] ?? null;
$password = $_POST['password'] ?? null;
$email = $_POST['email'] ?? null;


    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = $connection->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
    $query->bind_param("ssi", $username, $hashedPassword, $email);
    $query->execute();
    $result = $query ->affected_rows;

    if ($result !=0) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["message" => "Error registering user"]);
    }
    
?>
