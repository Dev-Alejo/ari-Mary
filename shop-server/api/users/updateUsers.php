<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $data = json_decode(file_get_contents("php://input"), False);

  $id = $data->id;
  $name = $data->name;
  $lastname = $data->lastname;
  $username = $data->username;
  $password = $data->password;
  $rol = $data->rol;

  $query = "UPDATE users SET Name = :Name, Lastname = :Lastname, Username = :Username, Password = :Password, Rol = :Rol WHERE UserID = :UserID";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":Name", $name);
  $stmt->bindParam(":Lastname", $lastname);
  $stmt->bindParam(":Username", $username);
  $stmt->bindParam(":Password", $password);
  $stmt->bindParam(":Rol", $rol);
  $stmt->bindParam(":UserID", $id);

  if ($stmt->execute()) {
    $json = json_encode(["message" => "¡Actualizado con éxito!"]);
    echo $json;
  }



