<?php 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
include("functions.php");


if(isset($_POST['token']) &&  isset($_POST['add']) && isset($_POST['ico_id']) && isset($_POST['value'])){

    $token = $_POST['token'];
    $add = $_POST['add'];
    $ico_id = $_POST['ico_id'];
    $value = $_POST['value'];

    echo update_balance($token, $add, $ico_id, $value);
  
  }

?>