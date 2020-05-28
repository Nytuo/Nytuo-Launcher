<?php
require 'header.php';
?>
<main>
    <h1>Créé un compte Nytuo</h1>
    <?php
    if (isset($_GET['error'])) {
        if ($_GET['error'] == 'emptyfields') {
            echo '<p>Fill in all fields !</p>';
        } else if ($_GET['error'] == 'invalidmail') {
            echo '<p>Invalid email</p>';
        } else if ($_GET['error'] == 'invalidmailuid') {
            echo '<p>Invalid email and username</p>';
        } else if ($_GET['error'] == 'invaliduid') {
            echo '<p>Invalid Username!</p>';
        } else if ($_GET['error'] == 'passwordcheck') {
            echo '<p>your password do not match!</p>';
        } else if ($_GET['error'] == 'sqlerror') {
            echo '<p>Server error!</p>';
        } else if ($_GET['error'] == 'usertaken') {
            echo '<p>Username already taken!</p>';
        } else if ($_GET['error'] == 'mailtaken') {
            echo '<p>Email already taken!</p>';
        }
    }
    

    ?>
    <form style="text-align: center" action="signup-v.php" method="post">
        <input type="text" name="uid" placeholder="Nom d'utilisateur"></br>
        <input type="text" name="mail" placeholder="Email"></br>
        <input type="password" name="pwd" placeholder="Mot de passe"></br>
        <input type="password" name="pwd-repeat" placeholder="Répéter Mot de passe"></br>
        <p>En cliquant sur le bouton 'créé le compte' vous acceptez <a style="color: dodgerblue;" href="termsandconditions.html">les termes du contrat suivant.</a></p><br/>
        <button type="submit" name="signup-submit">Créé le compte</button>
    </form>
</main>