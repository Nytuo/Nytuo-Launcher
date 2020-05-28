<?php
session_start();
if (isset($_POST['changeusername-submit'])) {
    $nusername = $_POST['username'];
    $mail = $_SESSION['mail'];
    if (empty($nusername)) {
        header('location: changeUsername.php?error=usernamempty');
        exit();
    } else if (empty($mail)) {
        header('location: changeUsername.php?error=mailinvalid');
        exit();
    }
    require 'dbh.php';
    $sql = "SELECT uidUsers FROM users WHERE uidUsers=?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: signup.php?error=sqlerror");
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "s", $nusername);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        $resultCheck = mysqli_stmt_num_rows($stmt);
        if ($resultCheck > 0) {
            header("location: changeUsername.php?error=usertaken");
            exit();
        } else {
            $sql = "UPDATE users SET uidUsers=? WHERE emailUsers=?";
            $stmt = mysqli_stmt_init($conn);
            if (!mysqli_stmt_prepare($stmt, $sql)) {
                echo 'Error Occured';
                exit();
            } else {
                mysqli_stmt_bind_param($stmt, 'ss', $nusername, $mail);
                mysqli_stmt_execute($stmt);
                header('location: changeUsername.php?change=success');
            }
        }
    }
} else {
    header('location: profile.php');
}
