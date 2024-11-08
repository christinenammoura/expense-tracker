<?php
include "connection.php";

$user_id = $_POST['user_id'] ?? null;
$description = $_POST['description'] ?? null;
$amount = $_POST['amount'] ?? null;
$category = $_POST['category'] ?? null;
$date = $_POST['date'] ?? null;


    $query = $connection->prepare("INSERT INTO transactions (user_id, description, amount, category, date) VALUES (?, ?, ?, ?, ?)");
    $query->bind_param("isiss", $user_id, $description, $amount, $category, $date);

    $query->execute();
    $result = $query ->affected_rows;

    if ($result !=0) {
        echo json_encode(["message" => "Transaction added successfully"]);
    } else {
        echo json_encode(["message" => "Error adding transaction"]);
    }
    

?>
