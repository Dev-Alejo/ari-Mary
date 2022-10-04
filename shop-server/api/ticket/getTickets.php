<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $query = "SELECT * FROM tickets";
  $stmt = $conn->prepare($query);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_OBJ);

  if ($result) {
    $json = json_encode($result);
    echo $json;
  }
