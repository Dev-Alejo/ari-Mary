<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $data = json_decode(file_get_contents("php://input"), False);

  $id = $data->id;
  $name = $data->name;
  $quantity = $data->quantity;
  $salePrice = $data->salePrice;
  $costPrice = $data->costPrice;

  $query = "UPDATE products SET Name = :Name, Quantity = :Quantity, SalePrice = :SalePrice, CostPrice = :CostPrice WHERE ProductID = :ProductID";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":Name", $name);
  $stmt->bindParam(":Quantity", $quantity);
  $stmt->bindParam(":SalePrice", $salePrice);
  $stmt->bindParam(":CostPrice", $costPrice);
  $stmt->bindParam(":ProductID", $id);

  if ($stmt->execute()) {
    $json = json_encode(["message" => "¡Actualizado con éxito!"]);
    echo $json;
  }
