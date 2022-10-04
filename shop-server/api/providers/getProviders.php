<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $query = "SELECT * FROM providers";
  $stmt = $conn->prepare($query);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_OBJ);

  $providers = [];

  foreach ($result as $key => $value) {
    $provider = array("id" => $value->ProviderID, "name" => $value->Name, "phone" => $value->Phone, "email" => $value->Email, "address" => $value->Address);
    array_push($providers, $provider);
  }

  $json = json_encode($providers);
  echo $json;