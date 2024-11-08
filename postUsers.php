<?php
#insert user 
include "connection.php";

$username = $_POST["username"] ?? null;
$password = $_POST["password"] ?? null;
$email = $_POST["email"] ?? null;

if ($username && $password && $email) {
    $query = "INSERT INTO users (username, password, email) VALUES ('$username', '$password', '$email')";

    if ($connection->query($query)) {
        echo json_encode(["message" => "User created successfully"]);
    } else {
        echo json_encode(["message" => "Error creating user"]);
    }
} else {
    echo json_encode(["message" => "Missing required fields"]);
}

?>
