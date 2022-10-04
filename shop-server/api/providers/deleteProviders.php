<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");
  
  require "./../../config/db.php";

  # $data = json_decode(file_get_contents("php://input"), False);
  # $id = $data->id;

  $id = $_GET['id'];

  $query = "DELETE FROM providers WHERE ProviderID = :ProviderID";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":ProviderID", $id);

  if ($stmt->execute()) {
    $json = json_encode(["success" => True]);
    echo $json;
  }