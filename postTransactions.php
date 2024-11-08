<?php
#insert transactio
include "connection.php";

$user_id = $_POST["user_id"] ?? null;
$amount = $_POST["amount"] ?? null;
$date = $_POST["date"] ?? null;
$category = $_POST["category"] ?? null;
$description = $_POST["description"] ?? null;

if ($user_id && $amount && $date) {
    $query = "INSERT INTO transactions (user_id, amount, date, category, description) VALUES ($user_id, $amount, '$date', '$category', '$description')";

    if ($connection->query($query)) {
        echo json_encode(["message" => "Transaction added successfully"]);
    } else {
        echo json_encode(["message" => "Error adding transaction"]);
    }
} else {
    echo json_encode(["message" => "Missing required fields"]);
}

?>