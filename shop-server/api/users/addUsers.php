<?php
   header('Access-Control-Allow-Origin: *');
   header("Access-Control-Allow-Headers: *");
   header("Access-Control-Allow-Methods: *");
   header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $data = json_decode(file_get_contents("php://input"), False);

  $name = $data->name;
  $lastname = $data->lastname;
  $username = $data->username;
  $password = $data->password;
  $rol = $data->rol;

  // echo $name . " " . $lastname . " " . $username . " " . $password . " " . $rol;

  $query = "INSERT INTO users (Name, Lastname, Username, Password, Rol) VALUES (:Name, :Lastname, :Username, :Password, :Rol)";
  $stmt = $conn->prepare($query);
  $stmt->bindParam(":Name", $name);
  $stmt->bindParam(":Lastname", $lastname);
  $stmt->bindParam(":Username", $username);
  $stmt->bindParam(":Password", $password);
  $stmt->bindParam(":Rol", $rol);
  $stmt->execute();

  $json = json_encode(["success" => True, "message" => "Usuario registrado con éxito"]);
  echo $json;


