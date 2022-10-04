<?php

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");
  
  require "./../../config/db.php";

  $id = $_GET['id'];

  $query = "DELETE FROM products WHERE ProductID = :ProductID";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":ProductID", $id);

  if ($stmt->execute()) {
    $json = json_encode(["success" => True]);
    echo $json;
  }