<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $data = json_decode(file_get_contents("php://input"), False);

  $name = $data->name;
  $phone = $data->phone;
  $email = $data->email;
  $address = $data->address;

  // echo $name . " " . $lastname . " " . $username . " " . $password . " " . $rol;

  $query = "INSERT INTO providers (Name, Phone, Email, Address) VALUES (:Name, :Phone, :Email, :Address)";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":Name", $name);
  $stmt->bindParam(":Phone", $phone);
  $stmt->bindParam(":Email", $email);
  $stmt->bindParam(":Address", $address);

  if ($stmt->execute()) {
    $json = json_encode(["success" => True, "message" => "Proveedor registrado con éxito"]);
    echo $json;
  }

