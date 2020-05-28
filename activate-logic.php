<?php
session_start();
if (isset($_POST['activate-submit'])) {
    $key = $_POST['key'];
    $mail = $_SESSION['mail'];
    $gameactivated = 1;
    if (empty($key)) {
        header('location: activate.php?error=keyfieldsempty');
        exit();
    } else if (empty($mail)) {
        header('location: activate.php?error=mailinvalid');
        exit();
    }
    require 'dbh.php';

    if ($key == 'laatimactivate') {
        $sql = "SELECT LAATIM FROM users WHERE LAATIM=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET LAATIM=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'snreactivate') {
        $sql = "SELECT SNRE FROM users WHERE SNRE=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET SNRE=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'sgbactivate') {
        $sql = "SELECT SGB FROM users WHERE SGB=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET SGB=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'sfactivate') {
        $sql = "SELECT SF FROM users WHERE SF=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET SF=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'laactivate') {
        $sql = "SELECT LA FROM users WHERE LA=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET LA=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'vitfactivate') {
        $sql = "SELECT VITF FROM users WHERE VITF=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET VITF=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'wractivate') {
        $sql = "SELECT WR FROM users WHERE WR=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET WR=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'aeactivate') {
        $sql = "SELECT AE FROM users WHERE AE=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET AE=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'fwdactivate') {
        $sql = "SELECT FWD FROM users WHERE FWD=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET FWD=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'tbactivate') {
        $sql = "SELECT TB FROM users WHERE TB=?  AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET TB=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else if ($key == 'ttdactivate') {
        $sql = "SELECT TTD FROM users WHERE TTD=? AND emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: activate.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "is", $gameactivated, $mail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("location: activate.php?error=gameactive");
                exit();
            } else {
                $sql = "UPDATE users SET TTD=? WHERE emailUsers=?";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    echo 'Error Occured';
                    exit();
                } else {
                    mysqli_stmt_bind_param($stmt, 'is', $gameactivated, $mail);
                    mysqli_stmt_execute($stmt);
                    header('location: activate.php?activate=success');
                }
            }
        }
    } else {
        header('location: activate.php?error=keyinvalid');
        exit();
    }
} else {
    header('location: profile.php');
}
