<?php

if (isset($_POST['reset-request-submit'])) {

    $selector = bin2hex(random_bytes(8));
    $token = random_bytes(32);

    $url = "https://nytuo.yo.fr/create-new-password.php?selector=" . $selector . "&validator=" . bin2hex($token);

    $expires = date("U") + 1800;

    require 'dbh.php';

    $userEmail = $_POST['email'];





    $sql = "SELECT emailUsers FROM users WHERE emailUsers=?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header('location: reset-password.php?error=sqlerror');
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "s", $userEmail);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        $resultCheck = mysqli_stmt_num_rows($stmt);
        if ($resultCheck <= 0) {
            header('location: reset-password.php?error=noaccount');
            exit();
        } else {






            $sql = "DELETE FROM pwdReset WHERE pwdResetEmail=?";
            $stmt = mysqli_stmt_init($conn);
            if (!mysqli_stmt_prepare($stmt, $sql)) {
                echo 'Error Occured 01';
                exit();
            } else {
                mysqli_stmt_bind_param($stmt, 's', $userEmail);
                mysqli_stmt_execute($stmt);
            }
            $sql = "INSERT INTO pwdReset (pwdResetEmail, pwdResetSelector, pwdResetToken, pwdResetExpires) VALUES (?,?,?,?);";
            $stmt = mysqli_stmt_init($conn);
            if (!mysqli_stmt_prepare($stmt, $sql)) {
                echo 'Error Occured 02';
                exit();
            } else {
                $hasedToken = password_hash($token, PASSWORD_DEFAULT);
                mysqli_stmt_bind_param($stmt, 'ssss', $userEmail, $selector, $hasedToken, $expires);
                mysqli_stmt_execute($stmt);
            }

            mysqli_stmt_close($stmt);
            mysqli_close($conn);

            $to = $userEmail;
            $subject = 'Nytuo Accounts -- Reset Password';
            $message = '<p>Vous avez demander à changer votre mot de passe. Si ce n\'est pas vous, vous pouvez ignorer ce mail.</p>';
            $message .= '<p>Voici votre lien pour réinitialiser votre mot de passe : <br/>';
            $message .= '<a href="' . $url . '">' . $url . '</a></p>';
            $headers = "From: NytuoAccounts <nytuogames.launcher@gmail.com>\r\n";
            $headers .= "Reply-To: nytuogames.launcher@gmail.com\r\n";
            $headers .= "Content-type: text/html\r\n";

            mail($to, $subject, $message, $headers);

            header('location: reset-password.php?reset=success');
        }
    }
} else {

    header("location: home.html");
}
