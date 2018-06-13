<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['id']) && isset($_POST['token']) && isset($_POST['admin_local']) ){

    $token = $_POST['token'];
    $admin_local = $_POST['admin_local'];

    echo delete_ico($token, $admin_local,intval($_POST['id']));
}
?>