<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $data = json_decode(file_get_contents("php://input"), False);

  $id = $data->id;
  $name = $data->name;
  $phone = $data->phone;
  $email = $data->email;
  $address = $data->address;

  $query = "UPDATE providers SET Name = :Name, Phone = :Phone, Email = :Email, Address = :Address WHERE ProviderID = :ProviderID";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":Name", $name);
  $stmt->bindParam(":Phone", $phone);
  $stmt->bindParam(":Email", $email);
  $stmt->bindParam(":Address", $address);
  $stmt->bindParam(":ProviderID", $id);

  if ($stmt->execute()) {
    $json = json_encode(["message" => "¡Actualizado con éxito!"]);
    echo $json;
  }
