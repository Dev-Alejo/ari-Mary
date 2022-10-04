
<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  require "./../../config/db.php";

  $query = "SELECT * FROM users";
  $stmt = $conn->prepare($query);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_OBJ);
  
  $users = [];

  foreach ($result as $key => $value) {
    $user = array("id" => $value->UserID, "name" => $value->Name, "lastname" => $value->Lastname, "username" => $value->Username, "rol" => $value->Rol);
    array_push($users, $user);
  }

  $json = json_encode($users);
  echo $json;
