<?php
   header('Access-Control-Allow-Origin: *');
   header("Access-Control-Allow-Headers: *");
   header("Access-Control-Allow-Methods: *");
   header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  #$data = json_decode(file_get_contents("php://input"), False);
  # $username = $data->username;

  $id = $_GET['id'];

  $query = "DELETE FROM users WHERE UserID = :UserID";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":UserID", $id);

  if ($stmt->execute()) {
    $json = json_encode(["success" => True]);
    echo $json;
  }
