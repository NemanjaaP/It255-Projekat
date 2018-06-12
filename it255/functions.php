<?php
include("config.php");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     die();
}

// -------------------------------------------------  LOGOVANJE I REGISTRACIJA -------------------------------------------------------
function checkIfLoggedIn(){
    global $conn;
    if(isset($_SERVER['HTTP_TOKEN'])){
        $token = $_SERVER['HTTP_TOKEN'];
        $result = $conn->prepare("SELECT * FROM users WHERE token=?");
        $result->bind_param("s",$token);
        $result->execute();
        $result->store_result();
        $num_rows = $result->num_rows;
        if($num_rows > 0)
        {
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

function login($username, $password){
    global $conn;
    $rarray = array();
    if(checkLogin($username,$password)){
        $id = sha1(uniqid());
        $result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
        $result2->bind_param("ss",$id,$username);
        $result2->execute();
        $rarray['token'] = $id;

    $admin = checkAdmin($id);
    $rarray['administrator'] = $admin;

    } else{
        header('HTTP/1.1 401 Unauthorized');
        $rarray['error'] = "Invalid username/password";
    }
    return json_encode($rarray);
}

function checkAdmin($token) {
    $token = str_replace('"', "", $token);
    global $conn;
    $query = 'SELECT administrator FROM users WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
    $admin = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $admin = $row['administrator'];
        }
        return $admin;
    }
}

function checkLogin($username, $password){
    global $conn;
    $password = $password;
    $result = $conn->prepare("SELECT * FROM users WHERE username=? AND pass=?");
    $result->bind_param("ss",$username,$password);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}

function register($email, $username, $password){
    global $conn;
    $rarray = array();
    $errors = "";

    if(checkIfUserExists($username)){
        $errors .= "Username already exists\r\n";
    }
    if(strlen($username) < 5){
        $errors .= "Username must have at least 5 characters\r\n";
    }
    if(strlen($password) < 5){
        $errors .= "Password must have at least 5 characters\r\n";
    }

    if($errors == ""){
        $administrator = 0;
        $scam_coin = 1000;
        $stmt = $conn->prepare("INSERT INTO users (email, username, pass, administrator, scamcoin_balance) VALUES (?, ?, ?, ?,?)");
        $stmt->bind_param("sssii", $email, $username, $password, $administrator, $scam_coin);
        if($stmt->execute()){
            $id = sha1(uniqid());
            $result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
            $result2->bind_param("ss",$id,$username);
            $result2->execute();
            $rarray['token'] = $id;
        }else{
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    } else{
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }
    
    return json_encode($rarray);
}


function checkIfUserExists($username){
    global $conn;
    $result = $conn->prepare("SELECT * FROM users WHERE username=?");
    $result->bind_param("s",$username);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}

// ------------------------------------------------- IZLISTAVANJE SVIH ICOova -------------------------------------------------------

function get_icos(){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $result = $conn->query("SELECT ico.ico_id, ico.name, ico.description, ico.short_description, ico.website, ico.value,ico.imgpath FROM ico");
        $num_rows = $result->num_rows;
        $icos = array();
        if($num_rows > 0)
        {
            $result2 = $conn->query("SELECT ico.ico_id,ico.name, ico.description, ico.short_description, ico.website, ico.value,ico.imgpath FROM ico");
            while($row = $result2->fetch_assoc()) {
                $ico = array();
                $ico['ico_id'] = $row['ico_id'];
                $ico['name'] = $row['name'];
                $ico['short_description'] = $row['short_description'];
                $ico['description'] = $row['description'];
                $ico['value'] = $row['value'];
                $ico['website'] = $row['website'];
                $ico['imgpath'] = $row['imgpath'];
                array_push($icos,$ico);
            }
        }
        $rarray['icos'] = $icos;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}

// -------------------------------------------------  KUPOVINA -------------------------------------------------------



// ------------------------------------------------- IZLISTAVANJE BALANSA KORISNIKA -------------------------------------------------------

function get_user_balance($token){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){

        $user = get_user_id($token);
        
        $result = $conn->query("SELECT ico.name, ico_user.balance FROM ico_user, ico, users WHERE ico_user.ico_id = ico.ico_id AND ico_user.user_id=".$user." GROUP by  ico_user.user_id, ico_user.ico_id");
        $num_rows = $result->num_rows;
        $icos = array();
        if($num_rows > 0)
        {
            $result2 = $conn->query("SELECT ico.name, ico_user.balance FROM ico_user, ico, users WHERE ico_user.ico_id = ico.ico_id AND ico_user.user_id=".$user." GROUP by  ico_user.user_id, ico_user.ico_id");
            while($row = $result2->fetch_assoc()) {
                $ico = array();
                $ico['name'] = $row['name'];
                $ico['balance'] = $row['balance'];
                array_push($icos,$ico);
            }
        }
        $rarray['icos'] = $icos;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}

// ------------------------------------------------- GET USER ID -------------------------------------------------
function get_user_id($token) {
    $token = str_replace('"', "", $token);
    global $conn;
    $query = 'SELECT user_id FROM users WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
    $id = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $id = $row['user_id'];
        }
        return $id;
    }
}

