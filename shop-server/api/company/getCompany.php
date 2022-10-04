<?php
  require "./../config/db.php";

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
