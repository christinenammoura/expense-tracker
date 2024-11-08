<?php
#selecting transactionss
include "connection.php";

$id = $_GET["id"] ?? null;

if ($id) {
    $query = "SELECT * FROM transactions WHERE id = $id";
    $result = $connection->query($query);

    if ($result && $result->num_rows > 0) {
        $transaction = $result->fetch_assoc();
        echo json_encode($transaction);
    } else {
        echo json_encode(["message" => "Transaction not found"]);
    }
} else {
    $query = "SELECT * FROM transactions";
    $result = $connection->query($query);

    if ($result && $result->num_rows > 0) {
        $transactions = [];

        while ($transaction = $result->fetch_assoc()) {
            $transactions[] = $transaction;
        }

        echo json_encode($transactions);
    } else {
        echo json_encode(["message" => "No transactions found"]);
    }
}


?>