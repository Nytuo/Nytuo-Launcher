<?php
require 'header.php';
?>
<main>
    <h1>Réinitialisateur de mot de passe</h1>
    <p>Un email va vous être envoyer avec les instructions pour réinitialiser votre mot de passe.</p>
 
    <form style="text-align: center" action="reset-request.php" method="post">
        <input type="text" name="email" placeholder="Email lié à votre compte"></br>
        <button type="submit" name="reset-request-submit">Envoyer l'e-mail de réinitialisation de mot de passe</button>
    </form>
       <?php
    if (isset($_GET['reset'])) {
        if ($_GET['reset'] == 'success') {
            echo '<p>Vérifier votre adresse mail!</p>';
    }
    }
        if (isset($_GET['error'])) {
        if ($_GET['error'] == 'noaccount') {
            echo '<p>Il n\'y a pas de compte lié à cette adresse mail!</p>';
    }

}
    

    ?>
</main>