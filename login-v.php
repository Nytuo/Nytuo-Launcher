<?php

if (isset($_POST['login-submit'])) {
    require 'dbh.php';
    $mailuid = $_POST['mailuid'];
    $password = $_POST['pwd'];
    $remember = $_POST['remember'];
    if (empty($mailuid) || empty($password)) {
        header("location: profile.php?error=emptyfields");
        exit();
    } else {
        $sql = "SELECT * FROM users WHERE uidUsers=?";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: profile.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "s", $mailuid);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if ($row = mysqli_fetch_assoc($result)) {
                $pwdcheck = password_verify($password, $row['pwdUsers']);
                if ($pwdcheck == false) {
                    header("location: profile.php?error=wrongpassword");
                    exit();
                } else if ($pwdcheck == true) {
                    session_start();
                    if (isset($remember)) {
                        $_SESSION['password'] = $password;
                    }
                    $_SESSION['userId'] = $row['idUsers'];
                    $_SESSION['userUid'] = $row['uidUsers'];
                    $_SESSION['LAATIM'] = $row['LAATIM'];
                    $_SESSION['SGB'] = $row['SGB'];
                    $_SESSION['LA'] = $row['LA'];
                    $_SESSION['SF'] = $row['SF'];
                    $_SESSION['TTD'] = $row['TTD'];
                    $_SESSION['TB'] = $row['TB'];
                    $_SESSION['FWD'] = $row['FWD'];
                    $_SESSION['AE'] = $row['AE'];
                    $_SESSION['WR'] = $row['WR'];
                    $_SESSION['VITF'] = $row['VITF'];
                    $_SESSION['SNRE'] = $row['SNRE'];
                    $_SESSION['mail'] = $row['emailUsers'];


                    header("location: profile.php?login=success");
                    exit();
                } else {
                    header("location: profile.php?error=wrongpassword");
                    exit();
                }
            } else {
                header("location: profile.php?error=nouser");
                exit();
            }
        }
    }
} else {
    header("location: profile.php");
    exit();
}
