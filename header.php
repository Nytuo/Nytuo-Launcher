<?php
session_start();
ob_start();
define("SECRETKEY", "Nytuo@Super&Key4961");
?>
<style>
    /* Full-width input fields */
    input[type=text],
    input[type=password] {
        width: 20%;
        padding: 15px;
        margin: 5px 0 22px 0;
        border: none;
        background: #292929;
    }

    /* Add a background color when the inputs get focus */
    input[type=text]:focus,
    input[type=password]:focus {
        background-color: #242424;
        outline: none;
        color: white;
    }

    /* Set a style for all buttons */
    button {
        background-color: dodgerblue;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 20%;
        opacity: 0.9;
    }

    button:hover {
        opacity: 1;
    }
</style>
<!DOCTYPE html>
<html>
<title>Nytuo Launcher -- Home</title>

<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="Ressources/style.css" />
    <link rel="icon" href="Ressources/favicon.ico" />
    <link href="https://fonts.googleapis.com/css?family=Oswald|Roboto+Condensed&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="js.js"></script>
    <title>Accueil</title>
    <script type="text/javascript">
        const {
            shell,
            webContents,
            dialog
        } = require('electron');
        const {
            ipcRenderer
        } = require('electron');
        var fs = require('fs');
        const os = require('os');
        var homedir = os.homedir();
        const app = require('electron').remote.app;
        const path = require('path');
        var parentfolder1 = require('path').dirname(__dirname);
        var parentfolder2 = require('path').dirname(parentfolder1);
        var parentfolder3 = require('path').dirname(parentfolder2);
        var parentfolder4 = require('path').dirname(parentfolder3);
        var parentfolder5 = require('path').dirname(parentfolder4);
        var parentfolder6 = require('path').dirname(parentfolder5);

        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
                    pageLanguage: 'fr'
                },
                'google_translate_element'
            );
        }

        function newspage() {
            window.location.href = 'file:///' + app.getAppPath() + '/news.html'
            console.log('file:///' + app.getAppPath() + '/news.html')
        }

        function settingspage() {
            window.location.href = 'file:///' + app.getAppPath() + '/about.html'
            console.log('file:///' + app.getAppPath() + '/about.html')
        }

        function gamespage() {
            window.location.href = 'https://launcher.nytuo.yo.fr/profile.php'
            console.log('https://launcher.nytuo.yo.fr/profile.php')
        }
    </script>

    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
    </script>
</head>
<header>
    <div class="row">

        <div class="navcolumn">
            <ul class="topnav">
                <li><a onclick="settingspage()" style="cursor:pointer;">Settings</a></li>
                <!--<li><a onclick="document.getElementById('achpopup').style.display='block'" style="cursor:pointer;">Achievements</a></li>!-->
                <li><a onclick="gamespage()" style="cursor:pointer;">Games</a>
                <li>
                <li><a onclick="newspage()" style="cursor:pointer;">News</a></li>

            </ul>
        </div>
        <div class="column3"><img src="Ressources/LogoLauncher.png" class="logonav" title="Logo de Nytuo"></div>
        <div class="column3">
            <div style="text-align: center;display : inline;">
                <?php

                if (isset($_SESSION['userId'])) :

                ?>
                    <h1> Bonjour, <strong><?php echo $_SESSION['userUid']; ?></strong></h1>
                <?php endif ?>
                <?php

                if (isset($_SESSION['userId'])) :

                ?>
                    <form action="logout.php" method="post">
                        <button type="submit" name="logout-submit">Se Déconnecter</button>
                    </form>
                <?php else : ?>
                       
                    <form action="login-v.php" method="post">
                        <input type="text" name="mailuid" placeholder="Nom Utilisateur" id="mail" value="">
                        <input type="password" name="pwd" placeholder="Mot de passe" id="pwd" value="">
                         <script>
                            document.getElementById('mail').value = getName();
                            document.getElementById('pwd').value = getPass();
                        </script>
                        <p><input type="checkbox" name="remember">Se Souvenir de moi</p>
                        <button type="submit" name="login-submit">Se Connecter</button>
                        <button type="submit" formaction="signup.php">Créé un compte</button>

                    </form>
                    <div style="text-align: center;">
                        <a style="color: dodgerblue;" href="reset-password.php">Demander un changement de mot de passe</a></div>

                <?php endif ?>
                <?php
                if (isset($_GET['newpwd'])) {
                if ($_GET['newpwd'] == "passwordUpdated") {
                echo '<p>Votre mot de passe a était mis à jour</p>';
                }
                }

                ?>



            </div>
        </div>




    </div>

</header>

</html>