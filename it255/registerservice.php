<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password'])){

  $email = $_POST['email'];
  $username = $_POST['username'];
  $password = $_POST['password'];
  echo register($email,$username,$password);

}
?>