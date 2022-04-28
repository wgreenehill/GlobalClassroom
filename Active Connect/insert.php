<?php
$email = $_POST['email'];
$f_name = $_POST['f_name'];
$l_name = $_POST['l_name'];
$phonenumber = $_POST['phonenumber'];
$mobility = $_POST['mobility'];
$dietary = $_POST['dietary'];
$password = $_POST['password'];
$password_repeat = $_POST['password_repeat'];

if(!empty($email) || !empty($f_name) || !empty($password) || !empty($password_repeat)){
    $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "activeconnect";

    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

    if(mysqli_connect_error()){
        die('Connect Error'(.mysqli_connect_errorno().')'.mysqli_connect_error());
    } else{
        $select = "select email from profile where email = ? limit 1";
        $insert = "insert into profile (Email, First_name, Last_name, Phonenumber, Reduced_mobility, Dietary_requirements, Password, Password_repeat)
        values (?,?,?,?,?,?,?,?)";

        $stmt = $conn->prepare($select);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($resultemail);
        $stmt->store_result();
        $stmt->fetch();
        $rnum = $stmt->num_rows;

        if($rnum=0){
            $stmt->close();
            $stmt = $conn->prepare($insert);
            $stmt->bind_param("ssssii", $email, $f_name, $l_name, $phonenumber, $mobility, $dietary, $password, $password_repeat);
            $stmt->execute();
            echo "New record inserted sucessfully";
        } else {
            echo "Someone already registered using this email";
        }
        $stmt->close();
        $conn->close();

    }
} else {
    echo "Not all required fields have been filled in, they are marked with a *";
    }
?>