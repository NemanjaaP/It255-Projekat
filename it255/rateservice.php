<?php 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
include("functions.php");


if(isset($_POST['token']) &&  isset($_POST['ico_id']) && isset($_POST['vote'])){

    $token = $_POST['token'];
    $ico_id = $_POST['ico_id'];
    $vote = $_POST['vote'];

    echo ico_rate($token, $ico_id, $vote);
  
  }

?>