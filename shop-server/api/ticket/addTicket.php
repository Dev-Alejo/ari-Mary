<?php

  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $data = json_decode(file_get_contents("php://input"), False);
    
  $code = $data->code;
  $name = $data->name;
  $phone = $data->phone;
  $address = $data->address;
  $products = json_encode($data->products);
  $total = $data->total;

  $query = "INSERT INTO tickets (Code, Name, Phone, Address, Products, Total) VALUES (:Code, :Name, :Phone, :Address, :Products, :Total)";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":Code", $code);
  $stmt->bindParam(":Name", $name);
  $stmt->bindParam(":Phone", $phone);
  $stmt->bindParam(":Address", $address);
  $stmt->bindParam(":Products", $products);
  $stmt->bindParam(":Total", $total);

  if ($stmt->execute()) {
    $json = json_encode(["success" => True, "message" => "Factura registrada con éxito"]);
    echo $json;
  }
  