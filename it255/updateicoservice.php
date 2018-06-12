<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');

include("functions.php");

if(isset($_POST['name']) && isset($_POST['description']) && isset($_POST['short_description']) 
 && isset($_POST['website'])  && isset($_POST['value'])  && isset($_POST['imgpath']) && isset($_POST['ico_id']))
 {
  $name = $_POST['name'];
  $description = $_POST['description'];
  $short_description = $_POST['short_description'];
  $website = $_POST['website'];
  $value = $_POST['value'];
  $imgpath = $_POST['imgpath'];
  $ico_id = $_POST['ico_id'];

  echo update_ico($ico_id,$name,$description,$short_description,$website,$value, $imgpath);
}
?>