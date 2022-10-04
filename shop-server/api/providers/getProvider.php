<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $providerId = $_GET['id'];

  $query = "SELECT * FROM providers WHERE ProviderID = :ProviderID";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(':ProviderID', $providerId);
  $stmt->execute();
  $result = $stmt->fetch(PDO::FETCH_OBJ);

  if ($result) {
    $json = json_encode($result);
    echo $json;
  }
