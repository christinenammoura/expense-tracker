<?php
include "connection.php";

$user_id = $_GET['user_id'] ?? null;

if ($user_id != null) {
    $query = $connection->prepare("SELECT * FROM transactions WHERE user_id = ?");
    $query->bind_param("i", $user_id);
    $query->execute();
    $result = $query->get_result();

    $transactions = [];
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }

    echo json_encode($transactions);
    
} else {
    echo json_encode(["message" => "User ID required"]);
}
?>
