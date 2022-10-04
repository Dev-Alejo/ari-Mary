<?php

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $data = json_decode(file_get_contents("php://input"), False);
    
  $name = $data->name;
  $provider = $data->provider;
  $quantity = $data->quantity;
  $salePrice = $data->salePrice;
  $costPrice = $data->costPrice;

  $query = "INSERT INTO products (Name, Quantity, SalePrice, CostPrice, ProviderID) VALUES (:Name, :Quantity, :SalePrice, :CostPrice, :ProviderID)";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":Name", $name);
  $stmt->bindParam(":Quantity", $quantity);
  $stmt->bindParam(":SalePrice", $salePrice);
  $stmt->bindParam(":CostPrice", $costPrice);
  $stmt->bindParam(":ProviderID", $provider);

  if ($stmt->execute()) {
    $json = json_encode(["success" => True, "message" => "Proveedor registrado con éxito"]);
    echo $json;
  }