//------------------------------------------------------- ADD ICO ---------------------------------------------------------------
function add_ico($name, $description, $short_description, $website, $value, $imgpath){
    global $conn;
    $rarray = array();
    $errors = "";

    if($errors == ""){
        $administrator = 0;
        $stmt = $conn->prepare("INSERT INTO ico (name, description, short_description, website, value, imgpath) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssis", $name, $description, $short_description, $website,$value,$imgpath);
        $stmt->execute();
    } else{
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }
    
    return json_encode($rarray);
    
}


//------------------------------------------------------- DELETE ICO ---------------------------------------------------------------

function delete_ico($id) {
        global $conn;
        $rarray = array();
        if(checkIfLoggedIn()){
            $result = $conn->query("DELETE FROM ico WHERE ico_id=".$id);
            $rarray['success'] = "Deleted successfully";
        } else{
            $rarray['error'] = "Please log in";
            header('HTTP/1.1 401 Unauthorized');
        }
        return json_encode($rarray);
}

//------------------------------------------------------- UPDATE ICO ---------------------------------------------------------------

function update_ico($id,$name, $description, $short_description, $website, $value, $imgpath){
    global $conn;
    $rarray = array();
    $errors = "";
    if($errors == ""){
        $stmt = $conn->prepare("UPDATE ico SET name = ?, description = ?, short_description= ?, website = ?, value= ?, imgpath = ? WHERE ico.ico_id =".$id);
        $stmt->bind_param("ssssis", $name, $description, $short_description, $website,$value,$imgpath); 
        $stmt->execute();
    } else{
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }
    
    return json_encode($rarray);
    
}

//------------------------------------------------------- UPDATE BALANCE / BUY ---------------------------------------------------------------

function update_balance($token, $add, $ico_id, $value){
    global $conn;
    $rarray = array();
    $id = get_user_id($token);
    $stanje = get_ico_balance($id,$ico_id);
    $scam_balance = get_scam_balance($token);
    
    try {
        
        if(empty($stanje)==1){
            $final_sum = $add*$value;
            if($scam_balance > $final_sum) {
                echo "usao je da doda";
                $stmt = $conn->prepare("INSERT INTO ico_user (user_id, ico_id, balance) VALUES (?, ?, ?)");
                $stmt->bind_param("iii", $id, $ico_id, $add);
                $stmt->execute();
                update_scam_balance($token, $final_sum);
            } else {
                echo "Nemate dovoljno tokena";
            }
        }
        else{

            $sum = $add*$value;
            $final_sum = $stanje + $sum;

            if($scam_balance > $sum) {
                $stmt = $conn->prepare("UPDATE ico_user SET balance= ? WHERE user_id=? AND ico_id=?");
                $stmt->bind_param("iii", $sum,$id,$ico_id); 
                $stmt->execute();
                update_scam_balance($token, $sum);
            } else {
                $stanje = "Nemate dovoljno tokena.";
                $rarray['stanje'] = json_encode($stanje);
            }
        }
       
    } catch (Exception $e) {
         echo 'Caught exception: ',  $e->getMessage(), "\n";

    }
    
    return json_encode($rarray);
    
}

//------------------------------------------------------- UPDATE SCAM BALANCE ---------------------------------------------------------------

function update_scam_balance($token, $number){
    global $conn;
    $rarray = array();

    $id = get_user_id($token);
    $scam_balance = get_scam_balance($token);

    $sum = $scam_balance - $number;
    try {
        $stmt = $conn->prepare("UPDATE users SET scamcoin_balance= ? WHERE user_id=?");
        $stmt->bind_param("ii", $sum,$id); 
        $stmt->execute();
    } catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
    
    return json_encode($rarray);
    
}

//------------------------------------------------------- GET BALANCE BASED ON ICO AND USER ID ---------------------------------------------------------------

function get_ico_balance($user_id, $ico_id) {
    global $conn;
    $query = 'SELECT balance FROM ico_user WHERE user_id = ? AND ico_id= ?';
    $result = $conn->prepare($query);
    $result->bind_param('ii', $user_id, $ico_id);
    $balance = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $balance = $row['balance'];
        }
        return $balance;
    }
}

//------------------------------------------------------- GET SCAM COIN BALANCE ---------------------------------------------------------------

function get_scam_balance($token) {
    global $conn;

    $query = 'SELECT scamcoin_balance FROM users WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
    $scam_balance = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $scam_balance = $row['scamcoin_balance'];
        }
        return $scam_balance;
    }
}

?>