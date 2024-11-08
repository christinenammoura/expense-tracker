<?php
#to select the users
include "connection.php";

$id = $_POST["id"] ?? null;

if($id != null){
  $query = $connection->prepare("SELECT * FROM users WHERE id = $id");

  $query->execute();

  $result = $query->get_result();

  if($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    echo json_encode($user);
  } else {
    echo json_encode([
      "message" => "Not Found"
    ]);
  }
} else {
  $query = $connection->prepare("SELECT * FROM users");

  $query->execute();

  $result = $query->get_result();

  if ($result->num_rows > 0){
    $array = [];

    while($resultObject = $result->fetch_assoc()){
      $array[] = $resultObject;
    }

    echo json_encode($array);
  } else {
    $response = [
      "message" => "Empty result"
    ];

    echo json_encode($response);
  }
}
?>